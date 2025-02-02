export const formatRelativeTime = (dateString: string | null): string | null => {
  if (dateString == null) {
    return null;
  }
  const targetDate = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - targetDate.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return 'seconds ago';
  if (diffMin < 60) return 'mins ago';
  if (diffHours < 24) return 'hours ago';
  if (diffDays < 7) return 'days ago';

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();

  const diffMonths = (nowYear - targetYear) * 12 + (nowMonth - targetMonth);
  if (diffMonths < 12) return `${diffMonths} months ago`;

  const diffYears = nowYear - targetYear;
  return `${diffYears} years ago`;
};
