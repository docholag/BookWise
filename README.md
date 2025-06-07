<div align="center">

# 🎓 University Library Management System

![next.js](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&color=3178C6)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logo=postgresql&color=4169E1)
![Upstash](https://img.shields.io/badge/-Upstash-black?style=for-the-badge&logo=upstash&color=00E9A3)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&color=06B6D4)

</div>

---

## 📌 Giới thiệu

Hệ thống Quản lý Thư viện Đại học được phát triển bằng Next.js, TypeScript và PostgreSQL. Dự án bao gồm giao diện người dùng và trang quản trị, hỗ trợ toàn diện quy trình mượn – trả sách, quản lý người dùng, gửi email tự động, phân quyền, thống kê và nhiều tính năng nâng cao phù hợp cho môi trường sản xuất.

---

## ⚙️ Công nghệ sử dụng

- **Next.js** – Framework React mạnh mẽ
- **TypeScript** – Kiểu tĩnh cho JavaScript
- **PostgreSQL** (Neon) – Cơ sở dữ liệu quan hệ
- **Upstash Redis** – Caching và xử lý nền
- **Tailwind CSS + ShadCN** – Giao diện hiện đại
- **Drizzle ORM** – Truy vấn cơ sở dữ liệu dễ dàng
- **ImageKit** – Tối ưu hóa ảnh/video
- **Resend** – Gửi email tự động
- **NextAuth** – Xác thực bảo mật và mở rộng

---

## 🔋 Tính năng chính

- ✅ **Đăng ký, đăng nhập, phân quyền** (user, admin)
- 📚 **Trang sách**: tìm kiếm, lọc, phân trang, xem chi tiết
- 💾 **Mượn – Trả sách**: ghi nhận lịch sử, xuất hóa đơn PDF
- 🔔 **Email tự động**: nhắc hạn, xác nhận mượn, thông báo hệ thống
- 🧾 **Trang quản trị**: quản lý sách, người dùng, đơn đăng ký tài khoản
- 📈 **Dashboard thống kê**: số lượng sách, người dùng, lượt mượn, ...
- 🛡️ **Bảo mật và hiệu năng**: caching Redis, rate-limit, DDoS protection

---

## 🔧 Yêu cầu

- Git
- Node.js (>=18)
- pnpm (hoặc npm)

## 📦 Cài đặt dependencies

Install the project dependencies using pnpm:

```bash
pnpm install
```

## 🛠️ Thiết lập môi trường

Tạo file .env trong thư mục web-app với nội dung như sau:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

AUTH_SECRET=

QSTASH_URL=
QSTASH_TOKEN=

RESEND_TOKEN=
```
Điền đầy đủ các giá trị từ tài khoản của bạn tại: ImageKit, NeonDB, Upstash, Resend.

## ▶️ Chạy ứng dụng

```bash
pnpm db:migrate
pnpm seed
pnpm dev
```

Mở trình duyệt và truy cập: http://localhost:3000.

## 📚 Ghi chú

Dự án hướng đến việc học tập và triển khai thực tế. Phù hợp với sinh viên ngành CNTT, những người muốn học Next.js chuyên sâu, hoặc các nhóm đang tìm kiếm giải pháp quản lý thư viện cho tổ chức.

Nếu bạn cần hỗ trợ hoặc muốn đóng góp, hãy tạo issue hoặc pull request trong repo chính.
