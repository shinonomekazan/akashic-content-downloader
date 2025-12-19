# Akashic Content Downloader

Akashicコンテンツをダウンロードするためのコマンドラインライブラリです。

## 使い方

以下で利用してください。

```bash
npm install
npm run dev {content.jsonまたはgame.jsonのURL}
```

`-o dirName` を指定すれば、出力先ディレクトリも指定できます。

ダウンロードしたコンテンツは、 `akashic serve dirName` で動作確認ができます。

## 他にやるべき事

- [ ] npm publishして、npm iで使えるようにしておく

## 他に考えるべき事

1. content.json の情報が失われるのが問題ないか考える

## License

MIT
