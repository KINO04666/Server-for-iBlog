
欢迎使用 **iBlog**！iBlog 是一个基于 **Express** 和 **MySQL 8.0** 构建的个人博客系统，旨在帮助用户轻松创建、管理和分享博客文章。
## 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [安装与配置](#安装与配置)
- [使用指南](#使用指南)
- [API文档](#API文档)
- [数据库设计](#数据库设计)

---

## 项目简介

iBlog 是一个简单而强大的个人博客系统，允许创建、编辑和删除博客文章。该系统采用 **RESTful API** 架构，后端使用 **Express** 处理路由和业务逻辑，数据存储则由 **MySQL 8.0** 提供支持。

## 功能特性

- **博客文章管理**：
  - 创建新文章
  - 编辑已有文章
  - 删除文章
  - 查看所有文章
  - 查看单篇文章详情

## 技术栈

- **后端**：
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MySQL 8.0](https://www.mysql.com/)
- **开发工具**：
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Postman](https://www.postman.com/) 用于 API 测试
  - [MySQL Workbench](https://www.mysql.com/products/workbench/) 用于数据库管理

## 安装与配置

### 前提条件

- **Node.js**（推荐版本 14.x 及以上）
- **MySQL 8.0** 或更高版本

### 步骤 1：克隆仓库

```bash
git clone https://github.com/yourusername/iblog.git
cd iblog
```
### 步骤 2：安装依赖
```
npm install express body-parser dotenv 
npm install mysql2
```
### 步骤 3：配置环境变量

创建一个 `.env` 文件在项目根目录，并添加以下内容：
```
# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=iblog

# 服务器端口
PORT=3000

```
### 步骤 4：设置数据库

#### 方法一：使用 MySQL 命令行

1. **登录 MySQL**：
    `mysql -u root -p`
2. **执行 SQL 脚本**：
```sql
-- 创建数据库
CREATE DATABASE iblog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE iblog;

-- 创建用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建博客文章表
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 步骤 5：启动服务器

在项目根目录下运行以下命令以启动服务器：

```bash
# 开发模式（使用 nodemon 自动重启）
npm run dev

# 生产模式
npm start

```
启动成功后，您将在终端中看到：
```
Server is running on port 3000
```

## 使用指南

### 创建博客文章

1. **Endpoint**: `POST /api/posts`
2. **请求体**:
```json
{
  "title": "我的第一篇博客",
  "content": "这是博客的内容。"
}

```
3. **响应**:
```json
{
  "id": 1,
  "title": "我的第一篇博客",
  "content": "这是博客的内容。"
}

```
### 获取所有博客文章

1. **Endpoint**: `GET /api/posts`
    
2. **响应**:
```json
[
  {
    "id": 1,
    "title": "我的第一篇博客",
    "content": "这是博客的内容。",
    "created_at": "2023-10-03T12:00:00.000Z",
    "updated_at": "2023-10-03T12:00:00.000Z",
    "username": "admin"
  },
  ...
]

```
### 获取单篇博客文章

1. **Endpoint**: `GET /api/posts/:id`
    
2. **响应**:
```json
{
  "id": 1,
  "title": "我的第一篇博客",
  "content": "这是博客的内容。",
  "created_at": "2023-10-03T12:00:00.000Z",
  "updated_at": "2023-10-03T12:00:00.000Z",
  "username": "admin"
}

```
### 更新博客文章

1. **Endpoint**: `PUT /api/posts/:id`
    
2. **请求体**:
```json
{
  "title": "更新后的标题",
  "content": "更新后的内容。"
}

```
3. **响应**:
```json
{
  "message": "博客文章更新成功"
}

```
### 删除博客文章

1. **Endpoint**: `DELETE /api/posts/:id`
    
2. **响应**:
```json
{
  "message": "博客文章删除成功"
}

```

## API文档
### 博客文章相关

- **获取所有博客文章**
    
    - **URL**: `/api/posts`
        
    - **方法**: `GET`
        
    - **成功响应**:
```json
    [
	  {
    "id": "integer",
    "title": "string",
    "content": "string",
    "created_at": "datetime",
    "updated_at": "datetime",
    "username": "string"
	  },
	]

```
- **获取单篇博客文章**
	- **URL**: `/api/posts/:id`
    
	- **方法**: `GET`
    
	- **成功响应**:
```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "created_at": "datetime",
  "updated_at": "datetime",
  "username": "string"
}

```
- **创建博客文章**

- **URL**: `/api/posts`
    
- **方法**: `POST`
    
- **请求体**:
```json
{
  "title": "string",
  "content": "string"
}

```
- **成功响应**:
```json
{
  "id": "integer",
  "title": "string",
  "content": "string"
}

```
**更新博客文章**

- **URL**: `/api/posts/:id`
    
- **方法**: `PUT`
    
- **请求体**:
```json
{
  "title": "string",
  "content": "string"
}

```
- **成功响应**:
```json
{
  "message": "博客文章更新成功"
}

```

- **删除博客文章**

- **URL**: `/api/posts/:id`
    
- **方法**: `DELETE`
    
- **成功响应**:
```json
{
  "message": "博客文章删除成功"
}

```
## 数据库设计

### 数据库：`iblog`

#### 表：`users`

|字段|类型|描述|
|---|---|---|
|`id`|INT, PRIMARY KEY|用户唯一标识，自动递增|
|`username`|VARCHAR(50)|用户名，唯一，不可为空|
|`password`|VARCHAR(255)|密码，哈希存储，不可为空|
|`created_at`|TIMESTAMP|创建时间，默认当前时间|

#### 表：`posts`

| 字段           | 类型               | 描述                      |
| ------------ | ---------------- | ----------------------- |
| `id`         | INT, PRIMARY KEY | 文章唯一标识，自动递增             |
| `user_id`    | INT              | 关联的用户ID，外键，引用`users.id` |
| `title`      | VARCHAR(255)     | 文章标题，不可为空               |
| `content`    | TEXT             | 文章内容，不可为空               |
| `created_at` | TIMESTAMP        | 创建时间，默认当前时间             |
| `updated_at` | TIMESTAMP        | 更新时间，默认当前时间，自动更新        |
