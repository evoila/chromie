FROM node:lts

ENV LANG=C.utf8

RUN apt-get update && \
  apt-get install -y postgresql-client zsh && \
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" && \
  chsh -s /bin/zsh