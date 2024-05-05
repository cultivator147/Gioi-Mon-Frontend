# Sử dụng image node phiên bản 14 làm base image
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies của ứng dụng
RUN npm install --force

# Sao chép toàn bộ mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Build ứng dụng React
RUN npm run build

# Thiết lập môi trường chạy ứng dụng
# ENV NODE_ENV=production

# Expose cổng 3000 để truy cập ứng dụng
EXPOSE 3000

# Chạy ứng dụng React khi container được khởi chạy
CMD ["npm", "start"]