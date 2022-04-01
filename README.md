# @fort-protocol/telebot

[![Node.js Package](https://github.com/FORT-Protocol/telebot/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/FORT-Protocol/telebot/actions/workflows/npm-publish.yml)

## Install

```shell
npm i @fort-protocol/telebot
```

or

```shell
yarn add @fort-protocol/telebot
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

only send a `message` to single chat_id

```shell
telebot -T "bot-token" send-message chat_id -t "hello"
```

if you want to send `message` to chat_ids which save in a csv file

```shell
telebot -T "bot-token" send-message -f /path/file.csv -t "hello"
```
