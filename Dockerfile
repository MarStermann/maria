FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/content-model/package.json packages/content-model/package.json

RUN npm ci

COPY . .

ARG VITE_SITE_URL=https://www.alscher-scheunemann.de
ARG VITE_ALLOW_INDEXING=false
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_ALLOW_INDEXING=$VITE_ALLOW_INDEXING

RUN npm run build && npm run build:cms

FROM nginx:stable-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist/client /usr/share/nginx/html
COPY --from=build /app/apps/web/dist/cms/admin /usr/share/nginx/html/admin

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1
