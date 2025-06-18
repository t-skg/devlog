<p align="center">
  <a href="https://devlog-amber.vercel.app/">
    <img src="/public/favicon.ico" alt="PractiX Code Lab" width="50" />
  </a>
</p>
<h3 align="center">
  PractiX Code Lab
</h3>
<p align="center">
  <a href="https://devlog-amber.vercel.app/">Site</a> | <a href="https://microcms.io/">microCMS</a> | <a href="https://nextjs.org/">Next.js</a>
</p>

---

## 概要

PractiX Code Lab は、「企画も実装も、自分でやる人へ。」をコンセプトとした技術ブログです。  
事業検証・プログラミング・マーケティングなど、実践と学びを発信します。

[microCMS](https://microcms.io/) をヘッドレスCMSとして活用し、[Next.js](https://nextjs.org/) の App Router にて構築されています。

---

## 作成背景および目的

- 技術レベルの公開・可視化
- 情報発信の場の独自構築
- JAMstackアーキテクチャを意識したプロダクトの開発

---

## 特徴・工夫した点

- HeadlessCMS「microCMS」とのAPI連携
- App Routerベースでの構成整理（Layout, Metadata対応）
- フォーム送信 + ReCAPTCHA + Resend での実用的なメール処理
- Google Analytics 4 対応と読み込み制御

---

## 技術スタック

| 分類           | 使用技術                                                    |
| -------------- | ----------------------------------------------------------- |
| フレームワーク | [Next.js 14](https://nextjs.org/)                           |
| CMS            | [microCMS](https://microcms.io/)                            |
| フォーム       | [React Hook Form](https://react-hook-form.com/) + ReCAPTCHA |
| メール送信     | [Resend](https://resend.com/)                               |
| 解析           | Google Analytics (GA4)                                      |

---

## 機能と構成

- トップページ（記事一覧・ページネーション）
- 記事詳細ページ（Markdown対応）
- タグ一覧・タグ別絞り込みページ
- プロフィールページ（CMS管理）
- お問い合わせフォーム（バリデーション + 非同期送信）
- SEO対策 & OGP対応（title, description, image）

---

## 今後の予定

- [ ] 記事の執筆・定期更新
- [ ] 独自ドメイン `practixcode.dev` への切り替え
- [ ] サイト内検索機能の改善

---

## 作者

- 名前：Takashi Sekiguchi
- Github：https://github.com/t-skg
- ポートフォリオ：https://portfolio-t-skgs-projects.vercel.app

---

## ライセンス

MIT License
© 2025 Takashi Sekiguchi

> 本プロジェクトのUIは [Newt-Inc/newt-starter-nextjs-blog](https://github.com/Newt-Inc/newt-starter-nextjs-blog) を元に改修・拡張されたものです。

---

## セットアップ手順

以下の手順でローカル開発環境を構築できます。

### 前提

- microCMSのアカウントを作成し、サービスを作成しておく
- 以下のAPIスキーマを作成し、コンテンツを登録しておく
  - `articles` (記事)
  - `authors` (著者)
  - `tags` (タグ)
  - `settings` (サイト設定)

### 手順

```bash
git clone [https://github.com/t-skg/devlog.git](https://github.com/t-skg/devlog.git)
cd devlog
npm install
npm run dev

プロジェクトルートに .env.local ファイルを作成し、以下の環境変数を設定してください（テンプレートは .env.local.example 参照）：

# =========================
# microCMS (Headless CMS)
# =========================
MICROCMS_SERVICE_DOMAIN="あなたのサービスドメイン"
MICROCMS_API_KEY="あなたのAPIキー"
PAGE_LIMIT=5

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
