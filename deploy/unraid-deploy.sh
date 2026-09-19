#!/usr/bin/env bash
set -euo pipefail
umask 077
root=/mnt/user/appdata/maria-website
command=${SSH_ORIGINAL_COMMAND:-}
if [[ ! "$command" =~ ^deploy\ ([0-9a-f]{40})$ ]]; then
  echo 'Only deploy <40-character commit SHA> is supported.' >&2
  exit 1
fi
version=${BASH_REMATCH[1]}
mkdir -p "$root/releases" "$root/backups"
exec 9>"$root/deploy.lock"
flock -w 300 9
release=$(mktemp -d "$root/releases/${version}.XXXXXX")
archive="$release/release.tgz"
cat > "$archive"
# Only accept the build artifacts and runtime files in our release contract.
while IFS= read -r entry; do
  if [[ "$entry" == /* || "$entry" == *'..'* ]]; then echo 'Unsafe archive path' >&2; exit 1; fi
  case "$entry" in
    apps/web/dist/client/*|apps/web/dist/cms/admin/*|deploy/Dockerfile.web|deploy/nginx.conf|deploy/cms/server.mjs|deploy/cms/Dockerfile|compose.unraid.yml) ;;
    *) echo "Unexpected archive entry: $entry" >&2; exit 1 ;;
  esac
done < <(tar -tzf "$archive")
tar -xzf "$archive" -C "$release" --no-same-owner --no-same-permissions
test "$(cat "$release/apps/web/dist/client/deploy-version.txt")" = "$version"
test -f "$release/apps/web/dist/cms/admin/index.html"
test -f "$root/secrets/cms_htpasswd"
test -f "$root/secrets/cms_git_key"
docker build -f "$release/deploy/Dockerfile.web" -t "maria-website:$version" "$release"
docker build -f "$release/deploy/cms/Dockerfile" -t "maria-cms:$version" "$release"
previous=$(readlink -f "$root/current" || true)
backup="$root/backups/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup"
docker inspect maria-website --format '{{.Config.Image}}' > "$backup/previous-image.txt" 2>/dev/null || true
if [[ -n "$previous" && -f "$previous/compose.unraid.yml" ]]; then
  cp "$previous/compose.unraid.yml" "$backup/compose.unraid.yml"
  cp "$previous/deploy.env" "$backup/deploy.env"
elif [[ -f "$root/source/compose.unraid.yml" ]]; then
  cp "$root/source/compose.unraid.yml" "$backup/compose.unraid.yml"
  touch "$backup/deploy.env"
fi
printf 'MARIA_VERSION=%s\nMARIA_DATA_DIR=%s\n' "$version" "$root" > "$release/deploy.env"
rollback() {
  echo 'Deployment failed; restoring the preceding website.' >&2
  if [[ -f "$backup/compose.unraid.yml" ]]; then
    docker compose -p source --env-file "$backup/deploy.env" -f "$backup/compose.unraid.yml" up -d --no-build --wait --wait-timeout 180 || true
  fi
}
trap rollback ERR
docker compose -p source --env-file "$release/deploy.env" -f "$release/compose.unraid.yml" up -d --no-build --wait --wait-timeout 180
base=http://192.168.178.101:8097
curl --fail --silent "$base/healthz"
test "$(curl --fail --silent "$base/deploy-version.txt")" = "$version"
test "$(curl --silent -o /dev/null -w '%{http_code}' "$base/admin/")" = 401
test "$(curl --silent -o /dev/null -w '%{http_code}' -H 'Content-Type: application/json' -d '{"action":"info","params":{}}' "$base/__cms/api/v1")" = 401
curl --fail --silent "$base/blog" -o /dev/null
ln -sfn "$release" "$root/current"
trap - ERR
printf 'Deployed %s successfully. Website and CMS are healthy.\n' "$version"
