# yiFer-vue-admin

### 介绍

由于作者公司项目多数为企业后台管理系统的定制，所以在闲暇时间开发了这款基于 Vue3、Vite、Element-plus 和 TypeScript 的开箱即用方案。本项目使用了最新的前端技术栈，实现了诸如组件二次封装、hooks 抽取、动态菜单路由、权限按钮控制等功能，通过它能够快速搭建企业级应用以完成您的需求，希望对你有帮助！

### 安装使用步骤

- **Clone：**

```text
# 克隆地址

```

- **Install：**

```text
# 推荐使用pnpm，能够快速安装依赖的同时还能够极大的减少你的磁盘空间占用！
pnpm install

# 如果依赖安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令替换淘宝镜像：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```text
pnpm dev
```

- **Build：**

```text
# 开发环境
pnpm build:dev

# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro
```

- **Lint：**

```text
# eslint 检测代码
pnpm lint

- **commit：**

```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
npm run commit
```
