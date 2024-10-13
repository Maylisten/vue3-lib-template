# 快速开始
## 使用脚手架创建项目
```shell
// 将 @domain/example 替换为你想发布的 npm 库名
npm create vue3-lib-template@latest
✔ project-name/npm-package-name(default: vue3-components-project) … @domain/example
✔ add tailwindcss? … yes
✔ generate document? … yes
```
## 安装 pnpm
项目利用 pnpm 构建 Monorepo, 如果你没有pnpm，请执行
```shell
npm install -g pnpm
```
## 安装依赖库
```shell
pnpm install
```
## 构建你的组件
在 components 中创建你的组件
## 测试组件
你可以在 play 子项目中测试你的组件效果
```shell
pnpm run dev
```
## 文档
修改 doc 文件夹中的内容，它是用 vitepress 构建的纯静态页面，执行命令预览文档
```shell
pnpm run doc:dev
```

