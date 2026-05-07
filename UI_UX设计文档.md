# 越南岘港会安古镇酒店集群官网 - UI/UX设计文档

## 一、设计系统

### 1.1 设计风格
- **整体风格**: 东南亚海岛高端简约风格
- **设计语言**: 极简主义，强调留白与自然质感
- **调性**: 宁静、奢华、自然、温暖

### 1.2 色彩系统

#### 主色调
```css
--color-ocean: #0077B6        /* 海洋蓝 - 主色 */
--color-sand: #F4E4C1         /* 沙米色 - 背景 */
--color-coral: #FF6B6B        /* 珊瑚红 - 强调 */
--color-palm: #2D6A4F         /* 棕榈绿 - 辅助 */
```

#### 中性色
```css
--color-white: #FFFFFF
--color-cream: #FAF8F5
--color-gray-50: #F9FAFB
--color-gray-100: #F3F4F6
--color-gray-200: #E5E7EB
--color-gray-300: #D1D5DB
--color-gray-400: #9CA3AF
--color-gray-500: #6B7280
--color-gray-600: #4B5563
--color-gray-700: #374151
--color-gray-800: #1F2937
--color-gray-900: #111827
```

### 1.3 字体系统

#### 字体家族
- **英文**: Inter (无衬线，现代感)
- **中文**: Noto Sans SC
- **日文**: Noto Sans JP
- **韩文**: Noto Sans KR
- **德文**: Inter

#### 字体层级
```css
--text-5xl: 3rem (48px)
--text-4xl: 2.25rem (36px)
--text-3xl: 1.875rem (30px)
--text-2xl: 1.5rem (24px)
--text-xl: 1.25rem (20px)
--text-lg: 1.125rem (18px)
--text-base: 1rem (16px)
--text-sm: 0.875rem (14px)
--text-xs: 0.75rem (12px)
```

### 1.4 间距系统
```css
--spacing-1: 0.25rem (4px)
--spacing-2: 0.5rem (8px)
--spacing-3: 0.75rem (12px)
--spacing-4: 1rem (16px)
--spacing-6: 1.5rem (24px)
--spacing-8: 2rem (32px)
--spacing-12: 3rem (48px)
--spacing-16: 4rem (64px)
--spacing-20: 5rem (80px)
```

### 1.5 圆角系统
```css
--radius-sm: 0.25rem (4px)
--radius-md: 0.5rem (8px)
--radius-lg: 0.75rem (12px)
--radius-xl: 1rem (16px)
--radius-2xl: 1.5rem (24px)
--radius-full: 9999px
```

### 1.6 阴影系统
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

## 二、响应式断点

```css
sm: 640px    /* 手机横屏 */
md: 768px    /* 平板 */
lg: 1024px   /* 小屏笔记本 */
xl: 1280px   /* 桌面 */
2xl: 1536px  /* 大屏桌面 */
```

## 三、页面设计规范

### 3.1 首页 (Home Page)

#### 布局结构
- **Hero区域**: 全屏轮播Banner，展示三家酒店精选图片
- **酒店集群介绍**: 三列卡片布局（移动端单列）
- **文旅推荐**: 横向滚动卡片
- **CTA区域**: 预订按钮 + WhatsApp联系

#### 关键组件
- 导航栏：透明背景 + 滚动时白色背景
- 语言切换：下拉选择
- 币种切换：下拉选择
- 轮播图：自动播放 + 手势滑动

### 3.2 酒店列表页 (Hotel List Page)

#### 布局结构
- 顶部筛选栏
- 酒店卡片网格
- 每个卡片包含：主图、名称、标签、简短介绍、查看详情按钮

### 3.3 单店详情页 (Hotel Detail Page)

#### 布局结构
- 图片画廊：顶部大图 + 缩略图网格
- 酒店介绍
- 设施标签
- 房型列表
- 周边环境图集
- 公共区域图集
- 早餐图集
- 预订入口

### 3.4 预订中心页 (Booking Page)

#### 布局结构
- 日期选择器
- 房型选择
- 服务选择（接机/早餐/SPA等）
- 价格明细（支持多币种）
- 预订表单
- 确认提交

### 3.5 周边文旅页 (Cultural Page)

#### 布局结构
- 景点卡片网格
- 每个卡片：图片、名称、简短介绍
- 点击查看详情（模态框或新页面）

### 3.6 商品展示页 (Products Page)

#### 布局结构
- 分类筛选
- 商品卡片网格
- 仅展示，提示到店选购

### 3.7 订单查询&联系页 (Contact Page)

#### 布局结构
- 订单查询表单（订单号+邮箱）
- 联系信息展示
- WhatsApp按钮
- 谷歌地图嵌入
- 联系表单

## 四、后台管理UI设计

### 4.1 布局结构
- 左侧边栏导航
- 顶部操作栏
- 主内容区域

### 4.2 核心模块UI

#### 图片管理模块
- 分酒店标签页
- 分类筛选
- 网格视图展示
- 拖拽排序
- 批量操作工具栏
- 单图编辑弹窗

#### 酒店信息编辑
- 多语言标签页编辑
- 富文本编辑器
- 设施标签管理

## 五、交互设计

### 5.1 微交互
- 按钮悬停：轻微放大 + 阴影加深
- 图片加载：淡入效果
- 页面切换：平滑滚动
- 表单验证：实时反馈

### 5.2 动画
- 轮播图切换：淡入淡出
- 模态框出现：缩放+淡入
- 下拉菜单：滑入效果

### 5.3 无障碍设计
- 键盘导航完整支持
- 屏幕阅读器友好
- 颜色对比度符合WCAG AA标准
- 文字大小可调整

## 六、性能优化设计

### 6.1 图片策略
- WebP格式优先
- 响应式图片 (srcset)
- 懒加载 (Intersection Observer)
- 缩略图+原图双版本

### 6.2 代码策略
- 路由级代码分割
- 组件懒加载
- 第三方库按需引入
