# @fort-protocol/telebot

[![Node.js Package](https://github.com/FORT-Protocol/telebot/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/FORT-Protocol/telebot/actions/workflows/npm-publish.yml)

## Install

```shell
npm i -g @fort-protocol/telebot
```

or

```shell
yarn global add @fort-protocol/telebot
```

## Help

get some help of telebot

```shell
telebot -h
```

get version of telebot

```shell
telebot -V
```

## send

```shell
telebot send
telebot sendmessage 'hello' chat_id1 chat_id2 -y
telebot sendphoto 'uri' chat_id1 chat_id2 --caption 'hello' -y
telebot sendvideo 'uri' chat_id1 chat_id2 --caption 'hello' -y
```

if chat_id from stdout, you can use `xargs` like this

```shell
echo 'chat_id1 chat_id2' | xargs telebot sendmessage 'hello' -y
```
