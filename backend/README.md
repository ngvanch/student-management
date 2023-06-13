# Student-management API server

## Giới thiệu:

Đây là project về phần backend server đề tài **_Quản lý học sinh_** cho đồ án môn học **Nhập môn công nghệ phần mềm** của trường **HCMUS**.

Server được viết theo tiêu chuẩn _RESTful API_.

Ngôn ngữ, framework sử dụng: NodeJS, ExpressJS

Database: MongoDB

## Yêu cầu:

- Cần phải cài đặt `NodeJS v18.16.0` và `npm v9.5.1` để chạy server.

## Cài đặt:

- Chạy câu lệnh trong terminal để cài đặt tất cả các module cần thiết cho server:

```console
npm i
```

### Tham khảo thêm:

- Có thể cài đặt thêm module `nodemon` để chạy server ở chế độ `development`:

```console
npm i -g nodemon
```

## Cấu hình:

- Tạo database trên [MongoDB Atlas](https://www.mongodb.com/atlas/database).

- Tạo và setup file `.env` trong thư mục sourcecode.

`.env` file:

```.env
# Server port để host
# VD:
PORT=9000
# Link MongoDB-uri để server kết nối với MongoDB
# VD:
MONGO_URI={link}
# Mã khoá bí mật để server tạo token
# VD:
JWT_SECRET_KEY=youshallnotpass
# Thời gian sống của token, định dạng: *s (giây), *m (phút), *h (giờ), *d (ngày)
# VD:
TOKEN_LIFETIME=12h
```

## Sử dụng:

- Sử dụng câu lệnh này để chạy server ở chế độ `production`:

```console
npm run server
```

- Sử dụng câu lệnh này để chạy server ở chế độ `development`:

```console
npm run dev
```

## Xác thực yêu cầu (**request**):

- Nhiều API được bảo vệ bằng **Middleware** để chống người lạ có thể xâm nhập vào hệ thống, cần phải thêm mã `Authorization: Bearer {token phù hợp}` vào `header` của **request** để được cho phép liên lạc với server.

## Tính năng:

- Server sử dụng route API `/api/v1/` để nhận request với các method: **GET**, **POST**, **PUT**, **DELETE**.

- VD: https://example.com/api/v1/users/

- Server sẽ trả lời request bằng một respone với định dạng là Json.

```javascript
{
"success": bool,
"data": data/error message
}
```

### Quản lý người dùng:

#### Xuất danh sách thông tin tất cả user:

`/api/v1/users/`

- Method: **GET**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

#### Xuất thông tin user theo _ID_:

`/api/v1/users/{id}`

- Method: **GET**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

#### Thêm user vào hệ thống:

`/api/v1/users/`

- Method: **POST**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

#### Cập nhật thông tin user theo _ID_:

`/api/v1/users/{id}`

- Method: **PUT**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` hoặc là `User cùng ID đã nhập` để sử dụng.

#### Xoá user theo _ID_ ra khỏi hệ thống:

`/api/v1/users/{id}`

- Method: **DELETE**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` hoặc là `User cùng ID đã nhập`.

### Xác thực tài khoản:

#### Đăng nhập:

`api/v1/auth/login`

- Method: **POST**
- Truy cập: Công khai
- Yêu cầu: Không.

#### Đăng ký:

`api/v1/auth/register`

- Method: **POST**
- Truy cập: Riêng tư
- Yêu cầu: Sản phẩm chỉ sử dụng trong nội bộ nên không công khai đăng ký.

#### Xuất thông tin của user hiện tại:

`api/v1/auth/me`

- Method: **GET**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Cập nhật thông tin cá nhân của user hiện tại:

`api/v1/auth/me`
[ ]: TODO

- Method: **PUT**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Chỉnh sửa mật khẩu của user hiện tại:

`api/v1/auth/password`

- Method: **PUT**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

### Quản lý môn học:

#### Xuất danh sách thông tin tất cả môn học:

`/api/v1/subjects/`

- Method: **GET**
- Truy cập: Công khai
- Yêu cầu: Không.

#### Xuất thông tin môn học theo _ID_:

`/api/v1/subjects/{id}`

- Method: **GET**
- Truy cập: Công khai
- Yêu cầu: Không.

#### Thêm môn học vào hệ thống:

`/api/v1/subjects/`

- Method: **POST**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

#### Cập nhật thông tin môn học theo _ID_:

`/api/v1/subjects/{id}`

- Method: **PUT**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Xoá môn học theo _ID_ ra khỏi hệ thống:

`/api/v1/subjects/{id}`

- Method: **DELETE**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

### Quản lý học sinh:

#### Xuất danh sách thông tin tất cả học sinh:

`/api/v1/students/`

- Method: **GET**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Xuất thông tin học sinh theo _ID_:

`/api/v1/students/{id}`

- Method: **GET**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Thêm học sinh vào hệ thống:

`/api/v1/students/`

- Method: **POST**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

#### Cập nhật thông tin học sinh theo _ID_:

`/api/v1/students/{id}`

- Method: **PUT**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Xoá thông tin học sinh theo _ID_ ra khỏi hệ thống:

`/api/v1/students/{id}`

- Method: **DELETE**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

### Quản lý lớp học:

#### Xuất danh sách thông tin tất cả lớp học:

`/api/v1/classes/`

- Method: **GET**
- Truy cập: Công khai
- Yêu cầu: Không.

#### Xuất thông tin lớp học theo _ID_:

`/api/v1/classes/{id}`

- Method: **GET**
- Truy cập: Công khai
- Yêu cầu: Không.

#### Thêm lớp học vào hệ thống:

`/api/v1/classes/`

- Method: **POST**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

#### Cập nhật thông tin lớp học theo _ID_:

`/api/v1/classes/{id}`

- Method: **PUT**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Xoá lớp học theo _ID_ ra khỏi hệ thống:

`/api/v1/classes/{id}`

- Method: **DELETE**
- Truy cập: Riêng tư
- Yêu cầu: Phải là `Admin` để sử dụng.

### Quản lý bảng điểm:

#### Xuất danh sách bảng điểm của tất cả học sinh:

`/api/v1/scores/`

- Method: **GET**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Xuất bảng điểm theo _ID_ của học sinh:

`/api/v1/scores/{id}`

- Method: **GET**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Thêm bảng điểm của học sinh vào hệ thống:

`/api/v1/scores/`

- Method: **POST**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

#### Cập nhật bảng điểm học sinh theo _ID_:

`/api/v1/scores/{id}`

- Method: **PUT**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.

* Cập nhật theo mẫu body **Json** như sau:

```javascript
{
"subjectScore":[
{
"subject": "Toan Hoc",
"_15mins": [6, 8, 9],
"_45mins": [7, 8, 2],
"_semester": 9
},
{
"subject": "Van Hoc",
"_15mins": [6, 8, 10, 9],
"_45mins": [2],
"_semester": 10
},
...
]
}
```

#### Xoá bảng điểm của học sinh theo _ID_ ra khỏi hệ thống:

`/api/v1/scores/{id}`

- Method: **DELETE**
- Truy cập: Riêng tư
- Yêu cầu: `User` đã đăng nhập vào hệ thống.
