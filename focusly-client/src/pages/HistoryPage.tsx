import { useMemo } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import SessionList from '@/components/history/SessionList';
import { Card, CardContent } from '@/components/ui/Card';
import type { Session } from '@/types';

/**
 * Calculate statistics from sessions
 */
function calculateStats(sessions: Session[]) {
  const totalSessions = sessions.length;
  const focusSessions = sessions.filter((s) => s.type === 'focus').length;
  const breakSessions = sessions.filter((s) => s.type === 'break').length;

  return {
    totalSessions,
    focusSessions,
    breakSessions,
  };
}

function HistoryPage() {
  const sessions = useSessionStore((state) => state.sessions);
  const stats = useMemo(() => calculateStats(sessions), [sessions]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <header className="flex flex-col gap-3 px-1">
        <h1 className="font-heading text-heading text-canvas-white">
          Lịch sử phiên làm việc
        </h1>
        <p className="max-w-2xl font-body text-body text-cool-gray">
          Xem lại các phiên làm việc của bạn để tối ưu hóa hiệu suất công việc.
        </p>
      </header>

      {stats.totalSessions > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <p className="text-caption text-cool-gray">Tổng phiên</p>
                <p className="text-heading text-canvas-white">{stats.totalSessions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <p className="text-caption text-cool-gray">Focus 🍅</p>
                <p className="text-heading text-canvas-white">{stats.focusSessions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <p className="text-caption text-cool-gray">Break ☕</p>
                <p className="text-heading text-canvas-white">{stats.breakSessions}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <SessionList sessions={sessions} />
      </div>
    </div>
  );
}

export default HistoryPage;
