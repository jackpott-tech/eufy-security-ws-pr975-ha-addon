ARG BUILD_FROM
FROM ${BUILD_FROM}

WORKDIR /usr/src/app

RUN apk add --no-cache jq nodejs npm \
    && node --version \
    && case "$(node --version)" in v24.*) ;; *) exit 1 ;; esac

COPY app/package.json app/package-lock.json ./
COPY app/vendor ./vendor
RUN npm ci --omit=dev

COPY app/dist ./node_modules/eufy-security-ws/dist
COPY app/package.json ./node_modules/eufy-security-ws/package.json
COPY run.sh /run.sh
RUN chmod a+x /run.sh

WORKDIR /data
CMD [ "/run.sh" ]
