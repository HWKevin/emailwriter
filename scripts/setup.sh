#!/bin/bash

# EmailWriter - Setup & Initialize Database

echo "=== EmailWriter Setup ==="
echo ""

# 安装依赖
echo "1. Installing dependencies..."
npm install

# 生成 Prisma Client
echo ""
echo "2. Generating Prisma Client..."
npx prisma generate

# 推送数据库 schema（创建表）
echo ""
echo "3. Pushing database schema to database..."
npx prisma db push --accept-data-loss

echo ""
echo "=== Database setup completed ==="
echo ""
echo "Next steps:"
echo "1. Start dev server: npm run dev"
echo "2. Open http://localhost:3000"
echo ""
echo "Note: Ensure DATABASE_URL is set in .env.local before running."
