```
./
├── .github                           # github 相关配置
├── .vscode                           # vscode 配置
├── .husky                            # 代码校验钩子
├── icons/                            # 本地 svg 存放目录用于转换为 iconify 的字体图标
│   └── add.svg
├── public/                           # 存放固定的静态资源
├── src/
│   ├── analytics/                    # 数据统计插件
│   │   ├── baidu.tsx
│   │   ├── facebook.tsx
│   │   ├── google.tsx
│   │   ├── index.tsx
│   │   └── yandex.tsx
│   ├── app/                          # 页面资源存放（详情请参考 Next.js 的 App Router 模式）
│   │   ├── [lng]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── projects/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts                 # robots.txt
│   │   └── sitemap.ts                # sitemap.xml
│   ├── components/                   # 全局组件目录
│   │   ├── icon/                     # Iconify 组件
│   │   │   ├── index.tsx
│   │   │   └── local.json            # Iconify 本地图标数据
│   │   └── ui/                       # @shadcn/ui 组件
│   ├── hooks/                        # 全局 hook 目录
│   ├── i18n/                         # 国际化组件目录
│   │   ├── client.ts                 # 客户端方法
│   │   ├── config.ts                 # 国际化配置
│   │   ├── index.ts                  # 国际化统一出口
│   │   ├── server.ts                 # 服务端方法
│   │   └── locales/                  # 国际化字典目录
│   ├── layout/                       # 布局组件
│   │   ├── footer.tsx                # 底部组件
│   │   ├── header.tsx                # 头部组件
│   │   ├── scroll.tsx                # 全局滚动条
│   │   ├── switch-language.tsx       # 语言切换组件
│   │   └── switch-mode.tsx           # 模式切换组件
│   ├── lib/                          # 公共包
│   │   ├── constants.ts              # 全局变量
│   │   ├── cookies/                  # cookie 方法的封装
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── countries.ts              # 国家代码及语言代码
│   │   ├── request.ts                # 统一请求封装
│   │   ├── site.ts                   # 站点源数据配置
│   │   └── utils.ts                  # 通用工具类
│   ├── providers/                    # Provider 组件目录
│   │   ├── index.tsx                 # 统一出口
│   │   └── react-query.tsx           # ReactQuery的Provider
│   └── stores/                       # 状态管理目录
│       └── global.ts                 # 全局配置状态
├── .changelogrc.js                   # 生成更新日志配置
├── .commitlintrc.json                # git 提交信息规范配置
├── .env.development                  # 开发环境的全局变量配置
├── .eslintignore                     # js｜ts 代码规范跳过文件配置
├── .eslintrc.json                    # js｜ts 代码规范配置
├── .gitignore                        # 忽略代码提交配置
├── .i18nrc.js                        # 国际化翻译配置
├── .iconifyrc.js                     # iconify 本地 svg 转换配置
├── .lintstagedrc                     # 代码提交钩子配置
├── .prettierignore                   # 代码规范跳过文件配置
├── .prettierrc.js                    # 代码规范配置
├── .releaserc.js                     # release 规范配置
├── .remarkrc.js                      # markdown 规范配置
├── .stylelintrc.json                 # css 规范配置
├── components.json                   # @shadcn/ui 组件配置
├── next.config.mjs                   # next.js 配置
├── openapi.config.ts                 # openapi 配置
├── postcss.config.mjs                # postcss 配置
├── tailwind.config.ts                # tailwind.css 配置
├── tailwind.css                      # 全局样式
├── tsconfig.json                     # typescript 配置
└── types.d.ts                        # 全局类型声明
```
