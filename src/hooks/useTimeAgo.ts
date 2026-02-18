

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function useTimeAgo(dateInput: string | number | Date | undefined) {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    if (!dateInput) return '';

    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return '';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime(); // positive => past
    const diffSec = Math.round(Math.abs(diffMs) / 1000);
    const locale = i18n.language || undefined;

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (diffSec < 45) return t('time.just_now', 'just now');

    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60) return rtf.format(diffMs > 0 ? -diffMin : diffMin, 'minute');

    const diffHour = Math.round(diffMin / 60);
    if (diffHour < 24) return rtf.format(diffMs > 0 ? -diffHour : diffHour, 'hour');

    const diffDay = Math.round(diffHour / 24);
    if (diffDay < 7) return rtf.format(diffMs > 0 ? -diffDay : diffDay, 'day');

    const diffWeek = Math.round(diffDay / 7);
    if (diffWeek < 4) return rtf.format(diffMs > 0 ? -diffWeek : diffWeek, 'week');

    // calendar-aware month difference
    const monthDiff =
      (now.getFullYear() - date.getFullYear()) * 12 +
      (now.getMonth() - date.getMonth()) -
      (now.getDate() < date.getDate() ? 1 : 0);

    const absMonthDiff = Math.abs(monthDiff);
    if (absMonthDiff < 12) {
      return rtf.format(monthDiff > 0 ? -monthDiff : monthDiff, 'month');
    }

    const yearDiff = Math.round(monthDiff / 12);
    return rtf.format(yearDiff > 0 ? -yearDiff : yearDiff, 'year');
  }, [dateInput, t, i18n.language]);
}
