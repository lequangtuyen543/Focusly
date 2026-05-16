# 📋 KẾ HOẠCH TRIỂN KHAI DỰ ÁN FOCUSLY

> **Phiên bản:** MVP 1.0
> **Stack:** React · TypeScript · Vite · TailwindCSS · Zustand · Recharts
> **Triết lý:** Tối giản — ít gây xao nhãng — UI polished — hoàn thành nhanh
> **Nguyên tắc triển khai:** Frontend (LocalStorage) phải hoàn chỉnh trước khi bắt đầu Backend.

---

## Thứ tự triển khai

```
Phase 1 → Phân tích & Thiết kế
Phase 2 → Thiết lập dự án
Phase 3 → Thiết lập Frontend
Phase 4 → Xây dựng tính năng Frontend
Phase 5 → UX, Polish & Responsive
Phase 6 → Kiểm thử Frontend
─────────────────────────────── ← Frontend MVP hoàn chỉnh
Phase 7 → Thiết lập Backend
Phase 8 → Xây dựng API
Phase 9 → Kết nối Frontend ↔ Backend
Phase 10 → Deploy & Tài liệu hóa
```

---

## Phase 1 — Phân tích & Thiết kế

> **Ước tính:** 1–2 ngày | **Mục tiêu:** Có đủ tài liệu trước khi viết dòng code đầu tiên

- [x] Đặt tên dự án: **Focusly** — ứng dụng Pomodoro tối giản, tập trung vào focus & habit tracking.
- [x] Viết tài liệu PRD (`PRD.md`): timer 25/5, daily goal, stats, streak, session history, focus quotes.
- [x] Viết tài liệu TODO (`TODO.md`): roadmap triển khai chi tiết theo phase/sprint cho toàn bộ dự án Focusly, bao gồm setup, frontend-first development, timer engine, statistics, LocalStorage persistence, testing, backend/API integration, deploy và documentation.
- [x] Xác định color palette, typography, spacing scale trước khi code (`/ui/DESIGN.md`).
- [x] Thiết kế UI prototype (`stitch`): các màn hình chính — Timer, Stats, History, Settings.
- [x] Viết `AGENT.md`: tài liệu context cho AI coding agents, bao gồm tech decisions, architecture, naming conventions, data model và coding guidelines.

---

## Phase 2 — Thiết lập dự án

> **Ước tính:** 0.5 ngày | **Mục tiêu:** Môi trường dev sẵn sàng, deploy pipeline hoạt động

- [x] Khởi tạo project: `pnpm create vite@latest focusly --template react-ts`
- [x] Cấu hình Vite (`vite.config.ts`): alias paths (`@/` → `src/`), port mặc định.
- [x] Cài đặt dependencies chính:
  - [x] TailwindCSS v3 + `@tailwindcss/forms`
  - [x] Zustand (state management)
  - [x] Recharts (charts)
  - [x] React Router v6
  - [x] `clsx` + `tailwind-merge` (class utilities)
  - [x] `date-fns` (date helpers)
  - [x] `lucide-react` (icons)
- [x] Cấu hình TailwindCSS (`tailwind.config.ts`): custom color palette Focusly, font stack, animation.
- [x] Cấu hình ESLint (`eslint.config.js`): rules phù hợp React + TypeScript.
- [x] Cấu hình Prettier (`.prettierrc`): tabWidth 2, singleQuote, trailing comma.
- [x] Cấu hình `tsconfig.json`: strict mode, path aliases.
- [ ] Tạo repository GitHub, cấu hình `.gitignore` (node_modules, dist, .env).
- [ ] Viết `README.md` ban đầu: tên project, tech stack, lệnh chạy dev.
- [ ] Cấu hình deploy pipeline: kết nối GitHub repo với Vercel (auto-deploy khi push `main`).
- [ ] Verify: `pnpm dev` chạy thành công, Vercel build thành công (trang trắng ban đầu là ổn).

---

## Phase 3 — Thiết lập Frontend

> **Ước tính:** 1 ngày | **Mục tiêu:** Skeleton app hoạt động, routing + layout + store sẵn sàng

### 3.1 Folder Structure

- [ ] Tạo cấu trúc thư mục theo spec trong PRD:
  ```
  src/
  ├── assets/
  ├── components/
  │   ├── ui/         ← shared atomic components
  │   ├── timer/
  │   ├── stats/
  │   ├── history/
  │   └── layout/
  ├── hooks/
  ├── store/
  ├── data/
  ├── utils/
  ├── types/
  └── pages/
  ```

### 3.2 TypeScript Types

- [ ] Định nghĩa toàn bộ shared types trong `src/types/index.ts`:
  - [ ] `SessionType = 'focus' | 'break'`
  - [ ] `Session` interface: `id`, `type`, `startTime`, `endTime`, `duration`, `completed`
  - [ ] `UserSettings` interface: `dailyGoal`, `focusDuration`, `breakDuration`, `notificationEnabled`, `soundEnabled`
  - [ ] `StreakData` interface: `currentStreak`, `longestStreak`, `lastActiveDate`
  - [ ] `DailyStats` interface: tổng hợp thống kê theo ngày
  - [ ] `TimerMode = 'focus' | 'break'`
  - [ ] `TimerStatus = 'idle' | 'running' | 'paused'`

### 3.3 Utility Functions

- [ ] `src/utils/storage.ts`: LocalStorage helpers có type-safe
  - [ ] `getFromStorage<T>(key, fallback): T`
  - [ ] `saveToStorage<T>(key, value): void`
  - [ ] `removeFromStorage(key): void`
  - [ ] Prefix tất cả keys bằng `focusly_` để tránh conflict
- [ ] `src/utils/time.ts`: time helpers
  - [ ] `formatTime(seconds: number): string` → `"25:00"`
  - [ ] `formatDuration(seconds: number): string` → `"25 phút"` hoặc `"1 giờ 30 phút"`
  - [ ] `formatCurrency` → không cần (Pomodoro app không có tiền)
- [ ] `src/utils/dateUtils.ts`: date helpers
  - [ ] `isToday(dateString: string): boolean`
  - [ ] `isSameDay(a: string, b: string): boolean`
  - [ ] `getWeekDays(referenceDate?: Date): string[]` → 7 ngày gần nhất
  - [ ] `toDateKey(date?: Date): string` → `"2026-05-11"`
- [ ] `src/utils/streakUtils.ts`: streak logic
  - [ ] `calculateStreak(sessions: Session[]): StreakData`
  - [ ] `isConsecutiveDay(date1: string, date2: string): boolean`

### 3.4 Data

- [ ] `src/data/quotes.ts`: mảng 40–50 motivational quotes tiếng Anh/Việt
  - [ ] Đảm bảo diversity: quotes về focus, consistency, growth, discipline
  - [ ] Export `getRandomQuote(): string` function

### 3.5 Zustand Stores

- [ ] `src/store/timerStore.ts`:
  - [ ] State: `mode: TimerMode`, `status: TimerStatus`, `timeLeft: number`, `startTimestamp: number | null`
  - [ ] Actions: `start()`, `pause()`, `resume()`, `reset()`, `tick()`
  - [ ] **Quan trọng:** dùng `startTimestamp + Date.now()` để tính elapsed, không đếm tick — tránh drift khi tab bị ẩn
  - [ ] Không persist timer state vào LocalStorage (reset khi reload là hành vi đúng)
- [ ] `src/store/sessionStore.ts`:
  - [ ] State: `sessions: Session[]`
  - [ ] Actions: `addSession()`, `getTodaySessions()`, `getWeekSessions()`
  - [ ] Persist vào LocalStorage key `focusly_sessions`
  - [ ] Auto-filter: hàm lấy sessions hôm nay bằng `isToday()`
- [ ] `src/store/settingsStore.ts`:
  - [ ] State: `settings: UserSettings` với default values
  - [ ] Actions: `updateSettings()`, `resetSettings()`
  - [ ] Persist vào LocalStorage key `focusly_settings`
- [ ] `src/store/streakStore.ts`:
  - [ ] State: `streak: StreakData`
  - [ ] Actions: `updateStreak()` — gọi sau mỗi focus session hoàn thành
  - [ ] Persist vào LocalStorage key `focusly_streak`

### 3.6 Layout & Routing

- [ ] `src/components/layout/Layout.tsx`: wrapper chính với header + main + optional footer
- [ ] `src/components/layout/Header.tsx`: logo Focusly + navigation links
- [ ] `src/components/layout/Navigation.tsx`: tab navigation (Timer / Stats / History)
- [ ] `src/pages/TimerPage.tsx`: placeholder
- [ ] `src/pages/StatsPage.tsx`: placeholder
- [ ] `src/pages/HistoryPage.tsx`: placeholder
- [ ] `src/pages/SettingsPage.tsx`: placeholder
- [ ] Cấu hình React Router trong `src/App.tsx`: routes cho 4 pages trên
- [ ] Verify: navigate giữa các page hoạt động, không bị lỗi

### 3.7 Shared UI Components

- [ ] `src/components/ui/Button.tsx`: variants `primary`, `secondary`, `ghost`, `danger`; sizes `sm`, `md`, `lg`
- [ ] `src/components/ui/Card.tsx`: wrapper card với dark theme styling
- [ ] `src/components/ui/Badge.tsx`: badge cho streak, session type
- [ ] `src/components/ui/ProgressRing.tsx`: SVG-based circular progress, nhận `value` (0–100), `size`, `color`
- [ ] `src/components/ui/EmptyState.tsx`: hiển thị khi không có data, nhận `message` và optional `icon`

---

## Phase 4 — Xây dựng tính năng Frontend

> **Ước tính:** 4–5 ngày | **Mục tiêu:** Toàn bộ core features hoạt động với LocalStorage

### 4.1 Pomodoro Timer *(P0 — Core)*

> Technical note: Timer dùng `Date.now()` để tính elapsed time — không dùng tick counter thuần

- [ ] `src/hooks/useTimer.ts`:
  - [ ] Quản lý `setInterval` với `useEffect`, cleanup đúng khi unmount
  - [ ] Tính `timeLeft = duration - (Date.now() - startTimestamp)` mỗi giây
  - [ ] Khi `timeLeft <= 0`: gọi `onSessionComplete()` callback
  - [ ] Handle auto-switch: khi focus kết thúc → switch sang break; break kết thúc → switch sang focus
  - [ ] Update `document.title` theo thời gian còn lại: `"25:00 — Focusly"`
- [ ] `src/components/timer/TimerDisplay.tsx`:
  - [ ] Hiển thị thời gian dạng `MM:SS` với font monospace lớn
  - [ ] Animation nhẹ khi chuyển giữa các giây (opacity flicker nhỏ)
  - [ ] Màu chữ thay đổi: focus → accent tím, break → accent teal
- [ ] `src/components/timer/TimerControls.tsx`:
  - [ ] Nút **Start**: hiển thị khi idle
  - [ ] Nút **Pause / Resume**: hiển thị khi running hoặc paused
  - [ ] Nút **Reset**: luôn hiển thị khi không idle, có confirm nhanh (tooltip hoặc double-click)
  - [ ] Keyboard shortcut: `Space` = Start/Pause, `R` = Reset
- [ ] `src/components/timer/SessionStatus.tsx`:
  - [ ] Label lớn: `FOCUS` hoặc `BREAK`
  - [ ] Sub-label: `"Phiên thứ X hôm nay"` dựa vào số session đã hoàn thành
- [ ] Wire timer vào `timerStore` và `sessionStore`:
  - [ ] Khi focus session hoàn thành: tạo `Session` object, gọi `sessionStore.addSession()`
  - [ ] Sau khi add session: gọi `streakStore.updateStreak()`
  - [ ] Emit notification (xử lý ở task 4.4)
- [ ] Lắp ráp `TimerPage.tsx` hoàn chỉnh: Timer + Controls + Status + Quote

### 4.2 Daily Goal & Progress Ring *(P0)*

- [ ] `src/components/timer/DailyProgress.tsx`:
  - [ ] Sử dụng `ProgressRing` đã build ở Phase 3
  - [ ] Hiển thị `X / Y` Pomodoros (số hoàn thành / goal)
  - [ ] Màu ring thay đổi theo %: `< 50%` → neutral, `50–99%` → accent tím, `100%` → xanh lá (completed)
  - [ ] Khi đạt 100%: animation pulse nhẹ + text "Hoàn thành!" thay vì số
- [ ] Tích hợp vào `TimerPage`: đặt cạnh Timer Display tạo "bộ đôi" trực quan
- [ ] Daily goal reset tự động: kiểm tra ngày khi app load, so sánh với `lastActiveDate` trong store
- [ ] Verify: hoàn thành 1 Pomodoro → progress ring cập nhật ngay lập tức

### 4.3 Focus Quote *(P2)*

- [ ] `src/components/timer/FocusQuote.tsx`:
  - [ ] Lấy quote ngẫu nhiên từ `quotes.ts` khi component mount
  - [ ] Hiển thị ở vùng phụ (trên hoặc dưới timer, không che khuất)
  - [ ] Nút nhỏ "↻" để refresh sang quote khác
  - [ ] Text nhỏ, màu muted, italic — không gây xao nhãng
  - [ ] Fade-in animation khi hiện quote mới

### 4.4 Browser Notification & Audio *(P1)*

- [ ] `src/hooks/useNotification.ts`:
  - [ ] `requestPermission()`: xin quyền khi user lần đầu nhấn Start
  - [ ] `sendNotification(title, body)`: gửi notification nếu được cấp quyền
  - [ ] Không gửi notification nếu tab đang active (người dùng đang nhìn app)
- [ ] Web Audio API beep (fallback):
  - [ ] `src/utils/audio.ts`: `playBeep(frequency, duration)` dùng `AudioContext`
  - [ ] Beep ngắn khi focus kết thúc, beep khác (tone khác) khi break kết thúc
  - [ ] Không cần file âm thanh — generate programmatically
- [ ] Logic ưu tiên: notification trước → nếu bị block → fallback sang beep
- [ ] `settingsStore` lưu preference: `notificationEnabled`, `soundEnabled`

### 4.5 Session History *(P1)*

- [ ] `src/components/history/SessionItem.tsx`:
  - [ ] Hiển thị: icon (🍅 focus / ☕ break) · thời gian bắt đầu → kết thúc · thời lượng
  - [ ] Màu phân biệt: focus → tím nhạt, break → teal nhạt (background row)
  - [ ] Hiển thị badge `Hoàn thành` hoặc `Huỷ` nếu `completed = false`
- [ ] `src/components/history/SessionList.tsx`:
  - [ ] Group sessions theo ngày: header ngày + danh sách sessions trong ngày đó
  - [ ] Hiển thị tối đa 20 sessions gần nhất (không cần pagination cho MVP)
  - [ ] Empty state khi chưa có session nào
  - [ ] Pull-to-refresh không cần thiết (data đã real-time từ store)
- [ ] Lắp ráp `HistoryPage.tsx`: SessionList đầy đủ

### 4.6 Statistics Dashboard *(P1)*

- [ ] `src/components/stats/StatCard.tsx`:
  - [ ] Card hiển thị 1 metric: label + số lớn + optional sub-text
  - [ ] Dùng cho: Tổng focus hôm nay, Tổng Pomodoro, Streak, Best streak
- [ ] `src/components/stats/WeeklyChart.tsx`:
  - [ ] Recharts `BarChart` — 7 cột tương ứng 7 ngày gần nhất
  - [ ] Trục X: tên ngày ngắn (T2, T3, ..., CN) hoặc ngày/tháng
  - [ ] Trục Y: số Pomodoro
  - [ ] Cột của hôm nay highlight màu accent tím
  - [ ] Responsive: `<ResponsiveContainer width="100%">`
  - [ ] Tooltip khi hover: `"3 Pomodoros – Thứ Hai 11/05"`
  - [ ] Custom styling phù hợp dark theme (axis color, grid color)
- [ ] `src/components/stats/StreakDisplay.tsx`:
  - [ ] Hiển thị current streak lớn với icon 🔥
  - [ ] Sub-text: `"Kỷ lục: X ngày"`
  - [ ] Animation nhỏ khi streak tăng (scale bounce)
- [ ] `src/components/stats/TodaySummary.tsx`:
  - [ ] Tổng focus time hôm nay (giờ:phút)
  - [ ] Số Pomodoro hôm nay / goal
  - [ ] Inline mini progress bar
- [ ] Lắp ráp `StatsPage.tsx`:
  - [ ] Layout: TodaySummary → WeeklyChart → StreakDisplay → StatCards (tổng all-time)
  - [ ] Data tính toán từ `sessionStore` và `streakStore`

### 4.7 Settings *(P1)*

- [ ] `SettingsPage.tsx`:
  - [ ] **Daily Goal**: number input (1–20), mặc định 8, có nút +/- tiện dụng
  - [ ] **Focus Duration**: select hoặc input (mặc định 25 phút, options: 15, 20, 25, 30, 45, 50)
  - [ ] **Break Duration**: select (mặc định 5 phút, options: 3, 5, 10, 15)
  - [ ] **Notification**: toggle on/off
  - [ ] **Sound**: toggle on/off
  - [ ] Thay đổi settings lưu ngay vào `settingsStore` (không cần nút Save riêng)
  - [ ] Nút "Reset về mặc định" với confirm dialog
  - [ ] Hiển thị app version ở cuối trang

> **MVP note:** Settings trang đơn giản, không cần phức tạp. Mục tiêu là người dùng có thể tùy chỉnh goal và duration.

---

## Phase 5 — UX, Polish & Responsive

> **Ước tính:** 1.5 ngày | **Mục tiêu:** App trông và cảm giác polished, mượt trên mọi thiết bị

### 5.1 Micro-interactions & Animation

- [ ] Timer bắt đầu: progress ring bắt đầu quay, background có subtle color shift
- [ ] Focus → Break switch: màu accent transition smooth (CSS transition 0.5s)
- [ ] Pomodoro hoàn thành: progress ring fill lên 100% → pulse animation → reset
- [ ] Streak tăng: badge animate `bounceIn` nhẹ
- [ ] Quote refresh: fade-out → fade-in
- [ ] Button hover: `scale(1.02)` + shadow tăng nhẹ
- [ ] Tất cả animation: `prefers-reduced-motion: reduce` → tắt animation, chỉ giữ transition instant

### 5.2 Dark Mode

- [ ] Đảm bảo toàn bộ UI consistent trên dark mode (là default)
- [ ] Không có element nào có background trắng cứng
- [ ] Text contrast đạt AA accessibility (kiểm tra bằng Lighthouse)
- [ ] Scrollbar styling trên dark background

### 5.3 Responsive Testing

- [ ] Test trên 375px (iPhone SE): không bị overflow, timer đủ to để đọc
- [ ] Test trên 390px (iPhone 14): layout chuẩn
- [ ] Test trên 768px (iPad): layout điều chỉnh hợp lý
- [ ] Test trên 1280px (Laptop): full layout đẹp
- [ ] Test trên 1440px (Desktop lớn): không quá rộng (max-width container)
- [ ] Navigation: desktop → top nav; mobile → bottom tab bar hoặc hamburger

### 5.4 Tab Title & Favicon

- [ ] `document.title` update real-time theo timer: `"25:00 — Focusly"` (running) / `"Focusly"` (idle)
- [ ] Favicon: thiết kế đơn giản với chữ "F" hoặc icon đồng hồ, phù hợp dark/light browser

### 5.5 Empty States & Loading States

- [ ] History page: empty state với icon + "Bắt đầu Pomodoro đầu tiên của bạn 🍅"
- [ ] Stats page: empty state khi chưa có data tuần này
- [ ] Không có loading state thực sự (LocalStorage là sync) — nhưng cần graceful init

### 5.6 Onboarding (Optional MVP)

- [ ] Nếu `focusly_sessions` chưa có data: hiển thị tooltip hoặc highlight nút Start
- [ ] Không cần màn hình onboarding full như Pockly — Focusly đủ đơn giản để tự giải thích
- [ ] Tooltip nhỏ trên Daily Goal: "Đặt mục tiêu số Pomodoro bạn muốn hoàn thành hôm nay"

---

## Phase 6 — Kiểm thử Frontend

> **Ước tính:** 1 ngày | **Mục tiêu:** App ổn định, không có bug nghiêm trọng trước khi mở Phase Backend

### 6.1 Functional Testing (Manual)

- [ ] **Timer:**
  - [ ] Start → Pause → Resume → Reset hoạt động đúng
  - [ ] Timer không drift khi ẩn tab 5 phút rồi quay lại (kiểm tra bằng cách hide tab rồi check)
  - [ ] Auto-switch focus → break → focus hoạt động liên tục
  - [ ] Reset giữa chừng: session không được ghi vào history
  - [ ] Keyboard shortcut Space và R hoạt động
- [ ] **Session & Data:**
  - [ ] Hoàn thành 1 Pomodoro → session xuất hiện trong History
  - [ ] Refresh trang → data không mất
  - [ ] Progress ring cập nhật đúng sau mỗi session
  - [ ] Daily goal reset khi sang ngày mới (test bằng cách thay đổi system date hoặc mock)
- [ ] **Streak:**
  - [ ] Ngày đầu tiên: streak = 1
  - [ ] Làm ngày liên tiếp: streak tăng
  - [ ] Bỏ 1 ngày: streak reset về 0 (hoặc 1 nếu hôm nay đã có session)
  - [ ] Longest streak không giảm
- [ ] **Settings:**
  - [ ] Thay đổi Daily Goal → progress ring cập nhật ngay
  - [ ] Thay đổi Focus Duration → timer hiển thị đúng giá trị mới khi Reset
  - [ ] Toggle notification/sound → hoạt động đúng

### 6.2 LocalStorage Testing

- [ ] Mở DevTools → Application → Local Storage: verify tất cả keys đúng format
- [ ] Xoá `focusly_sessions` → History page hiển thị empty state
- [ ] Thêm 50+ sessions giả → danh sách không lag
- [ ] Kiểm tra JSON.parse không crash khi data bị corrupt (graceful fallback về default)

### 6.3 Notification Testing

- [ ] Chrome: cho phép notification → nhận được khi session kết thúc
- [ ] Chrome: từ chối notification → beep âm thanh thay thế
- [ ] Safari iOS: notification có thể không hoạt động → verify fallback

### 6.4 Cross-browser Testing

- [ ] Chrome (latest): full test
- [ ] Firefox (latest): full test
- [ ] Safari (macOS, latest): full test
- [ ] Edge (latest): smoke test
- [ ] iOS Safari: timer, notification fallback, responsive layout

### 6.5 Performance Check

- [ ] Lighthouse audit trên production Vercel URL:
  - [ ] Performance ≥ 85
  - [ ] Accessibility ≥ 90
  - [ ] Best Practices ≥ 85
- [ ] Bundle size: `pnpm run build` → kiểm tra `dist/assets/` không vượt 500KB total
- [ ] 60fps animation: kiểm tra DevTools Performance tab khi timer chạy

### 6.6 Bug Fix Sprint

- [ ] Ghi lại tất cả bugs tìm được vào `BUGS.md` (tạm thời)
- [ ] Fix tất cả P0 bugs trước khi tiếp tục
- [ ] P1 bugs: fix nếu nhanh (<30 phút), còn lại để backlog

> ⚠️ **Checkpoint:** Chỉ tiến sang Phase 7 khi frontend MVP đã pass kiểm thử và deploy được trên Vercel.

---

## Phase 7 — Thiết lập Backend

> **Ước tính:** 0.5–1 ngày | **Mục tiêu:** Skeleton Node.js + Express TypeScript hoạt động, deploy được

- [ ] Khởi tạo backend project: tạo thư mục `focusly-server/`, chạy `pnpm init`
- [ ] Cài đặt dependencies backend:
  - [ ] Express, cors, dotenv
  - [ ] TypeScript, ts-node, nodemon
  - [ ] `@types/express`, `@types/cors`, `@types/node`
  - [ ] Jest + Supertest (testing)
- [ ] Cấu hình `tsconfig.json` cho backend (target ES2020, module CommonJS)
- [ ] Cấu hình `nodemon.json`: watch `src/`, restart khi `.ts` file thay đổi
- [ ] Tạo cấu trúc thư mục backend:
  ```
  focusly-server/
  ├── src/
  │   ├── routes/
  │   ├── controllers/
  │   ├── middleware/
  │   ├── lib/
  │   ├── types/
  │   └── index.ts
  ├── tsconfig.json
  ├── nodemon.json
  └── package.json
  ```
- [ ] `src/index.ts`: Express app setup, CORS, JSON body parser, port config từ `.env`
- [ ] `src/middleware/errorHandler.ts`: centralized error handling middleware
- [ ] `src/middleware/validateRequest.ts`: input validation middleware (dùng Zod hoặc manual)
- [ ] `src/middleware/requestLogger.ts`: log request method + path + status (dev only)
- [ ] Health check endpoint: `GET /health` → `{ status: 'ok', version: '1.0' }`
- [ ] Verify: `pnpm dev` chạy server trên port 3001, `/health` trả về 200

> **MVP note:** Backend v1 dùng **in-memory storage** hoặc **JSON file** (không cần database thật) để đơn giản hóa setup. Database thật (PostgreSQL/SQLite) sẽ thêm ở v1.1 nếu cần.

---

## Phase 8 — Xây dựng API

> **Ước tính:** 1.5 ngày | **Mục tiêu:** REST API hoàn chỉnh cho tất cả features

### 8.1 Sessions API

- [ ] `GET /api/sessions` — lấy danh sách sessions, support query params:
  - [ ] `?date=2026-05-11` lọc theo ngày
  - [ ] `?from=2026-05-05&to=2026-05-11` lọc theo khoảng
  - [ ] `?limit=20&offset=0` pagination
- [ ] `POST /api/sessions` — tạo session mới
  - [ ] Validate: `type` bắt buộc (`focus`/`break`), `startTime` bắt buộc, `duration` > 0
  - [ ] Auto-generate `id` phía server
  - [ ] Trả về session object đã tạo
- [ ] `PUT /api/sessions/:id` — cập nhật session (chủ yếu `endTime`, `completed`)
- [ ] `DELETE /api/sessions/:id` — xoá session
- [ ] `src/controllers/session.controller.ts`: logic xử lý CRUD
- [ ] `src/routes/sessions.route.ts`: wire routes vào controller

### 8.2 Statistics API

- [ ] `GET /api/stats/today` — thống kê hôm nay:
  - [ ] Response: `{ totalFocusTime, pomodoroCount, goalProgress }`
- [ ] `GET /api/stats/week` — thống kê 7 ngày gần nhất:
  - [ ] Response: mảng 7 items, mỗi item: `{ date, pomodoroCount, focusTime }`
- [ ] `GET /api/stats/streak` — streak hiện tại và kỷ lục
- [ ] `src/controllers/stats.controller.ts`
- [ ] `src/routes/stats.route.ts`

### 8.3 Settings API

- [ ] `GET /api/settings` — lấy settings người dùng (dùng deviceId hoặc anonymous token)
- [ ] `PUT /api/settings` — cập nhật settings
- [ ] Validate: `dailyGoal` từ 1–20, `focusDuration` hợp lệ
- [ ] `src/controllers/settings.controller.ts`
- [ ] `src/routes/settings.route.ts`

### 8.4 Unit Tests (API)

- [ ] Test Session Controller: tạo session hợp lệ, invalid input trả 400, missing id trả 404
- [ ] Test Stats Controller: tính đúng tổng focus time, streak
- [ ] Test validation middleware: reject requests thiếu required fields
- [ ] Chạy `pnpm test` → tất cả tests pass

> **Technical note:** Ở phase này, storage vẫn là in-memory (`Map` hoặc mảng). Data reset khi restart server — điều này được chấp nhận ở giai đoạn tích hợp ban đầu.

---

## Phase 9 — Kết nối Frontend ↔ Backend

> **Ước tính:** 1–1.5 ngày | **Mục tiêu:** Frontend chuyển từ LocalStorage sang API calls, giữ nguyên UX

### 9.1 API Client Layer

- [ ] `src/lib/api.ts` (frontend): base fetch wrapper
  - [ ] `apiGet<T>(endpoint)`, `apiPost<T>(endpoint, body)`, `apiPut`, `apiDelete`
  - [ ] Đọc `VITE_API_URL` từ `.env` (dev: `http://localhost:3001`, prod: URL backend)
  - [ ] Error handling: throw `ApiError` với status code và message
- [ ] `src/lib/sessionApi.ts`: các hàm gọi Sessions API
- [ ] `src/lib/statsApi.ts`: các hàm gọi Stats API
- [ ] `src/lib/settingsApi.ts`: các hàm gọi Settings API

### 9.2 Chuyển đổi Store từ LocalStorage sang API

- [ ] `sessionStore.ts`:
  - [ ] `addSession()`: gọi `POST /api/sessions` thay vì ghi LocalStorage trực tiếp
  - [ ] Optimistic update: cập nhật UI ngay (local state), sau đó sync lên server
  - [ ] Error fallback: nếu API fail → vẫn lưu LocalStorage (offline-first lite)
- [ ] `settingsStore.ts`:
  - [ ] Load settings từ API khi app init
  - [ ] Sync lên server khi settings thay đổi (debounce 500ms)
- [ ] `streakStore.ts`:
  - [ ] Đọc streak từ `GET /api/stats/streak` khi app init
  - [ ] Cập nhật sau khi POST session thành công

### 9.3 Environment Config

- [ ] Frontend: tạo `.env`, `.env.production` với `VITE_API_URL`
- [ ] Backend: tạo `.env` với `PORT`, `NODE_ENV`, `CORS_ORIGIN`
- [ ] Thêm cả hai `.env*` vào `.gitignore`
- [ ] Document biến môi trường trong `README.md`

### 9.4 Integration Testing

- [ ] Test: Start Pomodoro → hoàn thành → session xuất hiện trong History (qua API)
- [ ] Test: Tắt server → app vẫn hoạt động với LocalStorage fallback
- [ ] Test: Bật lại server → data sync đúng
- [ ] Test: Stats page hiển thị đúng data từ API

### 9.5 CORS & Security

- [ ] Backend: cấu hình CORS chỉ cho phép origin của frontend (production URL)
- [ ] Rate limiting cơ bản: `express-rate-limit` trên các POST endpoints
- [ ] Sanitize input: trim string, validate number ranges

---

## Phase 10 — Deploy & Tài liệu hóa

> **Ước tính:** 1 ngày | **Mục tiêu:** App live, code sạch, README đủ để portfolio

### 10.1 Deploy Frontend

- [ ] Build production: `pnpm run build`, kiểm tra output trong `dist/`
- [ ] Deploy lên Vercel (đã setup từ Phase 2, chỉ cần push `main`)
- [ ] Cấu hình environment variable `VITE_API_URL` trên Vercel dashboard
- [ ] Verify: production URL hoạt động, timer chạy đúng, data persist
- [ ] Cấu hình custom domain nếu có (ví dụ: `focusly.vercel.app` hoặc domain riêng)

### 10.2 Deploy Backend

- [ ] Chọn hosting: **Railway** (dễ setup, free tier ổn) hoặc **Render**
- [ ] Kết nối GitHub repo, chọn `focusly-server/` làm root
- [ ] Cấu hình environment variables trên hosting platform
- [ ] Verify: `GET /health` trả về 200 trên production URL
- [ ] Update `VITE_API_URL` trên Vercel sang production backend URL

### 10.3 README.md Hoàn chỉnh

- [ ] Header: tên project + tagline + badges (deploy status, license)
- [ ] Screenshot / GIF demo (chụp màn hình hoặc record Loom ngắn)
- [ ] Mô tả tính năng: bullet list ngắn gọn
- [ ] Tech stack: list với icons
- [ ] Hướng dẫn cài đặt local: step-by-step
  - [ ] Clone repo
  - [ ] `pnpm install` (frontend + backend)
  - [ ] Cấu hình `.env`
  - [ ] `pnpm dev`
- [ ] Link demo live
- [ ] Roadmap ngắn: MVP done → Future features
- [ ] License: MIT

### 10.4 Tài liệu hóa bổ sung

- [ ] Viết `CHANGELOG.md` cho v1.0: tóm tắt features đã build
- [ ] Update `PROJECT_KNOWLEDGE.md` với lessons learned, tech decisions đã thay đổi so với plan
- [ ] Comment code ở những chỗ phức tạp (timer timestamp logic, streak calculation)

### 10.5 Final Checklist trước khi công bố

- [ ] Lighthouse score trên production: Performance ≥ 85, Accessibility ≥ 90
- [ ] Không có console.error hoặc console.warn trên production
- [ ] Tất cả links trong README hoạt động
- [ ] Demo URL trả về app đúng (không phải trang Vercel 404)
- [ ] Tag release `v1.0.0` trên GitHub với release notes
- [ ] Thêm vào GitHub profile / portfolio

---

## Backlog (Không nằm trong MVP)

> Những tính năng này được đề xuất nhưng không triển khai trong v1.0. Ghi lại để không quên.

| Tính năng | Độ ưu tiên | Phase gợi ý |
|-----------|-----------|-------------|
| PWA support (offline, installable) | P1 | v1.1 |
| Custom timer duration (nhập tay) | P1 | v1.1 |
| Light mode toggle | P2 | v1.1 |
| Ambient sound (rain, lo-fi) | P2 | v1.2 |
| Export session history (CSV) | P2 | v1.1 |
| Google OAuth login | P1 | v2.0 |
| Cloud sync (Supabase) | P1 | v2.0 |
| Todo list tích hợp với Pomodoro | P2 | v2.0 |
| AI productivity insights | P3 | v3.0 |
| Team focus room | P3 | v3.0 |
| Mobile app (React Native) | P3 | v3.0 |

---

## Tóm tắt Timeline

| Phase | Nội dung | Ước tính |
|-------|----------|---------|
| Phase 1 | Phân tích & Thiết kế | 1–2 ngày |
| Phase 2 | Thiết lập dự án | 0.5 ngày |
| Phase 3 | Thiết lập Frontend | 1 ngày |
| Phase 4 | Xây dựng tính năng Frontend | 4–5 ngày |
| Phase 5 | UX, Polish & Responsive | 1.5 ngày |
| Phase 6 | Kiểm thử Frontend | 1 ngày |
| **Subtotal MVP Frontend** | | **~10 ngày** |
| Phase 7 | Thiết lập Backend | 0.5–1 ngày |
| Phase 8 | Xây dựng API | 1.5 ngày |
| Phase 9 | Kết nối Frontend ↔ Backend | 1–1.5 ngày |
| Phase 10 | Deploy & Tài liệu hóa | 1 ngày |
| **Subtotal Backend + Integration** | | **~5 ngày** |
| **Tổng cộng** | | **~15 ngày** |

> **Làm bán thời gian (buổi tối sau internship):** ~3–4 tuần
> **Làm fulltime:** ~2–2.5 tuần

---

*TODO Version 1.0 — Focusly MVP*
*Cập nhật tiến độ sau mỗi phase hoàn thành*