<p align="center">
  <a href="https://devlog-amber.vercel.app/">
    <img src="/favicon.ico" alt="PractiX Code Lab" width="50" />
  </a>
</p>
<h3 align="center">
PractiX Code Lab
</h3>
<p align="center">
  <a href="https://devlog-amber.vercel.app/">Site</a> | <a href="https://www.newt.so/">Newt</a> | <a href="https://nextjs.org/">Next.js</a>
</p>

---

## 概要

PractiX Code Lab は、「企画も実装も、自分でやる人へ。」をコンセプトとした技術ブログです。  
事業検証・プログラミング・マーケティングなど、実践と学びを発信します。

[Newt](https://www.newt.so/) をヘッドレスCMSとして活用し、[Next.js](https://nextjs.org/) の App Router にて構築されています。

---

## 作成背景および目的

- 技術レベルの公開・可視化
- 情報発信の場の独自構築
- JAMstackアーキテクチャを意識したプロダクトの開発

---

## 特徴・工夫した点

- HeadlessCMS「Newt」とのAPI連携
- App Routerベースでの構成整理（Layout, Metadata対応）
- フォーム送信 + ReCAPTCHA + Resend での実用的なメール処理
- Google Analytics 4 対応と読み込み制御

---

## 技術スタック

| 分類           | 使用技術                                                    |
| -------------- | ----------------------------------------------------------- |
| フレームワーク | [Next.js 14](https://nextjs.org/)                           |
| CMS            | [Newt](https://www.newt.so/)                                |
| フォーム       | [React Hook Form](https://react-hook-form.com/) + ReCAPTCHA |
| メール送信     | [Resend](https://resend.com/)                               |
| 解析           | Google Analytics (GA4)                                      |

---

## 機能と構成

- トップページ（記事一覧・ピックアップ表示）

- 記事詳細ページ（Markdown対応）

- タグ一覧・タグ別絞り込み（CMS管理）

- プロフィールページ（CMS管理）

- お問い合わせフォーム（バリデーション + 非同期送信）

- SEO対策 & OGP対応（title, description, image）

---

## 今後の予定

- [ ] 記事の執筆・定期更新
- [ ] カテゴリ別一覧ページの追加（/category/[slug]）
- [ ] 独自ドメイン `practixcode.dev` への切り替え

---

## 作者

- 名前：Takashi Sekiguchi
- Github：https://github.com/t-skg
- ポートフォリオ：https://portfolio-t-skgs-projects.vercel.app

---

## ライセンス

MIT License
© 2025 Takashi Sekiguchi

> 本プロジェクトは [Newt-Inc/newt-starter-nextjs-blog](https://github.com/Newt-Inc/newt-starter-nextjs-blog) を元に改修・拡張されたものです。

---

## セットアップ手順

以下の手順でローカル開発環境を構築できます：

前提：

- ①NEWTへログインし、Appテンプレートの「Blog」にてスペースを作成しておく
- ②スペース設定よりWebhookを作成からVercelのテンプレートを選択 <br>
  ※Deploy Hookの作成方法はVercelのドキュメント（ https://vercel.com/docs/deploy-hooks ）をご確認ください

```bash
git clone https://github.com/t-skg/practix-code-lab.git
cd practixcodelab
npm install
npm run dev
```

.env.local に以下の環境変数を設定してください（テンプレートは .env.local.example 参照）：

```
# =========================
# NEWT (Headless CMS)
# =========================
NEXT_PUBLIC_NEWT_SPACE_UID=スペースUID
NEXT_PUBLIC_NEWT_APP_UID=blog
NEXT_PUBLIC_NEWT_API_TOKEN=CDN APIトークン
NEXT_PUBLIC_NEWT_API_TYPE=cdn
NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID=article
NEXT_PUBLIC_NEWT_AUTHOR_MODEL_UID=author
NEXT_PUBLIC_NEWT_TAG_MODEL_UID=tag
NEXT_PUBLIC_PAGE_LIMIT=5

# ISR Revalidation Token (for /api/revalidate)
REVALIDATE_SECRET_TOKEN=xxxxx

# =========================
# Google reCAPTCHA
# =========================
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxx
RECAPTCHA_SECRET_KEY=xxxxx

# =========================
# Resend (Email Service)
# =========================
RESEND_API_KEY=xxxxx
RESEND_FROM=xxxxx

# =========================
# Google Analytics (GA4)
# =========================
NEXT_PUBLIC_GA_ID=xxxxx
```
