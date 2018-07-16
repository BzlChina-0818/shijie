## 开发构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /public/       # 公共文件，编译时copy至dist目录
│ ├── /components/   # UI组件及UI相关方法
│ ├── /routes/       # 路由组件
│ │ ├──/customerForm/           # 动态表单配置管理
│ │ ├──/dynamicTemplate/        # 动态表单
│ │ ├──/entryInvoice/           # 进项发票管理
│ │ │ ├──/generalTicketInspection/			# 普票查验
│ │ │ │ ├──/statusWarning/
│ │ │ ├──/inquiryStatistics/           	    # 查询统计
│ │ │ │ ├──/authentication/
│ │ │ │ ├──/registInvoiceInformation/
│ │ │ ├──/invoiceEntry/           			# 发票录入
│ │ │ │ ├──/generalTicketInspection/
│ │ │ ├──/obtainedEntry/           			# 专用发票获取
│ │ │ │ ├──/generalTicketInspection/
│ │ │ │──/SpecialCertification/           	# 专票认证
│ │ │ │ ├──/certification/
│ │ └── app.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ │ └──/page/        # 页面样式
│ ├── /mock/         # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── enums.js     # 枚举值配置
│ │ ├── city.js    	 # 省市县三级联动
│ │ ├── request.js   # 异步请求函数
│ │ └── path.js      # 接口请求路径管理
│ ├── /router/       # 路由配置
│ ├── registerTaxProof.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .roadhogrc.js    # roadhog配置
```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写（如`DataTable`），方法首字母小写（如`layer`）,文件夹内主文件与文件夹同名，多文件以`registerTaxProof.js`导出对象（如`./src/components/Layout`）。
-   routes：页面为单位以文件夹保存，文件夹名首字母小写（特殊除外，如`UIElement`）,文件夹内主文件以`registerTaxProof.js`导出，多文件时可建立`components`文件夹（如`./src/routes/dashboard`），如果有子路由，依次按照路由层次建立文件夹（如`./src/routes/UIElement`）。

### 快速开始

克隆项目文件:

```bash
git clone git@192.168.0.100:guoqianyuan/tax.git
```

进入目录安装依赖:

```bash
#开始前请确保没有安装roadhog、webpack到NPM全局目录, 国内用户推荐yarn或者cnpm
npm i 或者 yarn install
```

开发：

```bash
npm run build:dll #第一次npm run dev时需运行此命令，使开发时编译更快
npm run dev
打开 http://localhost:8000
```

构建：

```bash
npm run build

将会打包至dist/{version}目录 #package.json里version字段

npm run build:new

将会打包至dist/{version增加1}目录 #package.json里version字段
```

代码检测：

```bash
npm run lint

```
