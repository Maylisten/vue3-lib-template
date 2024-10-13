# 打包并发布项目
## 创建 github 仓库
创建 github 仓库

## 初始化 git 并关联仓库
```shell
git init
git add .
git commit -m "init"
git remote add origin github仓库地址
git push -u origin main
```

## 补全 packages.json 信息
packages/components/packages.json 中
```json
{
  "homepage": "https://${用户名}.github.io/${仓库名}",
  "repository": {
    "type": "git",
    "url": "git+${仓库地址}"
  },
  "bugs": {
    "url": "${仓库地址}/issues"
  }
}
```
## 更新文档配置
doc/.vitepress/config.mts

```ts
export default defineConfig({
  // ...
  base: "/${github仓库名称}",
  // ...
})
```

## 打包组件库
```shell
pnpm run build
```

## 发布项目
交互式发布项目到 github 和 npm 仓库
```shell
pnpm run release
```

