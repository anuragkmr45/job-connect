'use client';

import React, { useEffect, useMemo, useState } from 'react';

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
        const base = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${base}api/job-news?limit=20`, { cache: 'no-store' });
        const json = await res.json();
        if (!cancelled) setItems(Array.isArray(json.items) ? json.items : []);
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

  // duplicate for seamless loop
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
        /* pause on hover */
        .relative:hover .ticker-track {
          animation-play-state: paused;
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
