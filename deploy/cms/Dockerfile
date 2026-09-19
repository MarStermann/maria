FROM node:22-alpine
RUN apk add --no-cache git openssh-client
WORKDIR /app
COPY deploy/cms/server.mjs ./server.mjs
USER node
ENV NODE_ENV=production \
    GIT_TERMINAL_PROMPT=0 \
    GIT_SSH_COMMAND="ssh -i /run/secrets/cms_git_key -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=/run/secrets/github_known_hosts"
EXPOSE 8081
HEALTHCHECK --interval=15s --timeout=5s --start-period=90s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8081/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
