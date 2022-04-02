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

## send-message

send a `message`

```shell
telebot send-message 'hello' chat_id1 chat_id2 -y
```

## send-photo

send a `photo`

```shell
telebot send-photo 'uri' chat_id1 chat_id2 --caption 'hello' -y 
```

## send-video

send a `video`

```shell
telebot send-video 'uri' chat_id1 chat_id2 --caption 'hello' -y
```
