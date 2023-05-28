FROM ubuntu:latest

EXPOSE 8081

COPY config/ config
COPY controllers/ controllers
COPY persistance/ persistance
COPY services/ services
COPY uploads-folder/ uploads-folder
COPY utils/ utils
COPY app.js app.js
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN apt update
RUN apt install -y curl
RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v16.17.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH
ENV PORT 8081
ENV DB_URI mongodb://172.17.0.2:27017/app_local_requisition
ENV EMAIL es.jfajardobass@gmail.com
ENV EMAIL_PASS ezrbrgxolkylcxfe
ENV JWT_EXPIRATION_TIME 8h
ENV JWT_SECRET_KEY wtysoftware.vlz

RUN npm install
ENTRYPOINT ["npm","start"]