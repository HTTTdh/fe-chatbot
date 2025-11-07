# 🎯 Facebook Pages Management - Tài liệu tổng hợp

## 📋 Tổng quan

Chức năng quản lý Facebook Pages cho phép:
- ✅ **Thêm** Facebook Page mới
- ✅ **Xem** danh sách tất cả pages
- ✅ **Sửa** thông tin page
- ✅ **Xóa** page
- ✅ **Bật/Tắt** trạng thái page
- ✅ **Tìm kiếm** theo tên, ID, danh mục

---

## 🗂️ Cấu trúc File đã tạo

### Frontend (TypeScript/React)

```
src/
├── types/
│   └── facebook.ts                    # Type definitions cho Facebook Page
├── services/
│   └── facebookService.ts             # API service layer
├── hooks/
│   └── useFacebookPages.ts            # Custom hook với React Query
├── components/
│   └── shared/
│       ├── FacebookPageForm.tsx       # Form thêm/sửa
│       └── FacebookPageItem.tsx       # Item component + skeleton
└── pages/
    └── PlatformPage.tsx               # Page chính
```

### Backend (Python/FastAPI)

```
Backend/
├── models/
│   └── facebook_page.py               # SQLAlchemy model (đã có)
├── services/
│   └── facebook_page_service.py       # Business logic (đã cập nhật)
├── controllers/
│   └── facebook_page_controller.py    # Controllers (đã có)
└── routers/
    └── facebook_router.py             # Routes (đã có)
```

---

## 🔄 Luồng hoạt động

### 1️⃣ User truy cập `/quan-ly-facebook`

```
User → App.tsx (Route check) → ProtectedRoute 
  ↓
PlatformPage mount
  ↓
useFacebookPages() hook
  ↓
useQuery → getAllFacebookPagesEndpoint()
  ↓
GET /facebook-pages/
  ↓
Backend trả về danh sách pages
  ↓
React Query cache data
  ↓
UI render danh sách FacebookPageItem
```

---

### 2️⃣ User click "Thêm Facebook Page"

```
Click button "Thêm"
  ↓
Dialog mở → FacebookPageForm render
  ↓
User điền form:
  - page_id *
  - page_name *
  - access_token *
  - url
  - description
  - category
  - avatar_url
  - cover_url
  ↓
Submit form
  ↓
createPage() từ hook
  ↓
useMutation → createFacebookPageEndpoint(data)
  ↓
POST /facebook-pages/
  ↓
Backend lưu vào database
  ↓
onSuccess:
  - toast.success()
  - invalidateQueries(['facebookPages'])
  - Auto refetch data
  ↓
Dialog đóng → UI update với page mới
```

---

### 3️⃣ User click "Chỉnh sửa"

```
Click icon 3 chấm → "Chỉnh sửa"
  ↓
handleOpenEditDialog(item)
  ↓
setEditData(item)
  ↓
Dialog mở với form có sẵn data
  ↓
User sửa thông tin → Submit
  ↓
updatePage({ id, data })
  ↓
useMutation → updateFacebookPageEndpoint(id, data)
  ↓
PUT /facebook-pages/{page_id}
  ↓
Backend update database
  ↓
onSuccess:
  - toast.success()
  - invalidateQueries(['facebookPages'])
  - Auto refetch
  ↓
Dialog đóng → UI update
```

---

### 4️⃣ User click "Xóa"

```
Click icon 3 chấm → "Xóa"
  ↓
Confirm dialog mở
  ↓
User confirm xóa
  ↓
deletePage(item.id)
  ↓
useMutation → deleteFacebookPageEndpoint(id)
  ↓
DELETE /facebook-pages/{page_id}
  ↓
Backend xóa khỏi database
  ↓
onSuccess:
  - toast.success()
  - invalidateQueries(['facebookPages'])
  - Auto refetch
  ↓
Item biến mất khỏi list
```

---

### 5️⃣ User click "Bật/Tắt"

```
Click icon 3 chấm → "Bật/Tắt Page"
  ↓
toggleStatus(item.id)
  ↓
useMutation → toggleFacebookPageStatusEndpoint(id)
  ↓
PATCH /facebook-pages/{page_id}/toggle-status
  ↓
Backend toggle is_active
  ↓
onSuccess:
  - toast.success()
  - invalidateQueries(['facebookPages'])
  - Auto refetch
  ↓
Badge status thay đổi (Đang hoạt động ↔ Tắt)
```

---

## 📝 Form Validation

### Các trường bắt buộc (Required):
- ✅ `page_id` - Facebook Page ID
- ✅ `page_name` - Tên Page
- ✅ `access_token` - Page Access Token

### Các trường tùy chọn (Optional):
- ⭕ `url` - URL của page (validate: phải là URL hợp lệ)
- ⭕ `description` - Mô tả page
- ⭕ `category` - Danh mục
- ⭕ `avatar_url` - URL avatar (validate: phải là URL hợp lệ)
- ⭕ `cover_url` - URL ảnh bìa (validate: phải là URL hợp lệ)

**Validation library**: `zod` + `react-hook-form`

---

## 🎨 UI/UX Features

### ✨ Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg
- Touch-friendly buttons

### 🔍 Search Functionality
- Client-side filtering
- Search theo: tên, ID, danh mục
- Real-time update

### 📊 Loading States
- Skeleton loaders khi fetch data
- Spinner buttons khi submit/delete
- Disable buttons trong lúc loading

### 🎭 Visual Feedback
- Toast notifications (success/error)
- Badge cho status (Đang hoạt động/Tắt)
- Badge cho category
- Icons: Facebook icon, Power on/off

---

## 🔐 Security & Authorization

### Route Protection:
```typescript
<Route
  path="/quan-ly-facebook"
  element={
    <ProtectedRoute requiredRoles={["root", "superadmin", "admin"]}>
      <PlatformPage />
    </ProtectedRoute>
  }
/>
```

**Roles có quyền truy cập:**
- ✅ `root`
- ✅ `superadmin`
- ✅ `admin`
- ❌ `user` (không có quyền)

---

## 🧪 Testing Checklist

### Backend Testing:
```bash
# Test GET all pages
curl http://localhost:8000/facebook-pages/

# Test CREATE page
curl -X POST http://localhost:8000/facebook-pages/ \
  -H "Content-Type: application/json" \
  -d '{
    "page_id": "123456789",
    "page_name": "Test Page",
    "access_token": "EAA..."
  }'

# Test UPDATE page
curl -X PUT http://localhost:8000/facebook-pages/1 \
  -H "Content-Type: application/json" \
  -d '{"page_name": "Updated Name"}'

# Test DELETE page
curl -X DELETE http://localhost:8000/facebook-pages/1

# Test TOGGLE status
curl -X PATCH http://localhost:8000/facebook-pages/1/toggle-status
```

### Frontend Testing:
- [ ] Trang load đúng với role phù hợp
- [ ] Danh sách pages hiển thị đúng
- [ ] Search hoạt động
- [ ] Dialog thêm mới mở/đóng đúng
- [ ] Validation form hoạt động
- [ ] Submit thêm mới thành công
- [ ] Edit page thành công
- [ ] Delete page thành công
- [ ] Toggle status thành công
- [ ] Toast notifications hiển thị đúng
- [ ] Loading states hiển thị đúng
- [ ] Responsive trên mobile

---

## 🚀 Deployment Notes

### Frontend Build:
```bash
npm run build
```

### Backend Migration (nếu cần):
```bash
# Nếu đã có model, chạy migration
alembic revision --autogenerate -m "Add url field to facebook_page"
alembic upgrade head
```

### Environment Variables:
```env
# Backend
URL_BE=http://localhost:8000
URL=http://localhost:5173
FB_CLIENT_ID=your_app_id
FB_CLIENT_SECRET=your_app_secret

# Frontend
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📚 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/facebook-pages/` | Lấy tất cả pages |
| POST | `/facebook-pages/` | Tạo page mới |
| PUT | `/facebook-pages/{page_id}` | Cập nhật page |
| DELETE | `/facebook-pages/{page_id}` | Xóa page |
| PATCH | `/facebook-pages/{page_id}/toggle-status` | Bật/tắt page |

---

## 🔧 Troubleshooting

### Lỗi thường gặp:

**1. "Failed to fetch"**
- ✅ Check backend đang chạy
- ✅ Check CORS settings
- ✅ Check API_ENDPOINT đúng

**2. "Unauthorized"**
- ✅ Check user đã login
- ✅ Check role có quyền truy cập
- ✅ Check cookies/tokens

**3. "Validation error"**
- ✅ Check required fields đã điền
- ✅ Check URL format hợp lệ
- ✅ Check access_token đúng

**4. "Page not found"**
- ✅ Check page_id tồn tại trong DB
- ✅ Check backend service query đúng

---

## 💡 Future Improvements

### Có thể thêm:
- [ ] Pagination cho danh sách lớn
- [ ] Export danh sách ra CSV/Excel
- [ ] Bulk operations (delete nhiều pages)
- [ ] Webhook configuration UI
- [ ] Facebook Graph API integration test
- [ ] Page insights/analytics
- [ ] Filter theo status (active/inactive)
- [ ] Sort theo created_at, name, etc.

---

## 📞 Support

Nếu có vấn đề, liên hệ:
- Developer: [Your Name]
- Email: [Your Email]
- Project: chatbot-hcc v3

---

**✅ Hoàn thành!** Chức năng CRUD Facebook Pages đã sẵn sàng sử dụng.
