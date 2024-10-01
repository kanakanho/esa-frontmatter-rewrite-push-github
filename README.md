# esa-frontmatter-rewrite-push-github

# Get started

## 環境変数の設定
```env:.dev.vars
GITHUB_ACCESS_TOKEN=<GitHubのトークン>
GITHUB_OWNER=<GitHubのオーナー>
GITHUB_REPO=<GitHubのレポジトリ>
GITHUB_BRANCH=<コミット先のブランチ名>
GITHUB_PATH=<コミットするGitHubのディレクトリのパス>
```

## デプロイ時の設定
`wrangler.toml` に環境変数を追記してから `yarn deploy` を実行する

```toml:wrangler.toml
[vars]
GTHUB_ACCESS_TOKEN=<GitHubのトークン>
GITHUB_OWNER=<GitHubのオーナー>
GITHUB_REPO=<GitHubのレポジトリ>
GITHUB_BRANCH=<コミット先のブランチ名>
GITHUB_PATH=<コミットするGitHubのディレクトリのパス>
```
> [!CAUTION]
> `wrangler.toml` はGitで管理されているため、Githubにコミットしないように注意していください

# コマンド
## 開発用
```sh
yarn install
yarn dev
```

## Cloudflare Workersへのデプロイ
```sh
yarn deploy
```

## workersのリアルタイムのログを見る
```sh
yarn log
```
