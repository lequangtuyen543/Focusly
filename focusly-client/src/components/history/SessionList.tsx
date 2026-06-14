import React, { useMemo } from 'react';
import type { Session } from '@/types';
import SessionItem from './SessionItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { toDateKey } from '@/utils/dateUtils';

interface SessionListProps {
  sessions: Session[];
}

/**
 * Format a date key for display in headers.
 * Shows "Today", "Yesterday", or the formatted date.
 */
function formatDateHeader(dateKey: string): string {
  const today = toDateKey();
  const yesterday = toDateKey(new Date(Date.now() - 24 * 60 * 60 * 1000));

  if (dateKey === today) return 'Hôm nay';
  if (dateKey === yesterday) return 'Hôm qua';

  // Format as "Thứ __, Ngày __ Tháng __" (Vietnamese format)
  const date = new Date(dateKey);
  return date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Group sessions by date (based on startTime), sorted newest first.
 * Returns a map of dateKey → sessions for that date.
 */
function groupSessionsByDate(
  sessions: Session[],
): Record<string, Session[]> {
  // Sort newest first
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );

  // Limit to 20 most recent
  const limited = sorted.slice(0, 20);

  // Group by date
  const groups: Record<string, Session[]> = {};
  for (const session of limited) {
    const dateKey = toDateKey(new Date(session.startTime));
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(session);
  }

  return groups;
}

const SessionList: React.FC<SessionListProps> = ({ sessions }) => {
  const groupedSessions = useMemo(() => groupSessionsByDate(sessions), [sessions]);

  // Sort date keys descending (newest dates first)
  const dateKeys = useMemo(
    () => Object.keys(groupedSessions).sort((a, b) => b.localeCompare(a)),
    [groupedSessions],
  );

  if (sessions.length === 0) {
    return <EmptyState message="Chưa có phiên làm việc nào" />;
  }

  return (
    <div className="space-y-6">
      {dateKeys.map((dateKey) => (
        <div key={dateKey}>
          <h3 className="text-subheading text-canvas-white px-4 mb-3">
            {formatDateHeader(dateKey)}
          </h3>
          <div className="space-y-2">
            {groupedSessions[dateKey].map((session) => (
              <SessionItem key={session.id} session={session} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
