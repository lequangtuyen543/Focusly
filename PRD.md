# 📄 PRD – Focusly

> **Product Requirements Document**
> **Phiên bản:** 1.0.0 – MVP
> **Ngày tạo:** 11/05/2026
> **Trạng thái:** Draft
> **Tác giả:** Product & Architecture Team

---

## Mục lục

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Objectives](#3-goals--objectives)
4. [Target Users](#4-target-users)
5. [User Pain Points](#5-user-pain-points)
6. [Solution Overview](#6-solution-overview)
7. [Features Breakdown](#7-features-breakdown)
8. [Functional Requirements](#8-functional-requirements)
9. [Non-functional Requirements](#9-non-functional-requirements)
10. [User Flow](#10-user-flow)
11. [Technical Stack](#11-technical-stack)
12. [Suggested Folder Structure](#12-suggested-folder-structure)
13. [Data Model – LocalStorage Schema](#13-data-model--localstorage-schema)
14. [UI/UX Guidelines](#14-uiux-guidelines)
15. [MVP Scope](#15-mvp-scope)
16. [Future Enhancements](#16-future-enhancements)
17. [Risks & Limitations](#17-risks--limitations)
18. [Development Roadmap](#18-development-roadmap)
19. [Success Metrics](#19-success-metrics)
20. [Conclusion](#20-conclusion)

---

## 1. Project Overview

| Trường | Nội dung |
|--------|----------|
| **Tên sản phẩm** | Focusly |
| **Loại sản phẩm** | Web Application (SPA) |
| **Phiên bản** | MVP 1.0 |
| **Nền tảng** | Web (Desktop-first, Responsive) |
| **Mô tả ngắn** | Ứng dụng Pomodoro tối giản giúp người dùng xây dựng thói quen tập trung và theo dõi năng suất học tập/làm việc hằng ngày |

Focusly là một **Pomodoro-based productivity app** được thiết kế với triết lý **tối giản và thực dụng**. Không phức tạp hoá tính năng, không gây phân tâm – Focusly chỉ làm đúng một việc và làm thật tốt: **giúp người dùng ngồi vào bàn và làm việc được**.

Dự án được xây dựng theo hướng **MVP cá nhân phù hợp portfolio**, tức là đủ để deploy thật, đủ chuyên nghiệp để trưng bày, và đủ gọn để hoàn thiện trong thời gian ngắn.

---

## 2. Problem Statement

Người dùng hiện đại – đặc biệt là sinh viên, lập trình viên, và freelancer – đối mặt với một vấn đề ngày càng phổ biến: **không thể duy trì trạng thái tập trung sâu (deep focus) trong thời gian dài**.

Nguyên nhân gốc rễ bao gồm:

- **Mất kiểm soát thời gian**: Không biết đã học được bao lâu, bao nhiêu là "đủ" trong một ngày.
- **Thiếu cấu trúc**: Ngồi vào bàn nhưng không có mục tiêu rõ ràng → dễ rơi vào procrastination.
- **Không có phản hồi trực quan**: Làm việc chăm chỉ nhưng không thấy "kết quả" → mất động lực.
- **Công cụ quá phức tạp**: Nhiều app productivity có quá nhiều tính năng khiến người dùng mất thêm thời gian setup thay vì làm việc thật.

**Khoảng trống thị trường:** Phần lớn Pomodoro app hiện tại hoặc quá đơn giản (chỉ là timer) hoặc quá phức tạp (quá nhiều tính năng). Focusly nhắm vào điểm giữa: **đủ tính năng để tạo thói quen, đủ đơn giản để không gây phiền nhiễu**.

---

## 3. Goals & Objectives

### 3.1 Business Goals

- Tạo ra một sản phẩm portfolio **hoàn chỉnh, có thể deploy**, thể hiện năng lực fullstack frontend.
- Xây dựng nền tảng code sạch, có thể mở rộng trong tương lai (login, cloud sync, mobile).
- Thiết kế UI đủ polished để gây ấn tượng với nhà tuyển dụng hoặc người dùng thực tế.

### 3.2 Product Goals

| # | Mục tiêu | Mức độ ưu tiên |
|---|----------|---------------|
| G1 | Người dùng có thể bắt đầu một Pomodoro session trong vòng < 5 giây sau khi mở app | 🔴 Critical |
| G2 | Người dùng thấy được tiến độ hằng ngày và cảm thấy được thưởng khi hoàn thành | 🔴 Critical |
| G3 | Dữ liệu được lưu local và không bị mất khi refresh trang | 🔴 Critical |
| G4 | App chạy mượt, không lag, không gây xao nhãng | 🟠 High |
| G5 | Giao diện đẹp, responsive trên cả desktop và mobile | 🟠 High |
| G6 | Hiển thị thống kê tuần để người dùng thấy xu hướng | 🟡 Medium |

### 3.3 Developer Goals (Personal)

- Thực hành **Clean Architecture** trong một dự án React thực tế.
- Sử dụng TypeScript một cách có hệ thống.
- Làm quen với state management pattern (Context API hoặc Zustand).
- Viết code đủ sạch để tự review sau 3 tháng vẫn hiểu.

---

## 4. Target Users

### Persona 1 – Minh (Sinh viên IT)

- **Tuổi:** 21
- **Vấn đề:** Hay lướt mạng xã hội giữa chừng khi học, không biết đã học được bao lâu trong ngày.
- **Mong muốn:** Một công cụ đơn giản để "khóa" bản thân tập trung 25 phút và theo dõi progress.
- **Thiết bị chính:** Laptop, thỉnh thoảng dùng điện thoại.

### Persona 2 – Lan (Junior Developer / Fresher)

- **Tuổi:** 23
- **Vấn đề:** Làm remote, dễ bị xao nhãng. Muốn thống kê xem mỗi ngày thực sự làm được bao nhiêu tiếng.
- **Mong muốn:** Tracker năng suất đơn giản, không cần đăng nhập, không cần setup phức tạp.
- **Thiết bị chính:** Laptop (màn hình rộng).

### Persona 3 – Hùng (Freelancer)

- **Tuổi:** 28
- **Vấn đề:** Không có kỷ luật làm việc rõ ràng, hay làm liên tục không nghỉ rồi burn out.
- **Mong muốn:** App tự động nhắc nghỉ, theo dõi streak để duy trì động lực.
- **Thiết bị chính:** Desktop.

---

## 5. User Pain Points

| Pain Point | Tần suất gặp | Mức độ ảnh hưởng |
|------------|-------------|-----------------|
| Mất tập trung khi làm việc | Rất thường xuyên | Cao |
| Không biết đã làm được bao nhiêu trong ngày | Thường xuyên | Cao |
| Thiếu cấu trúc → procrastinate | Thường xuyên | Cao |
| Không có thói quen nghỉ giải lao hợp lý | Thỉnh thoảng | Trung bình |
| Mất động lực khi không thấy tiến bộ | Thỉnh thoảng | Cao |
| App productivity hiện tại quá phức tạp | Thỉnh thoảng | Trung bình |

---

## 6. Solution Overview

Focusly giải quyết các pain points trên bằng cách kết hợp **ba trụ cột**:

```
┌─────────────────────────────────────────────────────────┐
│                     FOCUSLY MVP                         │
├─────────────────┬───────────────────┬───────────────────┤
│   TIMER ENGINE  │  PROGRESS SYSTEM  │  INSIGHT LAYER    │
│                 │                   │                   │
│ • Pomodoro      │ • Daily Goal      │ • Statistics      │
│   25/5 phút     │ • Progress Ring   │ • Weekly Chart    │
│ • Auto-switch   │ • Streak Counter  │ • Session Log     │
│ • Notification  │                   │                   │
└─────────────────┴───────────────────┴───────────────────┘
```

**Triết lý thiết kế:** _"Làm ít, làm tốt."_ Mỗi tính năng đều phải vượt qua câu hỏi: _"Nếu bỏ tính năng này, người dùng có còn đạt được mục tiêu của họ không?"_

---

## 7. Features Breakdown

### Feature 1 – Pomodoro Timer *(Core)*

Đây là tính năng trung tâm của toàn bộ ứng dụng.

**User Story:**
> Là một người dùng, tôi muốn bắt đầu một phiên tập trung 25 phút và được tự động chuyển sang break 5 phút khi kết thúc, để tôi không cần tự quản lý thời gian.

**Acceptance Criteria:**

- [ ] Timer đếm ngược từ 25:00 → 00:00 (Focus mode)
- [ ] Timer đếm ngược từ 05:00 → 00:00 (Break mode)
- [ ] Người dùng có thể **Start / Pause / Reset** timer bất kỳ lúc nào
- [ ] Khi hết 25 phút, tự động chuyển sang Break, phát notification âm thanh hoặc browser notification
- [ ] Khi hết 5 phút, tự động chuyển lại Focus mode
- [ ] Hiển thị rõ trạng thái hiện tại: "Focus" hay "Break"
- [ ] Tab title của browser cập nhật theo timer (ví dụ: `25:00 – Focusly`)
- [ ] Mỗi Pomodoro hoàn chỉnh được ghi vào lịch sử session

**Design Note:** Timer nên là điểm nhấn trực quan lớn nhất trang – số to, rõ, dễ nhìn từ xa khi đang làm việc.

---

### Feature 2 – Daily Goal

**User Story:**
> Là một người dùng, tôi muốn đặt mục tiêu số Pomodoro mỗi ngày và xem tiến độ hoàn thành, để tôi có động lực làm đủ số phiên trong ngày.

**Acceptance Criteria:**

- [ ] Mặc định: 8 Pomodoro/ngày
- [ ] Người dùng có thể chỉnh số goal (1–20)
- [ ] Hiển thị progress indicator (progress ring hoặc progress bar)
- [ ] Khi đạt goal, hiển thị trạng thái "hoàn thành" (ví dụ: màu sắc thay đổi, micro-animation)
- [ ] Goal reset về 0 lúc 00:00 mỗi ngày
- [ ] Hiển thị: `X / Y Pomodoros` completed

**Design Note:** Progress ring đặt cạnh timer tạo cảm giác "bộ đôi" trực quan đẹp hơn là progress bar đơn thuần.

---

### Feature 3 – Statistics Dashboard

**User Story:**
> Là một người dùng, tôi muốn xem thống kê focus time trong 7 ngày qua, để tôi đánh giá được thói quen làm việc của mình theo tuần.

**Acceptance Criteria:**

- [ ] Hiển thị **tổng focus time hôm nay** (giờ:phút)
- [ ] Hiển thị **biểu đồ bar chart theo tuần** (7 ngày gần nhất, trục Y là số Pomodoro)
- [ ] Hiển thị **tổng số Pomodoro hoàn thành** (all-time)
- [ ] Hiển thị **current streak** (số ngày liên tiếp có ít nhất 1 Pomodoro)
- [ ] UI responsive, không bị vỡ layout trên mobile
- [ ] Thống kê cập nhật ngay sau khi hoàn thành 1 Pomodoro

**Chart Library:** Recharts (nhẹ hơn Chart.js, API React-friendly, tích hợp dễ hơn).

---

### Feature 4 – Session History

**User Story:**
> Là một người dùng, tôi muốn xem danh sách các phiên đã hoàn thành hôm nay, để tôi biết mình đã làm gì và khi nào.

**Acceptance Criteria:**

- [ ] Danh sách session theo thứ tự thời gian (mới nhất lên đầu)
- [ ] Mỗi row hiển thị: `[Icon] Thời gian bắt đầu → Kết thúc | Loại session | Thời lượng`
- [ ] Phân biệt rõ Focus session và Break session (màu sắc hoặc icon)
- [ ] Hiển thị tối đa 20 session gần nhất (không cần pagination cho MVP)
- [ ] Hiển thị trạng thái trống nếu chưa có session nào

---

### Feature 5 – Focus Quote

**User Story:**
> Là một người dùng, tôi muốn thấy một câu quote tạo động lực mỗi khi bắt đầu focus session, để tôi có thêm tinh thần đi vào làm việc.

**Acceptance Criteria:**

- [ ] Quote hiển thị khi bắt đầu session mới
- [ ] Random từ danh sách 30–50 quote có sẵn trong code (không cần API)
- [ ] Quote hiển thị ở vùng phụ (không che khuất timer)
- [ ] Tuỳ chọn: có nút "Xem quote khác" để refresh

**Implementation Note:** Hard-code một mảng quotes trong `src/data/quotes.ts`, shuffle random khi mount. Không cần API vì chi phí không đáng và làm phức tạp thêm.

---

## 8. Functional Requirements

### 8.1 Timer Engine

| ID | Yêu cầu | Độ ưu tiên |
|----|---------|-----------|
| FR-T01 | Đếm ngược chính xác đến giây, không bị lệch khi tab bị ẩn | 🔴 Critical |
| FR-T02 | Trạng thái timer (running/paused/idle) phải persist khi user navigate giữa các tab (nếu có) | 🟠 High |
| FR-T03 | Khi pause và resume, timer không được reset | 🔴 Critical |
| FR-T04 | Auto-switch giữa Focus và Break khi hết thời gian | 🔴 Critical |
| FR-T05 | Phát âm thanh notification (hoặc system notification nếu được cấp quyền) khi kết thúc session | 🟠 High |
| FR-T06 | Tab title hiển thị thời gian còn lại: `25:00 – Focusly` | 🟡 Medium |

> **Lưu ý kỹ thuật FR-T01:** `setInterval` không chính xác khi tab bị ẩn (browser throttle). Giải pháp: lưu `startTime` timestamp, tính elapsed time bằng `Date.now() - startTime` thay vì đếm tick. Đây là pattern quan trọng cần implement đúng.

### 8.2 Data & Persistence

| ID | Yêu cầu | Độ ưu tiên |
|----|---------|-----------|
| FR-D01 | Toàn bộ data (sessions, settings, stats) lưu vào LocalStorage | 🔴 Critical |
| FR-D02 | Data không bị mất khi refresh trang | 🔴 Critical |
| FR-D03 | Daily session list tự reset khi sang ngày mới (dựa vào date comparison) | 🔴 Critical |
| FR-D04 | Streak tự cập nhật khi hoàn thành Pomodoro đầu tiên trong ngày | 🟠 High |
| FR-D05 | Settings (daily goal) được lưu persistent | 🟠 High |

### 8.3 Notification

| ID | Yêu cầu | Độ ưu tiên |
|----|---------|-----------|
| FR-N01 | App xin quyền Browser Notification khi người dùng lần đầu Start timer | 🟠 High |
| FR-N02 | Fallback: phát âm thanh beep nếu notification không được cấp quyền | 🟠 High |
| FR-N03 | Không spam notification – chỉ 1 notification khi session kết thúc | 🔴 Critical |

---

## 9. Non-functional Requirements

| ID | Loại | Yêu cầu |
|----|------|---------|
| NFR-01 | Performance | App load < 3s trên kết nối thông thường |
| NFR-02 | Performance | Timer không lag kể cả khi có chart rendering |
| NFR-03 | Usability | Người dùng mới có thể bắt đầu dùng trong < 30 giây không cần hướng dẫn |
| NFR-04 | Accessibility | Tương thích keyboard navigation (Space để Start/Pause) |
| NFR-05 | Responsive | Hoạt động tốt từ 375px (mobile) đến 1440px+ (desktop) |
| NFR-06 | Browser Support | Chrome, Firefox, Edge, Safari (2 phiên bản gần nhất) |
| NFR-07 | Maintainability | Code có TypeScript types rõ ràng, không dùng `any` tràn lan |
| NFR-08 | Scalability | Architecture đủ clean để thêm auth + cloud sync về sau mà không rewrite toàn bộ |
| NFR-09 | Bundle Size | Production bundle < 500KB (không tính Recharts nếu cần) |

---

## 10. User Flow

### 10.1 First-time User Flow

```
[Mở app lần đầu]
       │
       ▼
[Thấy màn hình Timer với trạng thái mặc định: 25:00, Focus]
       │
       ▼
[Nhấn "Start" → App xin quyền Notification]
       │
       ├─── Cho phép ──→ [Timer chạy, browser notification được bật]
       │
       └─── Từ chối ───→ [Timer chạy, fallback sang âm thanh]
       │
       ▼
[Timer đếm ngược 25 phút]
       │
       ▼
[Session hoàn thành → Notification + Auto-switch sang Break 5 phút]
       │
       ▼
[Break kết thúc → Auto-switch sang Focus tiếp theo]
       │
       ▼
[Progress ring +1, session ghi vào history]
```

### 10.2 Returning User Flow

```
[Mở app]
       │
       ▼
[Thấy stats hôm nay: X/Y Pomodoros, streak N ngày]
       │
       ▼
[Nhấn Start ngay → làm việc]
       │
       ▼
[Cuối ngày: xem weekly chart tại Statistics tab]
```

### 10.3 Settings Flow

```
[Vào Settings / Settings icon]
       │
       ▼
[Chỉnh Daily Goal (mặc định 8)]
       │
       ▼
[Lưu → Progress indicator cập nhật ngay]
```

---

## 11. Technical Stack

### 11.1 Stack chính

| Layer | Công nghệ | Lý do chọn |
|-------|-----------|-----------|
| UI Framework | **React 18** | Ecosystem lớn, phù hợp portfolio, SPA |
| Language | **TypeScript** | Type safety, dễ maintain, chuẩn industry |
| Styling | **TailwindCSS v3** | Rapid UI development, consistent design system, không cần CSS riêng |
| State Management | **Zustand** | Nhẹ hơn Redux, đơn giản hơn Context API cho global state, boilerplate ít |
| Charts | **Recharts** | API React-native, responsive built-in, bundle nhỏ hơn Chart.js |
| Build Tool | **Vite** | Nhanh hơn CRA, HMR tốt, config đơn giản |
| Routing | **React Router v6** | Nếu có nhiều page; nếu single-page thì dùng state để switch view |
| Storage | **LocalStorage** | Không cần backend, zero-auth, đủ cho MVP |
| Notification | **Web Notification API** | Native browser, không cần thư viện |
| Audio | **Web Audio API** | Tạo beep đơn giản không cần audio file |

### 11.2 Development Tools

| Tool | Mục đích |
|------|---------|
| ESLint + Prettier | Code style consistency |
| Husky + lint-staged | Pre-commit hooks |
| Vite | Dev server + build |
| Vercel / Netlify | Deploy (CI/CD tự động khi push lên GitHub) |

### 11.3 Lý do không chọn các option khác

| Không chọn | Lý do |
|-----------|-------|
| Redux Toolkit | Overkill cho app quy mô này; Zustand đủ và gọn hơn |
| Context API | Dễ gây re-render không cần thiết nếu không optimize kỹ; Zustand xử lý tốt hơn |
| Chart.js | Nặng hơn Recharts, cần thêm adapter cho React |
| Next.js | SSR không cần thiết cho SPA Pomodoro; Vite + React đủ và đơn giản hơn |
| Backend | Không cần cho MVP; thêm phức tạp không cần thiết |

---

## 12. Suggested Folder Structure

```
focusly/
├── public/
│   ├── favicon.ico
│   └── sounds/
│       └── notification.mp3        # Optional: hoặc dùng Web Audio API
│
├── src/
│   ├── assets/                     # Hình ảnh, icon tĩnh
│   │
│   ├── components/                 # UI components thuần (không chứa business logic)
│   │   ├── ui/                     # Shared/atomic components
│   │   │   ├── Button.tsx
│   │   │   ├── ProgressRing.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   ├── timer/                  # Timer feature components
│   │   │   ├── TimerDisplay.tsx    # Hiển thị số đếm ngược
│   │   │   ├── TimerControls.tsx   # Start/Pause/Reset buttons
│   │   │   └── SessionStatus.tsx   # Focus / Break label
│   │   │
│   │   ├── stats/                  # Statistics components
│   │   │   ├── StatCard.tsx        # Card hiển thị 1 metric
│   │   │   ├── WeeklyChart.tsx     # Bar chart 7 ngày
│   │   │   └── StreakDisplay.tsx
│   │   │
│   │   ├── history/
│   │   │   ├── SessionList.tsx
│   │   │   └── SessionItem.tsx
│   │   │
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Navigation.tsx
│   │       └── Layout.tsx
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useTimer.ts             # Timer logic (countdown, auto-switch)
│   │   ├── useNotification.ts      # Browser notification permission
│   │   └── useStreak.ts            # Streak calculation logic
│   │
│   ├── store/                      # Zustand stores
│   │   ├── timerStore.ts           # Timer state: mode, timeLeft, isRunning
│   │   ├── sessionStore.ts         # Session history, daily stats
│   │   └── settingsStore.ts        # Daily goal, preferences
│   │
│   ├── data/
│   │   └── quotes.ts               # Hardcoded motivational quotes
│   │
│   ├── utils/
│   │   ├── time.ts                 # formatTime, calculateElapsed, etc.
│   │   ├── storage.ts              # LocalStorage get/set helpers + typed wrappers
│   │   ├── dateUtils.ts            # isToday, isSameDay, getWeekDays, etc.
│   │   └── streakUtils.ts          # Streak calculation logic
│   │
│   ├── types/
│   │   └── index.ts                # Shared TypeScript types & interfaces
│   │
│   ├── pages/                      # Page-level components (nếu dùng routing)
│   │   ├── TimerPage.tsx
│   │   ├── StatsPage.tsx
│   │   └── HistoryPage.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

**Nguyên tắc tổ chức:**
- **Components** chỉ làm việc render UI, nhận props, emit events.
- **Hooks** chứa logic tái sử dụng (timer countdown, permission request...).
- **Stores** giữ global state, persist vào LocalStorage.
- **Utils** là pure functions, không có side effects.
- **Types** định nghĩa interface tập trung, tránh duplication.

---

## 13. Data Model – LocalStorage Schema

Tất cả data được lưu vào LocalStorage với prefix `focusly_` để tránh conflict với các app khác.

### 13.1 Keys & Structure

#### `focusly_sessions`

Lưu lịch sử tất cả session.

```typescript
// types/index.ts

export type SessionType = 'focus' | 'break';

export interface Session {
  id: string;            // UUID v4 hoặc crypto.randomUUID()
  type: SessionType;
  startTime: string;     // ISO 8601: "2026-05-11T08:30:00.000Z"
  endTime: string;       // ISO 8601
  duration: number;      // Tính bằng giây (ví dụ: 1500 = 25 phút)
  completed: boolean;    // false nếu bị cancel giữa chừng
}

// LocalStorage value: JSON.stringify(Session[])
```

#### `focusly_settings`

Cài đặt người dùng.

```typescript
export interface UserSettings {
  dailyGoal: number;            // Số Pomodoro/ngày, mặc định 8
  focusDuration: number;        // Giây, mặc định 1500 (25 phút)
  breakDuration: number;        // Giây, mặc định 300 (5 phút)
  notificationEnabled: boolean; // Mặc định true
  soundEnabled: boolean;        // Mặc định true
}
```

#### `focusly_streak`

Theo dõi streak.

```typescript
export interface StreakData {
  currentStreak: number;      // Số ngày liên tiếp có ≥ 1 focus session
  longestStreak: number;      // Kỷ lục
  lastActiveDate: string;     // "2026-05-11" – dùng để check ngày hôm nay
}
```

### 13.2 LocalStorage Helper Pattern

```typescript
// utils/storage.ts

const PREFIX = 'focusly_';

export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}
```

### 13.3 Daily Reset Logic

```typescript
// utils/dateUtils.ts

export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

// Trong store: filter sessions chỉ lấy những session có startTime là hôm nay
const todaySessions = allSessions.filter(s => isToday(s.startTime));
```

---

## 14. UI/UX Guidelines

### 14.1 Design Principles

| Nguyên tắc | Mô tả |
|-----------|-------|
| **Clarity first** | Người dùng luôn biết mình đang ở trạng thái nào (Focus/Break, timer đang chạy/dừng) |
| **Zero friction** | Không có màn hình onboarding, không cần đăng nhập, mở ra là dùng ngay |
| **Rewarding feedback** | Hoàn thành Pomodoro → animation, màu sắc thay đổi, progress ring tăng lên |
| **Non-intrusive** | App không được gây thêm xao nhãng; animation phải nhẹ nhàng |

### 14.2 Color Palette

```css
/* Đề xuất: Dark-mode first */
:root {
  --bg-primary:    #0f1117;   /* Background chính */
  --bg-surface:    #1a1d27;   /* Card, panel surface */
  --bg-elevated:   #252836;   /* Elevated elements */

  --accent-focus:  #6c63ff;   /* Focus mode – tím indigo */
  --accent-break:  #43d9ad;   /* Break mode – teal mint */
  --accent-warn:   #f7b731;   /* Warning, streak */

  --text-primary:  #e8eaf0;
  --text-secondary:#9094a4;
  --text-muted:    #5a5f72;

  --border:        #2a2d3e;
}
```

**Lý do chọn dark-mode:** Người dùng target (lập trình viên, sinh viên) thường làm việc buổi tối; dark mode giảm mỏi mắt và phù hợp thẩm mỹ productivity tool hiện đại.

### 14.3 Typography

```
Display (Timer): Space Mono hoặc JetBrains Mono – tạo cảm giác precision và focus
Heading:         Outfit hoặc Plus Jakarta Sans – modern, readable
Body:            Inter – neutral, legible ở mọi size
```

**Import từ Google Fonts:**

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### 14.4 Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│  Header: Logo | Navigation (Timer / Stats / History)      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              [Focus Quote]                               │
│                                                          │
│    ┌──────────────────┐     ┌──────────────┐            │
│    │                  │     │              │            │
│    │   25:00 (Timer)  │     │ Progress Ring│            │
│    │                  │     │  X / Y done  │            │
│    └──────────────────┘     └──────────────┘            │
│                                                          │
│        [Start]  [Pause]  [Reset]                         │
│                                                          │
│              [Session Status: FOCUS]                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Footer: Streak | Total today                            │
└──────────────────────────────────────────────────────────┘
```

### 14.5 Micro-interactions

| Tương tác | Animation |
|-----------|-----------|
| Bắt đầu timer | Progress ring bắt đầu quay, màu background nhẹ nhàng thay đổi |
| Hoàn thành Pomodoro | Ring fill lên đến 100%, confetti nhỏ hoặc pulse animation |
| Chuyển Focus → Break | Màu accent đổi từ tím sang teal, transition smooth 0.5s |
| Hover button | Scale 1.02, shadow nhẹ |
| Streak mới | Badge animate "bounce" |

### 14.6 Responsive Breakpoints

```
Mobile  (< 640px):  Single column, timer to, stats ở dưới
Tablet  (640–1024): Timer + progress ring side by side
Desktop (> 1024px): Full layout, có thể có sidebar stats
```

---

## 15. MVP Scope

### ✅ IN SCOPE (MVP)

| Tính năng | Ưu tiên | Thời lượng ước tính |
|-----------|---------|-------------------|
| Pomodoro Timer (25/5) | P0 | 1 ngày |
| Start / Pause / Reset | P0 | (trong timer) |
| Auto-switch Focus ↔ Break | P0 | 0.5 ngày |
| Browser Notification | P1 | 0.5 ngày |
| Daily Goal + Progress Ring | P0 | 1 ngày |
| Session History (hôm nay) | P1 | 1 ngày |
| Statistics Dashboard | P1 | 1.5 ngày |
| Weekly Chart (Recharts) | P1 | 1 ngày |
| Streak Counter | P1 | 0.5 ngày |
| Focus Quotes | P2 | 0.5 ngày |
| LocalStorage Persistence | P0 | (tích hợp trong stores) |
| Responsive UI | P1 | 1 ngày |
| Deploy lên Vercel | P0 | 0.5 ngày |

**Tổng ước tính:** ~9–10 ngày làm việc (bán thời gian), ~5–6 ngày fulltime.

### ❌ OUT OF SCOPE (MVP)

- Authentication / Login
- Cloud sync / Database
- Todo list tích hợp
- Background music / Ambient sound
- Multiple timer profiles
- Team features
- PWA / Offline mode
- Mobile native app

---

## 16. Future Enhancements

Sau khi MVP ổn định và deploy xong, các tính năng sau có thể được thêm vào theo thứ tự ưu tiên:

### Phase 2 – Polish & PWA

| Tính năng | Giá trị |
|-----------|---------|
| PWA support (offline, installable) | Tăng retention, dùng được trên mobile như native |
| Custom timer duration | Một số người dùng prefer 50/10 thay vì 25/5 |
| Ambient sound (rain, lo-fi) | Tăng trải nghiệm focus |
| Dark/Light mode toggle | Một số user prefer light mode |
| Keyboard shortcuts | Power users |

### Phase 3 – Auth & Cloud

| Tính năng | Giá trị |
|-----------|---------|
| Google OAuth login | Sync data giữa devices |
| Cloud storage (Supabase/Firebase) | Không mất data khi clear browser |
| Export data (CSV) | Data ownership |

### Phase 4 – Advanced

| Tính năng | Giá trị |
|-----------|---------|
| Todo list tích hợp | Gắn Pomodoro với task cụ thể |
| AI productivity insights | Phân tích pattern làm việc |
| Team focus room | Focus session cùng bạn bè/đồng nghiệp |
| Mobile app (React Native) | Mở rộng nền tảng |

---

## 17. Risks & Limitations

### 17.1 Technical Risks

| Rủi ro | Xác suất | Tác động | Giải pháp |
|--------|---------|---------|----------|
| Timer drift khi tab bị ẩn | Cao | Cao | Dùng timestamp-based countdown thay vì setInterval tick |
| LocalStorage bị xóa | Thấp | Trung bình | Hiển thị cảnh báo; plan export feature trong Phase 2 |
| Browser Notification bị block | Trung bình | Thấp | Fallback sang Web Audio API |
| Data migrate khi thay đổi schema | Thấp | Trung bình | Versioning key trong LocalStorage: `focusly_v1_sessions` |

### 17.2 UX Risks

| Rủi ro | Giải pháp |
|--------|----------|
| Người dùng không hiểu Pomodoro | Tooltip hoặc modal giải thích ngắn lần đầu |
| Progress ring không đủ hấp dẫn để tạo động lực | Test với người dùng thật, điều chỉnh animation |
| App bị quên sau vài ngày | Streak mechanic là vũ khí chính để giữ retention |

### 17.3 Limitations của MVP

- **Không sync giữa devices:** Người dùng dùng nhiều máy sẽ không có data chung.
- **LocalStorage không an toàn 100%:** Dễ bị xóa khi clear cache → cần education cho người dùng.
- **Không có backup:** Nếu clear storage → mất toàn bộ history.
- **iOS Safari có giới hạn Web Notification:** Notification có thể không hoạt động trên iOS Safari.

---

## 18. Development Roadmap

### Sprint 0 – Setup (0.5 ngày)

- [ ] Khởi tạo project: `npm create vite@latest focusly -- --template react-ts`
- [ ] Cài dependencies: TailwindCSS, Zustand, Recharts, React Router
- [ ] Cấu hình ESLint, Prettier, tsconfig
- [ ] Tạo folder structure theo spec
- [ ] Setup deploy pipeline (GitHub → Vercel)

### Sprint 1 – Core Timer (1.5 ngày)

- [ ] Implement `useTimer` hook với timestamp-based countdown
- [ ] Implement `timerStore` với Zustand
- [ ] Build `TimerDisplay`, `TimerControls`, `SessionStatus` components
- [ ] Auto-switch Focus ↔ Break
- [ ] Ghi session vào `sessionStore` khi hoàn thành
- [ ] Tab title update

### Sprint 2 – Persistence & Notification (1 ngày)

- [ ] Implement LocalStorage helpers (typed)
- [ ] Wire up Zustand stores với LocalStorage (persist middleware hoặc manual)
- [ ] Implement `useNotification` hook
- [ ] Web Audio API beep fallback

### Sprint 3 – Daily Goal & Progress (1 ngày)

- [ ] `ProgressRing` component (SVG-based)
- [ ] Daily goal settings (input + save)
- [ ] Daily reset logic
- [ ] `settingsStore`

### Sprint 4 – Statistics & History (2 ngày)

- [ ] `WeeklyChart` với Recharts
- [ ] `StatCard` components
- [ ] `SessionList` + `SessionItem` components
- [ ] Streak calculation logic
- [ ] Page navigation (Timer / Stats / History)

### Sprint 5 – Polish & Deploy (1.5 ngày)

- [ ] Focus Quotes component
- [ ] Responsive testing (mobile/tablet/desktop)
- [ ] Dark mode verification
- [ ] Animation & micro-interactions
- [ ] Performance check (Lighthouse)
- [ ] Final deploy + custom domain (nếu có)

---

## 19. Success Metrics

### 19.1 Development Metrics (cá nhân)

| Metric | Target |
|--------|--------|
| Hoàn thành MVP | ≤ 10 ngày làm việc |
| Lighthouse Performance score | ≥ 85 |
| Lighthouse Accessibility score | ≥ 90 |
| Zero TypeScript `any` warnings | ✅ |
| Deploy thành công lên Vercel | ✅ |

### 19.2 Product Metrics (nếu share public)

| Metric | Target trong 30 ngày |
|--------|---------------------|
| Sessions hoàn thành (per user) | ≥ 5 sessions/tuần |
| D7 Retention | ≥ 20% |
| Thời gian trung bình mỗi session | ≥ 20 phút (không cancel sớm) |
| Streak trung bình | ≥ 3 ngày |

### 19.3 Portfolio Metrics

- App xuất hiện trong GitHub profile với README đẹp
- Có thể demo live trong vòng < 10 giây
- Code base đủ sạch để giải thích trong technical interview

---

## 20. Conclusion

Focusly là một MVP có phạm vi rõ ràng, mục tiêu cụ thể và stack đã được chứng minh. Đây không phải là một dự án "tất cả mọi thứ" – mà là một dự án **làm đúng những thứ quan trọng nhất**.

**Tóm tắt các quyết định chính:**

| Quyết định | Lý do |
|-----------|-------|
| React + Vite thay vì Next.js | Không cần SSR, đơn giản hơn, build nhanh hơn |
| Zustand thay vì Redux | Nhẹ hơn, ít boilerplate hơn, đủ cho scope này |
| LocalStorage thay vì backend | Zero-auth MVP, dễ deploy, đủ cho phase 1 |
| Recharts thay vì Chart.js | React-native API, responsive tốt, bundle nhỏ hơn |
| Timestamp-based timer | Giải quyết vấn đề browser tab throttling một cách chính xác |
| Dark mode first | Phù hợp target user (dev, student làm việc tối) |

**Tiếp theo:**

1. Review PRD này một lần cuối
2. Bắt đầu Sprint 0 – Setup project
3. Build timer trước (core) rồi mới đến UI
4. Deploy sớm (sau Sprint 1) để có thể test trên thiết bị thật

---

*PRD Version 1.0 – Focusly MVP*
*Cập nhật khi scope thay đổi hoặc sau mỗi sprint*