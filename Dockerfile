FROM node:15-buster

WORKDIR /usr/src/app

RUN apt-get update && apt-get -y upgrade

# 1. Criar a imagem:  docker build -t ie-back .
# 2. Rodar container: docker run --rm -it --name meu-container -v $(pwd):/app ie-back