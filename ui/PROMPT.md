Hãy đọc file `design.md` tôi cung cấp trước để hiểu toàn bộ design language, visual system, typography, spacing, elevation, layout philosophy và component style reference.

Sau đó hãy viết một prompt hoàn chỉnh dành cho Stitch để thiết kế UI/UX cho dự án **Focusly**.

---

# Thông tin dự án

## Tên dự án

Focusly

## Loại sản phẩm

Pomodoro productivity web app

## Mục tiêu sản phẩm

Giúp sinh viên và người đi làm:

* tăng khả năng tập trung
* giảm procrastination
* xây dựng thói quen deep work
* theo dõi thời gian focus mỗi ngày

---

# Design Direction

## Mood & Feeling

UI cần mang cảm giác:

* calm
* focused
* modern
* premium
* minimal
* productivity-first
* không gây xao nhãng
* giống một công cụ dành cho deep work

Không được:

* quá colorful
* gaming-style
* childish
* cluttered
* overly animated

---

# Phong cách thiết kế

## Dựa trên style reference trong `design.md`

Áp dụng:

* sophisticated minimalism
* layered light surfaces
* subtle shadows
* elegant typography
* restrained color usage
* clean spacing
* architectural layout feeling

## Tuy nhiên cần điều chỉnh cho phù hợp productivity app:

* Timer phải là visual center
* Focus mode phải nổi bật
* UI phải dễ đọc khi nhìn từ xa
* Thông tin phải có hierarchy rõ ràng
* Components cần practical hơn landing page marketing

---

# Color Direction

## Primary Accent

Dùng:

* Cofounder Blue `#0081c0`

## Main Background

* Canvas White `#ffffff`
* Off White `#fefffc`

## Focus Mode

* dùng accent blue nhẹ nhàng
* không neon
* không saturated quá mạnh

## Break Mode

* dùng teal/mint subtle
* calm and refreshing

## Text

* Dark Charcoal `#171717`
* Charcoal `#2c2c2c`
* Medium Gray `#646464`

Không dùng:

* gradient quá mạnh
* màu neon
* đỏ chói
* shadow nặng

---

# Typography

## Headlines

Dùng style giống:

* PPMondwest aesthetic
* elegant serif feeling
* calm authority

## Body

Modern sans-serif:

* clean
* highly readable
* productivity-oriented

## Timer Typography

Timer phải:

* cực kỳ nổi bật
* large display typography
* monospace hoặc highly readable numeric font
* dễ nhìn từ xa

---

# Layout Direction

## App Layout

Thiết kế desktop-first responsive web app.

### Desktop

* centered layout
* max-width container
* spacious breathing room
* timer ở trung tâm
* stats/history ở secondary regions

### Mobile

* stacked layout
* timer ưu tiên trên cùng
* controls dễ chạm

---

# Screens cần thiết kế

## 1. Main Focus Screen (quan trọng nhất)

Bao gồm:

* greeting/header
* focus quote
* large Pomodoro timer
* focus/break status
* progress ring
* daily goal progress
* Start / Pause / Reset controls
* subtle session info
* current streak
* total focus today

Đây là màn hình quan trọng nhất.
Timer phải là hero element của toàn app.

---

## 2. Statistics Dashboard

Bao gồm:

* weekly bar chart
* total focus time
* completed pomodoros
* streak statistics
* productivity summary cards
* weekly trend overview

Charts cần:

* clean
* minimal
* elegant
* không noisy

---

## 3. Session History Screen

Bao gồm:

* recent sessions list
* focus vs break labels
* timestamps
* duration
* empty state

Thiết kế:

* clean productivity journal feeling
* subtle cards
* easy scanning

---

## 4. Settings Modal / Page

Bao gồm:

* daily goal setting
* timer duration
* notification toggle
* sound toggle
* reset data action

Phong cách:

* minimal utility panel
* elegant forms
* subtle inputs

---

# UX Requirements

## Focus-first UX

UI phải giúp user:

* vào focus nhanh
* không bị phân tâm
* thấy tiến độ rõ ràng
* cảm thấy rewarding khi hoàn thành session

---

# Interaction Style

Dùng:

* subtle hover
* smooth transitions
* soft micro-interactions
* calm animations

Không dùng:

* flashy animation
* bouncing UI everywhere
* gamification quá mạnh

---

# Important Visual Priorities

## Ưu tiên số 1:

Timer readability.

## Ưu tiên số 2:

Visual clarity.

## Ưu tiên số 3:

Premium minimalist feeling.

---

# Technical Context

Frontend stack:

* React
* TypeScript
* TailwindCSS
* Zustand
* Recharts

UI cần realistic để implement bằng:

* TailwindCSS
* shadcn/ui
* Recharts

Không thiết kế những thứ quá khó implement.

---

# Output yêu cầu

Hãy viết:

1. Một prompt hoàn chỉnh cho Stitch
2. Mô tả rõ visual direction
3. Layout direction
4. UX priorities
5. Component behavior
6. Screen breakdown
7. Responsive behavior
8. Interaction style

Prompt cần:

* rất chi tiết
* production-quality
* đủ tốt để Stitch tạo ra UI chuyên nghiệp
* mang cảm giác startup SaaS/productivity hiện đại
* phù hợp portfolio mạnh
* đồng nhất với style reference trong `design.md`

Viết bằng tiếng Anh.
