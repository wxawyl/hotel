# 会安酒店集群官网

一个完整的酒店集群网站系统，包含前台展示、后台管理和API服务。

## 项目结构

```
hotel/
├── backend/          # 后端API服务
├── frontend/         # 前台展示网站
├── admin/            # 后台管理系统
├── database/         # 数据库文件
└── docs/             # 文档
```

## 技术栈

### 后端
- Node.js + Express
- SQLite 数据库
- Multer (文件上传)
- Sharp (图片处理)
- JWT (身份认证)

### 前端
- React 18
- React Router
- i18next (多语言)
- Tailwind CSS
- Vite

### 后台管理
- React 18
- Tailwind CSS
- Axios

## 快速开始

### 1. 安装依赖

#### 后端
```bash
cd backend
npm install
```

#### 前端
```bash
cd frontend
npm install
```

#### 后台管理
```bash
cd admin
npm install
```

### 2. 初始化数据库

```bash
cd backend
npm run init-db
```

### 3. 配置环境变量

在 `backend` 目录下创建 `.env` 文件：

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password-here
```

### 4. 启动服务

#### 启动后端
```bash
cd backend
npm run dev
```

#### 启动前端 (新终端)
```bash
cd frontend
npm run dev
```

#### 启动后台管理 (新终端)
```bash
cd admin
npm run dev
```

### 5. 访问应用

- 前台网站: http://localhost:5173
- 后台管理: http://localhost:5174
- 后端API: http://localhost:5000

## 默认账号

- 用户名: `admin`
- 密码: `admin123` (可在 .env 中修改)

## 功能特性

### 前台网站
- 🏨 酒店集群展示
- 📍 单店详情页
- 📅 在线预订
- 🌍 多语言支持 (英/德/日/韩/中)
- 💱 多币种支持
- 📱 响应式设计
- 📸 图片画廊

### 后台管理
- 🏨 酒店管理
- 🛏️ 房型管理
- 🖼️ 图片管理 (重点功能)
- 📋 订单管理
- 🛎️ 服务管理
- ⚙️ 站点设置
- 💱 汇率管理

## 图片管理功能

- 按酒店分类管理图片
- 支持分类标签 (外观/周边/公共区域/房间/早餐/Banner/文旅/商品)
- 批量上传图片
- 自动压缩和生成缩略图
- 拖拽排序
- 隐藏/显示图片
- 删除图片

## 部署指南

### 1. 环境要求
- Node.js 18+
- 阿里云国际版 (新加坡节点)
- Cloudflare CDN

### 2. 构建生产版本

#### 后端
```bash
cd backend
npm install
```

#### 前端
```bash
cd frontend
npm run build
```

#### 后台管理
```bash
cd admin
npm run build
```

### 3. 服务器部署

#### 使用 PM2 管理后端进程
```bash
npm install -g pm2
cd backend
pm2 start src/server.js --name hotel-backend
```

#### 使用 Nginx 代理前端
将 `frontend/dist` 和 `admin/dist` 的内容部署到 web 服务器。

#### 配置 Cloudflare CDN
- 添加 DNS 记录
- 启用 HTTPS
- 配置缓存规则

### 4. 数据库备份

定期备份 `database/hotel.db` 文件。

## 开发说明

### API 文档

#### 认证
- `POST /api/auth/login` - 管理员登录

#### 酒店
- `GET /api/hotels` - 获取酒店列表
- `POST /api/hotels` - 创建酒店 (需认证)
- `PUT /api/hotels/:id` - 更新酒店 (需认证)
- `DELETE /api/hotels/:id` - 删除酒店 (需认证)

#### 房型
- `GET /api/rooms/hotel/:hotelId` - 获取房型列表
- `POST /api/rooms` - 创建房型 (需认证)
- `PUT /api/rooms/:id` - 更新房型 (需认证)
- `DELETE /api/rooms/:id` - 删除房型 (需认证)

#### 图片
- `GET /api/images/hotel/:hotelId` - 获取图片列表
- `POST /api/images/upload` - 上传图片 (需认证)
- `PUT /api/images/:id` - 更新图片 (需认证)
- `DELETE /api/images/:id` - 删除图片 (需认证)

#### 订单
- `POST /api/bookings` - 创建预订
- `GET /api/bookings/find/:bookingNumber` - 查询订单
- `GET /api/bookings` - 获取订单列表 (需认证)
- `PUT /api/bookings/:id/status` - 更新订单状态 (需认证)
- `GET /api/bookings/export/csv` - 导出订单CSV (需认证)

#### 服务
- `GET /api/services` - 获取服务列表
- `POST /api/services` - 创建服务 (需认证)
- `PUT /api/services/:id` - 更新服务 (需认证)
- `DELETE /api/services/:id` - 删除服务 (需认证)

#### 设置
- `GET /api/settings` - 获取站点设置
- `PUT /api/settings` - 更新站点设置 (需认证)
- `GET /api/settings/exchange-rates` - 获取汇率
- `PUT /api/settings/exchange-rates` - 更新汇率 (需认证)

## 多语言支持

当前支持的语言：
- English (en)
- Deutsch (de)
- 한국어 (ko)
- 日本語 (ja)
- 中文 (zh)

## 多币种支持

当前支持的货币：
- USD (美元)
- EUR (欧元)
- GBP (英镑)
- AUD (澳元)
- VND (越南盾)

## 扩展功能预留

- PayPal 支付集成
- 在线客服系统
- 邮件通知
- 更多语言支持

## 安全注意事项

1. 修改默认密码
2. 使用强 JWT_SECRET
3. 启用 HTTPS
4. 定期备份数据库
5. 限制后台访问 IP

## 技术支持

如有问题，请查看文档或联系技术支持。

## License

MIT
