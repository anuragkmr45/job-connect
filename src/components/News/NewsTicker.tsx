'use client';

import React, { useEffect, useMemo, useState } from 'react';

type ApiJobNews = {
  id: number | string;
  headline: string;
  body?: string | null;
  source?: string | null;
  location?: string | null;
  published_on?: string | null;
  createdAt?: string | null;
};

type JobNewsItem = {
  id: number | string;
  title: string;
  body?: string | null;
  published_at?: string | null;
  source_hint?: string | null;
  created_at?: string | null;
};

export default function NewsTicker() {
  const [items, setItems] = useState<JobNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
        const res = await fetch(`${base}/api/job-news?page=1&pageSize=10`, { cache: 'no-store' });
        const json = await res.json();

        const news: ApiJobNews[] = Array.isArray(json.news) ? json.news : [];

        const mapped: JobNewsItem[] = news.map((n) => ({
          id: n.id,
          title: n.headline,                 // ✅ headline -> title
          body: n.body ?? null,
          published_at: n.published_on ?? null, // ✅ published_on -> published_at
          source_hint: n.source ?? null,
          created_at: n.createdAt ?? null,
        }));

        if (!cancelled) setItems(mapped);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const text = useMemo(() => {
    if (loading) return ['Loading latest job news…'];
    if (!items.length) return ['No job news available yet.'];
    return items.map((n) => n.title?.trim()).filter(Boolean);
  }, [items, loading]);

  const loop = [...text, ...text];

  return (
    <div className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-3">
        <span className="shrink-0 text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          JOB NEWS
        </span>

        <div className="relative overflow-hidden w-full">
          <div className="ticker-track">
            {loop.map((t, idx) => (
              <span key={idx} className="ticker-item">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          display: inline-flex;
          gap: 28px;
          white-space: nowrap;
          will-change: transform;
          animation: ticker 28s linear infinite;
        }
        .ticker-item {
          font-size: 13px;
          color: #374151;
        }
        .ticker-item::after {
          content: '•';
          margin-left: 14px;
          color: #9ca3af;
        }
        .relative:hover .ticker-track {
          animation-play-state: paused;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
