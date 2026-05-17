export const quotes: string[] = [
  // Focus
  "Wherever you are, be all there.",
  "Focus on the step in front of you.",
  "One task. One mind. One moment.",
  "You can't do two things well at once.",
  "The power is in the present.",
  "Chất lượng hơn số lượng – tập trung vào một việc.",
  "Mất tập trung là mất năng lượng.",

  // Discipline
  "Discipline is choosing what you want most over what you want now.",
  "Do the hard work, especially when you don't feel like it.",
  "Motivation fades. Discipline stays.",
  "You don't need to be ready. You just need to start.",
  "Kỷ luật là cầu nối giữa mục tiêu và thành tựu.",
  "Không có ngày mai – chỉ có bây giờ.",
  "Làm điều đúng đắn, ngay cả khi không ai nhìn thấy.",

  // Consistency
  "Small steps every day lead to big results.",
  "Consistency compounds.",
  "Show up. Even when it's average.",
  "Perfect is the enemy of done.",
  "Hôm nay làm một chút, ngày mai làm một chút – đó là công thức.",
  "Đừng tìm động lực. Hãy tìm thói quen.",
  "Kiên trì không phải là mạnh mẽ nhất, mà là không bỏ cuộc.",

  // Growth
  "Improve 1% every day.",
  "You are not your past. You are your potential.",
  "Growth happens outside your comfort zone.",
  "Don't compare your chapter 1 to someone else's chapter 20.",
  "Every expert was once a beginner.",
  "Không ai giỏi ngay từ đầu – học từ sai lầm.",
  "Mỗi ngày là một cơ hội để tốt hơn hôm qua.",

  // Deep work
  "Deep work is the superpower of the 21st century.",
  "Distraction is the enemy of depth.",
  "Long focus, deep results.",
  "Quality output requires uninterrupted time.",
  "Silence your phone. Open your mind.",
  "Làm sâu, không làm nhiều.",
  "Tập trung sâu – đó là nơi điều kỳ diệu xảy ra.",

  // Self-improvement
  "Build the person you want to be, one habit at a time.",
  "You are what you do repeatedly.",
  "Read. Think. Apply. Repeat.",
  "The best time to start was yesterday. The next best time is now.",
  "Your habits shape your future.",
  "Chăm sóc bản thân cũng là một hành động kỷ luật.",
  "Thay đổi nhỏ – kết quả lớn.",
  "Học mỗi ngày là đầu tư cho chính mình.",

  // General
  "Start before you feel ready.",
  "Done is better than perfect.",
  "Protect your time like it matters — because it does.",
  "You have everything you need to begin.",
  "Thời gian là thứ duy nhất bạn không thể mua lại.",
  "Đừng chờ đợi – hãy bắt đầu với những gì bạn có.",
  "Hành động nhỏ hôm nay thay đổi lớn ngày mai.",
];

export function getRandomQuote(): string {
  if (quotes.length === 0) {
    return "Stay focused.";
  }
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
