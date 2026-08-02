import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { formatDuration } from '@/utils/time';
import type { Session } from '@/types';

interface SessionItemProps {
  session: Session;
}

const SessionItem: React.FC<SessionItemProps> = ({ session }) => {
  const icon = session.type === 'focus' ? '🍅' : '☕';
  const bgColor = session.type === 'focus' ? 'bg-cofounder-blue/15' : 'bg-action-azure/15';
  const badgeVariant = session.completed ? 'success' : 'warning';
  const badgeText = session.completed ? 'Hoàn thành' : 'Huỷ';

  // Format times as HH:MM (24-hour format, no AM/PM)
  const startTime = new Date(session.startTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const endTime = new Date(session.endTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const duration = formatDuration(session.duration);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 px-4 py-3 rounded-cards-sm border border-outline-variant/15',
        'transition-colors duration-200',
        bgColor,
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="text-xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-caption text-light-gray">
            {startTime} → {endTime}
          </div>
          <div className="text-button-label text-canvas-white">
            {duration}
          </div>
        </div>
      </div>
      <Badge variant={badgeVariant}>{badgeText}</Badge>
    </div>
  );
};

export default SessionItem;
