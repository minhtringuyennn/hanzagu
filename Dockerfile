# Stage 1: Build stage
FROM node:18 as build-stage

WORKDIR /
COPY . .

ARG AUTH_PROVIDER_X509_CERT_URL
ARG AUTH_URI
ARG CLIENT_EMAIL
ARG CLIENT_ID
ARG CLIENT_X509_CERT_URL
ARG PRIVATE_KEY
ARG PRIVATE_KEY_ID
ARG PROJECT_ID
ARG TOKEN_URI
ARG TYPE
ARG UNIVERSE_DOMAIN
ARG SPREADSHEET_ID
ARG SHEET_NAME
ARG START_CELL
ARG END_CELL

ENV AUTH_PROVIDER_X509_CERT_URL ${AUTH_PROVIDER_X509_CERT_URL}
ENV AUTH_URI ${AUTH_URI}
ENV CLIENT_EMAIL ${CLIENT_EMAIL}
ENV CLIENT_ID ${CLIENT_ID}
ENV CLIENT_X509_CERT_URL ${CLIENT_X509_CERT_URL}
ENV PRIVATE_KEY ${PRIVATE_KEY}
ENV PRIVATE_KEY_ID ${PRIVATE_KEY_ID}
ENV PROJECT_ID ${PROJECT_ID}
ENV TOKEN_URI ${TOKEN_URI}
ENV TYPE ${TYPE}
ENV UNIVERSE_DOMAIN ${UNIVERSE_DOMAIN}
ENV SPREADSHEET_ID ${SPREADSHEET_ID}
ENV SHEET_NAME ${SHEET_NAME}
ENV START_CELL ${START_CELL}
ENV END_CELL ${END_CELL}

COPY credentials.json /credentials.json

RUN yarn ci
RUN yarn build

CMD ["yarn", "preview" ]

EXPOSE 3000