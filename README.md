# 250410_r3f

ICS MEDIAの記事『[React Three Fiber入門 - ReactとThree.jsで始める3D表現](https://ics.media/entry/250410/)』のサンプルコードです。

パッケージマネージャーはnpmを使用しています。以下のコマンドを行うことでモジュールが追加されます。

```bash
npm ci
```

package.jsonのscriptsのdevコマンドを実行することで開発画面が起動できます。

```bash
npm run dev
```

## 使用ライブラリ

- [Three.js](https://threejs.org/) r185（WebGPU）
- [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) 9.6
- [React](https://ja.react.dev/) 19.2
- [@react-three/drei](https://drei.docs.pmnd.rs/getting-started/introduction) 10.7: dreiの紹介ページで使用
- [@react-spring/three](https://react-spring.dev/) 10.1: ネジ巻きのアニメーション用
- [react-router-dom](https://reactrouter.com/) 7.18: ページ遷移用
- [Vite](https://vite.dev/) 8.1: 開発サーバーとビルド
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) / [Oxfmt](https://oxc.rs/docs/guide/usage/formatter): lintとformat

`Canvas`の`gl`プロパティでThree.jsの`WebGPURenderer`を指定しています。

## ライセンス

作例で使用している3Dモデルは、作者の澤田が用意したものです。ご自由にお使いいただけます。

- public/gltf/neji.glb
