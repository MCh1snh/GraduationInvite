# 🎓 Graduation Invitation

Website thiệp mời lễ tốt nghiệp — React + Vite + Google Sheets + Vercel.

## 1. Chạy trên máy

```bash
npm install
npm run dev
```

## 2. Chỉnh nội dung

Mở `src/main.jsx`, tìm `const CONFIG = { ... }`.

Bạn có thể đổi:
- graduateName
- dateText
- dateShort
- time
- venue
- address
- mapUrl
- timeline
- heroImage

Ảnh địa điểm đặt tại `public/venue.jpg`.

## 3. Kết nối Google Sheets

Mở `google-apps-script/Code.gs`.

- Tạo Google Sheet.
- Extensions → Apps Script.
- Dán Code.gs.
- Deploy → New deployment → Web app.
- Execute as: Me.
- Who has access: Anyone.
- Copy Web app URL.

Sau đó dán URL vào:

```js
rsvpEndpoint: "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
```

## 4. Đưa lên GitHub

Tạo repository mới, sau đó:

```bash
git init
git add .
git commit -m "Initial graduation invitation"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 5. Deploy Vercel

Import repository trên Vercel.

Build command:
`npm run build`

Output:
`dist`

Vercel sẽ tự deploy mỗi khi bạn push code mới.

## Lưu ý

Website hiện hoạt động ngay cả khi chưa kết nối Sheets; khi đó RSVP chỉ được log ở console trình duyệt. Muốn nhận câu trả lời thật, cần cấu hình `rsvpEndpoint`.
