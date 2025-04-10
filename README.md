# 250410_r3f

ICS MEDIAの記事『』のサンプルコードです。

パッケージマネージャーを使用しています。以下のコマンドを行うことでモジュールが追加されます。
※作例で使用しているパッケージに依存関係を解決できないものがあったので、`--legacy-peer-deps`フラグが必要になります。

```bash
npm install --legacy-peer-deps
```

package.jsonのscriptsのdevコマンドを実行することで開発画面が起動できます。

```bash
npm run dev
```

## 使用ライブラリ

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [React](https://ja.react.dev/)
- [@react-three/drei](https://drei.docs.pmnd.rs/getting-started/introduction): dreiの紹介ページで使用
- [@react-spring/three](https://react-spring.dev/): ネジ巻きのアニメーション用
- three-stdlib: 型エラーの解決用
- react-router-dom: ページ遷移用
- そのほかフォーマット用など


## ライセンス

作例で使用している3Dモデルは、作者の澤田が用意したものです。ご自由にお使いいただけます。

- public/gltf/neji.glb