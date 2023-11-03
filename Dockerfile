# Stage 1: Build stage
FROM node:18 as build-stage

WORKDIR /
COPY . .

ARG auth_provider_x509_cert_url
ARG auth_uri
ARG client_email
ARG client_id
ARG client_x509_cert_url
ARG private_key
ARG private_key_id
ARG project_id
ARG token_uri
ARG type
ARG universe_domain
ARG spreadsheet_id
ARG sheet_name
ARG start_cell
ARG end_cell

ENV auth_provider_x509_cert_url ${auth_provider_x509_cert_url}
ENV auth_uri ${auth_uri}
ENV client_email ${client_email}
ENV client_id ${client_id}
ENV client_x509_cert_url ${client_x509_cert_url}
ENV private_key ${private_key}
ENV private_key_id ${private_key_id}
ENV project_id ${project_id}
ENV token_uri ${token_uri}
ENV type ${type}
ENV universe_domain ${universe_domain}
ENV spreadsheet_id ${spreadsheet_id}
ENV sheet_name ${sheet_name}
ENV start_cell ${start_cell}
ENV end_cell ${end_cell}

RUN yarn ci
RUN yarn build

CMD ["yarn", "preview" ]

EXPOSE 3000