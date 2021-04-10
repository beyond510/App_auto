name: 番茄看看


on:
  workflow_dispatch:
  schedule:
     - cron: '0 6-15 * * *'
  repository_dispatch:
      types: fqkk
  watch:
    types: started
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
        FQKK_URL: ${{ secrets.FQKK_URL }}
        FQKK_HD: ${{ secrets.FQKK_HD }}       
        TZ: Asia/shanghai
    steps:
      - name: Checkout
        uses: actions/checkout@v1
        
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm install
        run: |
          npm install
      - name: '运行 【番茄看看】'
        if: env.FQKK_HD
        run: |
          node Task/fqkk.js
        env:
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          BARK_PUSH: ${{ secrets.BARK_PUSH }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
          BARK_SOUND: ${{ secrets.BARK_SOUND }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
