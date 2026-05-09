#!/bin/sh

echo "=== Starting Hotel Management System ==="

echo ""
echo "1️⃣ Initializing database..."
node backend/src/scripts/init-full-data.js

echo ""
echo "2️⃣ Starting server..."
node backend/src/server.js