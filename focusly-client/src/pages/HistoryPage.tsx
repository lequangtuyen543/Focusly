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
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-heading text-canvas-white">
          Lịch sử phiên làm việc
        </h1>
        <p className="font-body text-body text-light-gray">
          Xem lại các phiên làm việc của bạn để tối ưu hóa hiệu suất công việc.
        </p>
      </header>

      {/* Statistics Cards */}
      {stats.totalSessions > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <p className="text-caption text-light-gray">Tổng phiên</p>
                <p className="text-heading text-canvas-white">{stats.totalSessions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <p className="text-caption text-light-gray">Focus 🍅</p>
                <p className="text-heading text-canvas-white">{stats.focusSessions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <p className="text-caption text-light-gray">Break ☕</p>
                <p className="text-heading text-canvas-white">{stats.breakSessions}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Session List */}
      <div className="flex flex-col gap-6">
        <SessionList sessions={sessions} />
      </div>
    </div>
  );
}

export default HistoryPage;
