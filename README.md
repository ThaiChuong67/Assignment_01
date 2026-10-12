# MMA301 – MULTIPLATFORM MOBILE APP DEVELOPMENT
## ASSIGNMENT 1: PROFILE & ACTIVITY APP
**Navigation • Components • State • Forms • Lists • Persistence**

---

## 1. Overview & Project Information

* **Học phần:** MMA301 – Multiplatform Mobile App Development (Kỳ 7)
* **Dự án:** Assignment 01 – Personal Profile & Activity App
* **Nền tảng:** React Native (Expo SDK 57)
* **Ngôn ngữ:** JavaScript (Clean Architecture)
* **State Management:** `useState` + Context API (`ThemeContext`, `ProfileContext`, `ActivityContext`)
* **Persistence:** `@react-native-async-storage/async-storage` với Service Layer (`storageService.js`)
* **Navigation:** React Navigation v7 (Bottom Tabs + Native Stack)

---

## 2. Hướng dẫn cài đặt và khởi chạy (How to Run)

### Yêu cầu môi trường
* Node.js >= 18 (Khuyến nghị Node.js LTS hoặc Node.js 20+)
* Trình quản lý gói: `npm` hoặc `yarn`
* Trình giả lập: Android Emulator / LDPlayer hoặc ứng dụng **Expo Go** trên thiết bị thật.

### Các bước khởi chạy
```bash
# 1. Điều hướng vào thư mục dự án
cd "d:/Study lesson/ki7/MMA/New folder/Assignment_01"

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi động Expo Development Server
npx expo start
```
* **Chạy trên Android Emulator / LDPlayer:** Bấm phím `a` trên Terminal.
* **Chạy trên thiết bị thật:** Quét mã QR code xuất hiện trên Terminal bằng app **Expo Go** (Android) hoặc Camera (iOS).

---

## 3. Kiến trúc hệ thống & Sơ đồ màn hình (Screen & Workflow Map)

### 3.1 Cấu trúc thư mục (Clean Code Architecture)
```
Assignment_01/
├── assets/                  # Icons, splash screen, adaptive icons
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ActivityItem.js      # Card hiển thị 1 hoạt động trong FlatList
│   │   ├── AddActivityModal.js  # Modal thêm mới hoạt động/sở thích có validation
│   │   ├── CustomButton.js      # Nút bấm tái sử dụng đa biến thể (primary/danger/...)
│   │   ├── CustomInput.js       # Input kiểm soát (Controlled) kèm báo lỗi động
│   │   ├── EmptyState.js        # Giao diện hiển thị khi danh sách rỗng
│   │   ├── HeaderBanner.js      # Thanh tiêu đề chuẩn hóa cho các màn hình
│   │   ├── ProfileCard.js       # Thẻ tóm tắt thông tin hồ sơ
│   │   └── ThemeToggle.js       # Công tắc chuyển đổi Light / Dark theme
│   ├── constants/           # Dữ liệu tĩnh & Hằng số
│   │   ├── defaultData.js       # Seed dữ liệu mặc định ban đầu
│   │   └── storageKeys.js       # Định nghĩa các AsyncStorage keys
│   ├── contexts/            # Quản lý trạng thái chia sẻ (Context API)
│   │   ├── ActivityContext.js   # Quản lý danh sách hoạt động, yêu thích, tham gia
│   │   ├── ProfileContext.js    # Quản lý thông tin hồ sơ người dùng
│   │   └── ThemeContext.js      # Quản lý Light / Dark mode toàn ứng dụng
│   ├── navigation/          # Cấu hình điều hướng React Navigation
│   │   └── AppNavigator.js      # Kết hợp BottomTabNavigator & NativeStackNavigator
│   ├── screens/             # 5 màn hình chính theo chuẩn Rubric
│   │   ├── ActivityScreen.js    # Danh sách FlatList, tìm kiếm, lọc danh mục, thêm mới
│   │   ├── EditProfileScreen.js # Biểu mẫu chỉnh sửa hồ sơ + validation
│   │   ├── HomeScreen.js        # Trang tổng quan, thống kê nhanh, shortcut điều hướng
│   │   ├── ProfileScreen.js     # Chi tiết hồ sơ cá nhân + thông tin liên hệ
│   │   └── SettingsScreen.js    # Cài đặt giao diện, tùy chọn & Reset dữ liệu
│   ├── services/            # Tầng dịch vụ lưu trữ
│   │   └── storageService.js    # Tách biệt truy xuất AsyncStorage, fallback, serialize
│   └── styles/              # Design System Tokens
│       └── theme.js             # Bảng màu Light/Dark, khoảng cách, bo góc, bóng đổ
├── App.js                   # Cổng vào ứng dụng, bao bọc Providers
├── app.json                 # Cấu hình Expo
├── index.js                 # Điểm đăng ký gốc Expo
└── package.json             # Danh sách dependencies
```

### 3.2 Luồng thực thi xuyên suốt (End-to-End Workflow)
1. **Khởi động ứng dụng (Cold Start):**
   * `ThemeProvider`, `ProfileContext`, `ActivityContext` kích hoạt hàm hydrate bất đồng bộ từ `storageService`.
   * Nếu bộ nhớ máy chưa có dữ liệu hoặc file JSON lỗi, hệ thống tự động fallback về `DEFAULT_PROFILE` và `DEFAULT_ACTIVITIES` an toàn mà không làm sập ứng dụng.
2. **Luồng Hồ sơ (Profile -> Edit Profile):**
   * Người dùng nhấn nút *Edit Profile* trên màn hình Profile (hoặc icon máy ảnh trên avatar).
   * Màn hình `EditProfileScreen` mở ra dưới dạng Stack Screen / Modal, nạp sẵn dữ liệu cũ vào các Controlled Inputs.
   * Khi chỉnh sửa, validation kiểm tra theo thời gian thực: Tên >= 2 ký tự, Bio >= 10 ký tự, định dạng Email và Số điện thoại hợp lệ.
   * Nếu có lỗi: Nút Save từ chối ghi và báo lỗi trực quan.
   * Nếu người dùng bấm Cancel: Ứng dụng cảnh báo hủy bỏ dữ liệu chưa lưu và giữ nguyên trạng thái cũ.
   * Khi bấm Save hợp lệ: Cập nhật ngay vào `ProfileContext` và ghi đè xuống `AsyncStorage`. Cả `HomeScreen` và `ProfileScreen` được vẽ lại ngay lập tức mà không cần khởi động lại ứng dụng.
3. **Luồng Hoạt động & Sở thích (Activity / Interests):**
   * `ActivityScreen` nạp dữ liệu vào `FlatList`.
   * Hỗ trợ thanh tìm kiếm (Search) theo từ khóa và thanh lọc danh mục (All, Technology, Sports, Arts, Academic, Community).
   * Tương tác tức thời: Nhấn nút Trái tim (Favorite) hoặc Nút Tham gia (Join) sẽ đổi trạng thái state và tự động đồng bộ hóa xuống `AsyncStorage`.
   * Thêm hoạt động mới: Bấm nút *New* mở modal `AddActivityModal`, nhập tiêu đề, danh mục, mô tả và thêm ngay vào đầu danh sách.
   * Kéo để làm mới (Pull-to-refresh) hỗ trợ làm mới danh sách mượt mà.
4. **Luồng Cài đặt & Chủ đề (Settings & Preferences):**
   * Chuyển đổi Light Mode / Dark Mode tức thời trên toàn bộ các màn hình thông qua `ThemeContext`.
   * Tùy chọn thông báo và chế độ thẻ gọn gàng (Compact Card Mode).
   * Tính năng Reset dữ liệu (Reset Profile, Reset Activities, hoặc Factory Reset toàn bộ AsyncStorage).

---

## 4. Bảng truy xuất yêu cầu (Requirement Traceability Matrix - RTM)

| ID | Yêu cầu nghiệp vụ | Minh chứng UI / File Code | Test case kiểm chứng |
| :--- | :--- | :--- | :--- |
| **R01** | Dự án Expo/React Native chạy đúng quy ước | `package.json`, `app.json`, `App.js` | Khởi động sạch bằng `npx expo start` |
| **R02** | Điều hướng giữa $\ge$ 5 khu vực/màn hình | `src/navigation/AppNavigator.js` | Mở từng tab Home, Profile, Activities, Settings và Stack EditProfile |
| **R03** | Profile hiển thị đầy đủ dữ liệu | `src/screens/ProfileScreen.js`, `ProfileCard.js` | Hiển thị dữ liệu mặc định & sau khi cập nhật |
| **R04** | Edit Profile + Controlled Form Validation | `src/screens/EditProfileScreen.js` | Test valid, invalid (tên rỗng, bio ngắn, sai email) và Cancel |
| **R05** | Theme Light/Dark chia sẻ bằng Context API | `src/contexts/ThemeContext.js`, `ThemeToggle.js` | Bật/tắt theme tại Home/Settings, kiểm tra app-wide |
| **R06** | Danh sách tối ưu bằng `FlatList` | `src/screens/ActivityScreen.js`, `ActivityItem.js` | Hiển thị dữ liệu, lọc rỗng ra EmptyState, kéo refresh |
| **R07** | Lưu trữ bền vững bằng `AsyncStorage` | `src/services/storageService.js` | Đổi dữ liệu -> Tắt app -> Mở lại vẫn giữ nguyên |
| **R08** | Thành phần giao diện tái sử dụng (Reusable) | `src/components/*` | Tái sử dụng `CustomButton`, `CustomInput`, `ThemeToggle`, `ProfileCard` |
| **R09** | Bố cục Flexbox co giãn, hỗ trợ 2 Theme | `src/styles/theme.js` | Chạy trên các kích thước màn hình dọc, đổi nền/chữ sắc nét |
| **R10** | Trạng thái Fallback và xử lý lỗi | `storageService.js`, `EmptyState.js` | Bộ nhớ rỗng / dữ liệu sai cấu trúc không gây crash |

---

## 5. Nhật ký quyết định thiết kế (Design Decision Record - DDR)

### Quyết định 1: Phân tách tầng lưu trữ (Service-Oriented Storage Isolation)
* **Lựa chọn:** Tạo riêng `src/services/storageService.js` thay vì gọi trực tiếp `AsyncStorage.getItem/setItem` trong component.
* **Lý do:** Tuân thủ nguyên tắc Phân tách trách nhiệm (Separation of Concerns). Toàn bộ logic bẫy lỗi `try/catch`, parse JSON, và fallback về `DEFAULT_PROFILE`/`DEFAULT_ACTIVITIES` được đóng gói 1 nơi.
* **Tác động nếu thay đổi:** Nếu trường học yêu cầu chuyển từ `AsyncStorage` sang `SQLite` hoặc `MMKV`, chỉ cần sửa file service này mà không làm ảnh hưởng đến tầng màn hình giao diện.

### Quyết định 2: Kiến trúc Quản lý Trạng thái (State Ownership Map)
* **Lựa chọn:** Kết hợp Context API cho shared state (`ThemeContext`, `ProfileContext`, `ActivityContext`) và `useState` cho local UI (input focus, modal visible, search query).
* **Lý do:** Đáp ứng chuẩn chỉ rubric môn học (useState + Context API), tránh việc dùng Redux quá cồng kềnh cho scope Assignment 1, đồng thời loại bỏ hoàn toàn tình trạng Prop Drilling.
* **Tác động nếu thay đổi:** Các màn hình độc lập có thể trực tiếp tiêu thụ dữ liệu thông qua custom hooks (`useTheme()`, `useProfile()`, `useActivities()`).

### Quyết định 3: Kiến trúc Điều hướng phối hợp (Tab + Native Stack Navigator)
* **Lựa chọn:** Dùng `createBottomTabNavigator` làm sườn chính cho 4 phân hệ (Home, Profile, Activities, Settings), lồng `createNativeStackNavigator` cho luồng chỉnh sửa Profile (`EditProfileScreen`).
* **Lý do:** Cho phép người dùng chuyển nhanh giữa các khu vực bằng thanh Tab bar hiện đại, đồng thời mở màn hình chỉnh sửa dạng Modal/Stack mượt mà với hoạt ảnh gốc (Native performance).

### Quyết định 4: Chiến lược Validation đa tầng trong biểu mẫu
* **Lựa chọn:** Controlled Component lưu trữ state từng ô nhập liệu kèm cơ chế validate tức thời khi submit/sửa đổi.
* **Lý do:** Đảm bảo không ghi dữ liệu rác xuống ổ cứng; người dùng nhận được phản hồi trực quan ngay dưới từng ô input kèm viền màu đỏ nổi bật.

### Quyết định 5: Cơ chế Hydration an toàn (Fail-Safe Hydration)
* **Lựa chọn:** Khi app khởi chạy, hàm `hydrate` sẽ kiểm tra tính hợp lệ của JSON. Nếu `AsyncStorage` trả về null hoặc chuỗi hỏng (corrupt string), hàm tự động nạp `DEFAULT_PROFILE` từ `constants/defaultData.js`.
* **Lý do:** Đảm bảo điểm tối đa cho tiêu chí xử lý dữ liệu biên (Edge cases) và ngăn ngừa lỗi trắng màn hình (White screen of death).

---

## 6. Ma trận kiểm thử (Testing & Verification Matrix)

| STT | Nhóm chức năng | Test Case | Thao tác thực hiện | Kết quả kỳ vọng | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :---: |
| 1 | **Startup** | First-run / Clean Storage | Xóa dữ liệu app hoặc lần đầu mở | App nạp `DEFAULT_PROFILE`, giao diện ổn định, không crash | **PASS** |
| 2 | **Profile** | Đọc dữ liệu hồ sơ | Mở tab Profile | Hiển thị đúng Avatar, Tên, Bio, Email, SĐT, Trường học | **PASS** |
| 3 | **Edit Form** | Validation: Tên rỗng | Xóa hết tên, nhấn Save Changes | Báo lỗi *"Full name is required"*, viền đỏ, không lưu | **PASS** |
| 4 | **Edit Form** | Validation: Bio quá ngắn | Nhập bio < 10 ký tự, nhấn Save | Báo lỗi *"Bio must be at least 10 characters long"* | **PASS** |
| 5 | **Edit Form** | Validation: Sai định dạng Email | Nhập `abc@`, nhấn Save | Báo lỗi định dạng email không hợp lệ | **PASS** |
| 6 | **Edit Form** | Lưu hợp lệ (Valid Save) | Nhập tên & bio mới hợp lệ, bấm Save | Báo thành công, chuyển về Profile; Home & Profile đổi ngay | **PASS** |
| 7 | **Edit Form** | Hủy bỏ có bảo vệ (Cancel Guard) | Sửa dữ liệu rồi bấm nút Back/Cancel | Hiển thị hộp thoại *"Discard Changes?"*, chọn Discard không lưu | **PASS** |
| 8 | **Theme** | Đổi chủ đề giao diện | Nhấn nút ThemeToggle ở Home/Settings | Chuyển đổi mượt sang Dark Mode (nền tối, chữ sáng) app-wide | **PASS** |
| 9 | **Theme** | Bền vững qua khởi động lại | Chọn Dark Mode -> Tắt app -> Mở lại | Ứng dụng vẫn khởi động trong Dark Mode | **PASS** |
| 10 | **Activity** | Tìm kiếm từ khóa | Nhập "Hackathon" vào ô tìm kiếm | FlatList chỉ hiển thị các hoạt động có chứa từ khóa | **PASS** |
| 11 | **Activity** | Lọc theo Danh mục | Bấm chọn chip "Sports" | FlatList chỉ hiển thị các hoạt động thể thao | **PASS** |
| 12 | **Activity** | Tương tác Yêu thích (Favorite) | Bấm vào biểu tượng trái tim của 1 card | Đổi màu đỏ, bộ đếm Favorites ở Home & Profile tăng ngay | **PASS** |
| 13 | **Activity** | Thêm hoạt động mới | Bấm New, điền tiêu đề + mô tả, Lưu | Hoạt động mới chèn lên đầu FlatList và lưu AsyncStorage | **PASS** |
| 14 | **Activity** | Trạng thái rỗng (Empty State) | Gõ từ khóa tìm kiếm không tồn tại | Xuất hiện component `EmptyState` kèm nút *"Clear Filters"* | **PASS** |
| 15 | **Settings** | Factory Reset | Bấm *"Clear All AsyncStorage Records"* | Toàn bộ dữ liệu quay về seed data nguyên bản | **PASS** |

---

## 7. Nhật ký Debug lỗi thực tế (Debugging Logs)

### Debug Log 01: Lỗi Form không cập nhật Avatar khi chọn Preset
* **Triệu chứng:** Người dùng bấm chọn thumbnail avatar khác trong `EditProfileScreen`, nhưng hình tròn xem trước lớn bên trên không thay đổi.
* **Giả thuyết:** State `avatar` chưa được bind vào `source` của `Image`, hoặc đường dẫn ảnh không có wrapper object `{ uri: ... }`.
* **Điểm kiểm tra:** Kiểm tra hàm `onPress={() => setAvatar(presetUrl)}` và thẻ `<Image source={{ uri: avatar }} />`.
* **Root cause:** Component Image nhận chuỗi string thô thay vì object `{ uri: avatar }`.
* **Cách khắc phục:** Sửa thuộc tính source thành `source={{ uri: avatar || AVATAR_PRESETS[0] }}`.
* **Kết quả Retest:** Bấm chọn các preset thumbnail khác nhau, avatar lớn đổi ngay lập tức theo thời gian thực (PASS).

### Debug Log 02: Lỗi nhấp nháy giao diện khi khởi động lại ứng dụng (Theme Hydration Flash)
* **Triệu chứng:** Khi app được đặt ở Dark Mode, mỗi lần mở lại app, màn hình bị nháy màu trắng sáng khoảng 0.2 giây rồi mới chuyển sang nền tối.
* **Giả thuyết:** Quá trình đọc `storageService.getTheme()` là bất đồng bộ (`async`), trong khi giá trị khởi tạo ban đầu của state `themeMode` bị gán cứng là `'light'`.
* **Điểm kiểm tra:** `src/contexts/ThemeContext.js` trong hook `useEffect`.
* **Root cause:** Component render lần đầu tiên với state default `'light'` trước khi lệnh `await AsyncStorage.getItem` hoàn tất.
* **Cách khắc phục:** Thêm cờ trạng thái `isLoaded`. Trước khi hydrate hoàn tất, giữ màu nền khớp với theme hệ thống hoặc hiển thị placeholder mượt mà, đồng thời bọc cấu hình `navigationTheme` chuẩn.
* **Kết quả Retest:** Khởi động lại ứng dụng khi ở Dark Mode không còn hiện tượng giật sáng màu trắng (PASS).

---

## 8. Hướng dẫn giải thích mã nguồn khi Vấn đáp (Code Explanation Guide)

Khi giảng viên chỉ định mở bất kỳ file mã nguồn nào, hãy trình bày theo chuẩn 5 bước:

1. **Purpose (Mục đích):** File/component/hook này giải quyết trách nhiệm gì trong kiến trúc?
   * *Ví dụ `storageService.js`:* Là tầng trung gian chịu trách nhiệm đọc/ghi dữ liệu an toàn với bộ nhớ máy `AsyncStorage`.
2. **Input (Đầu vào):** Nhận props, context nào hoặc state nào?
   * *Ví dụ `EditProfileScreen.js`:* Nhận `profile` từ `useProfile()`, tham số `navigation` từ React Navigation.
3. **Trigger (Kích hoạt):** Sự kiện nào kích hoạt hàm chạy?
   * *Ví dụ:* Sự kiện `onPress` của nút Save hoặc `onChangeText` của từng trường Controlled Input.
4. **Transform (Xử lý logic):** Dữ liệu được biến đổi ra sao?
   * *Ví dụ:* Hàm `validateForm()` kiểm tra regex, độ dài chuỗi; nếu hợp lệ, đóng gói object mới và gọi `updateProfile()`.
5. **Output / Failure path (Kết quả & Xử lý lỗi):**
   * *Thành công:* Dữ liệu cập nhật vào Context, ghi đè xuống AsyncStorage, đóng màn hình.
   * *Thất bại:* Giữ nguyên màn hình, hiển thị thông báo lỗi màu đỏ ngay dưới ô nhập liệu và popup thông báo.

---

## 9. Bài luyện xử lý yêu cầu thay đổi (Transfer Task Practice)

### Yêu cầu chuyển giao mẫu: "Thêm trường Ngày sinh (Date of Birth) vào hồ sơ"
* **Phân tích tác động (Impact Analysis):**
  1. `defaultData.js`: Thêm trường `birthDate: '2004-05-15'` vào `DEFAULT_PROFILE`.
  2. `EditProfileScreen.js`: Thêm state `birthDate`, thêm `CustomInput` nhập ngày sinh, thêm điều kiện validate.
  3. `ProfileScreen.js`: Thêm 1 dòng hiển thị ngày sinh kèm icon `calendar-outline`.
  4. `storageService.js`: Không cần sửa vì đã lưu toàn bộ object `profile`.
  5. Test lại luồng: Nhập ngày sinh mới -> Save -> kiểm tra hiển thị tại Profile -> Restart app.

---

## 10. Nhật ký sử dụng AI có kiểm soát (AI Usage Log)

| STT | Nhiệm vụ / Yêu cầu | Mục đích | Phần áp dụng | Kiểm chứng & Tinh chỉnh thực tế |
| :---: | :--- | :--- | :--- | :--- |
| 1 | Tạo cấu trúc Theme Design Tokens | Tạo bảng màu Dark/Light hài hòa | `src/styles/theme.js` | Tự kiểm tra độ tương phản màu chữ (contrast ratio) đảm bảo chuẩn WCAG |
| 2 | Sinh biểu thức Regex cho Email & SĐT | Xác thực biểu mẫu chặt chẽ | `src/screens/EditProfileScreen.js` | Đã test thủ công các trường hợp biên: email không có domain, SĐT thiếu số |
| 3 | Lập bảng Ma trận kiểm thử & DDR | Đáp ứng đầy đủ tiêu chí Rubric | `README.md` | Đối chiếu trực tiếp từng tiêu chí CLO1-CLO7 và CLO9 trong tài liệu đề bài |

---
**Tuyên bố tự xác nhận của sinh viên:**
> *"Tôi hiểu rõ kiến trúc, luồng dữ liệu, các kỹ thuật quản lý trạng thái và lưu trữ bền vững trong mã nguồn này. Tôi sẵn sàng giải thích chi tiết và thực hiện các yêu cầu chỉnh sửa trực tiếp theo yêu cầu của giảng viên."*