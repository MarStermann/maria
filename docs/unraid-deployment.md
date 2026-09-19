# Website und Redaktion auf Unraid

- Website: <http://192.168.178.101:8097>
- Geschützte Redaktion: <http://192.168.178.101:8097/admin/>
- Pipeline: `.github/workflows/deploy-unraid.yml`
- Runner: `unraid-maria`, Labels `self-hosted`, `Linux`, `X64`, `unraid`, `maria`.

Jeder Push auf `main` startet Installation, Typecheck, Tests, Website-Build und den separaten CMS-Build. Nur nach erfolgreichen Prüfungen wird das Release an Unraid übertragen. Manuelle Ausführung ist über **Actions → Deploy Maria to Unraid → Run workflow** auf `main` möglich. Parallel gestartete Deployments werden nacheinander ausgeführt. Pull Requests führen keinen Code auf dem Unraid-Runner aus.

## Bearbeitung

Der Browser fragt beim Öffnen der Redaktion nach Benutzername und Passwort. Die Erstzugangsdaten sind ausschließlich lokal in `.deploy-local/access.json` abgelegt und von Git ausgeschlossen. In der Redaktion **Redaktion öffnen** anklicken. Änderungen und Bilder werden in einem persistenten Git-Arbeitsverzeichnis gespeichert, committed und nach `main` gepusht. **Speichern** startet dadurch die Pipeline. Bis zu deren erfolgreichem Abschluss zeigt die Website weiterhin den vorherigen Build. Ein fehlgeschlagener Build veröffentlicht keine Änderungen.

Die vorhandenen Inhaltsstatus und Freigabeprüfungen gelten weiterhin. Die Suchmaschinenindexierung bleibt mit `VITE_ALLOW_INDEXING=false` gesperrt. Praxisdomain und DNS werden durch dieses Deployment nicht umgestellt.

## Komponenten und Daten

- `maria-website`: Nginx mit statisch vorgerenderter Website, separatem geschütztem `/admin/` und authentifiziertem Proxy `/__cms/`.
- `maria-cms`: Node-Server mit Git; ohne veröffentlichten Host-Port. Bearbeitet ausschließlich JSON unter `apps/web/src/content/editable/` und Bilder unter `apps/web/public/uploads/`.
- `/mnt/user/appdata/maria-website/cms/repo`: persistentes Git-Arbeitsverzeichnis. Wird bei Releases nicht ersetzt oder gelöscht.
- `/mnt/user/appdata/maria-website/secrets`: Passwort-Hash, nur für Maria gültiger GitHub-Deploy-Key und gepinnte GitHub-Hostschlüssel.
- `/mnt/user/appdata/maria-website/releases`: Build-Artefakte und Compose-Konfiguration je Release.
- `/mnt/user/appdata/maria-website/current`: zuletzt erfolgreich gestartetes Release.
- `/mnt/user/appdata/maria-website/backups`: Compose-Konfiguration und Image-Referenz vor jedem Wechsel.

Der Runner bleibt ohne Docker-Socket, läuft als unprivilegierter Benutzer und behält die vorhandene gemeinsame 4-GiB-Grenze. Er baut die Anwendung und sendet nur die fertigen Artefakte. Der Unraid-Schlüssel ist in `authorized_keys` mit `restrict` und dem festen Befehl `/bin/bash /boot/config/maria/deploy.sh` hinterlegt. Der ausdrückliche Bash-Aufruf ist nötig, weil Unraids Boot-Volume keine direkt ausgeführten Skripte erlaubt. Dieser Befehl akzeptiert ausschließlich `deploy <Commit-SHA>`. Die Runtime-Images werden auf Unraid erstellt; die Dienste sind auf 128 MiB beziehungsweise 256 MiB und jeweils 0,5 CPUs begrenzt.

## GitHub-Konfiguration

- Secrets: `MARIA_UNRAID_SSH_KEY`, `MARIA_UNRAID_KNOWN_HOSTS`.
- Variablen: `MARIA_UNRAID_HOST`, `MARIA_PUBLIC_URL`, optional `VITE_SITE_URL` für Canonical-URLs.
- Repository-Deploy-Key: **Maria CMS on Unraid**, Schreibzugriff ausschließlich auf dieses Repository.

Schlüssel oder Passwörter gehören nicht ins Repository, in Build-Artefakte oder Actions-Logs. Der CMS-Server erhält keinen persönlichen GitHub-Token und keinen Docker-Zugang. Die Redaktion ist für das lokale Netz eingerichtet. Für Zugriff aus dem Internet muss der vorgeschaltete Reverse Proxy HTTPS bereitstellen.

## Prüfung und Wiederherstellung

Das Deployment wartet auf beide Container-Healthchecks und prüft `/healthz`, `/blog`, den exakten Commit unter `/deploy-version.txt` sowie HTTP 401 ohne Anmeldung auf Redaktion und API. Bei Fehlern nach dem Containerwechsel wird die vorherige Compose-Konfiguration erneut gestartet. Vorherige Images, Releases und CMS-Daten werden nicht automatisch entfernt.

Eine manuelle Wiederherstellung kann auf Unraid mit der Compose-Konfiguration und `deploy.env` eines vorherigen Release-Verzeichnisses erfolgen:

```sh
docker compose -p source --env-file /mnt/user/appdata/maria-website/releases/RELEASE/deploy.env \
  -f /mnt/user/appdata/maria-website/releases/RELEASE/compose.unraid.yml up -d --no-build --wait
```

Bei einem Git-Konflikt stoppt die Redaktion mit einem Fehler; ungesendete Änderungen bleiben im persistenten Arbeitsverzeichnis erhalten. Konflikte dort prüfen und auflösen, bevor weitere Änderungen gespeichert werden. Das CMS-Verzeichnis in die reguläre Unraid-Sicherung aufnehmen.

Änderungen am privilegierten Deployment-Helfer werden bewusst nicht aus einem Release automatisch installiert. Nach Prüfung muss `deploy/unraid-deploy.sh` per administrativem SSH-Zugang nach `/boot/config/maria/deploy.sh` übertragen werden.

Die Ausführungsauswahl folgt den [GitHub-Regeln für Runner-Labels](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/use-in-a-workflow).
