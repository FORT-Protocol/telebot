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

get some help of telebot.

```shell
telebot -h
```

get version of telebot.

```shell
telebot -V
```

## sendMessage

only send a message to single chat_id.

```shell
telebot -t <token> sendMessage <text> chat_id
```

if you want to send message to chat_ids which save in a csv file.

```shell
telebot -t <token> sendMessage <text> -m mess -f /path/file.csv
```


## sendVideo

only send a video to single chat_id.

```shell
telebot -t <token> sendVideo <video> chat_id -c [caption]
```

if you want to send video to chat_ids which save in a csv file.

```shell
telebot -t <token> sendVideo <video> -m mess -f /path/file.csv -c [caption]
```

PS: `video` can be a URI or telegram file id or file path of local.


## sendPhoto

only send a photo to single chat_id.

```shell
telebot -t <token> sendPhoto <photo> chat_id -c [caption]
```

if you want to send video to chat_ids which save in a csv file.

```shell
telebot -t <token> sendPhoto <photo> -m mess -f /path/file.csv -c [caption]
```

PS: `photo` can be a URI or telegram file id or file path of local.

