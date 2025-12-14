// src/app/admin/job-news-upload/page.tsx
'use client';

import React, { useState } from 'react';

const ADMIN_EMAIL = 'admin@kantiloai.com';
const ADMIN_PASS  = '@Hexmon123';

export default function JobNewsUploadPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile]         = useState<File | null>(null);
  const [status, setStatus]     = useState<string | null>(null);

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setLoggedIn(true);
      setStatus(null);
    } else {
      setStatus('Invalid admin credentials');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please choose an image file first.');
      return;
    }

    try {
      setStatus('Uploading and processing…');

      const formData = new FormData();
      formData.append('image', file);

      const url = `${process.env.NEXT_PUBLIC_API_URL}api/job-news/from-image`;

      // Basic auth header matching backend adminBasicAuth
      const basic = btoa(`${ADMIN_EMAIL}:${ADMIN_PASS}`);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus(`Error: ${data.error || 'Failed to upload'}`);
        return;
      }

      setStatus(`Success: ${data.created} news item(s) extracted and stored.`);
    } catch (err: any) {
      setStatus('Upload failed. Please try again.');
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow p-6 rounded w-full max-w-sm space-y-4">
          <h1 className="text-xl font-semibold text-center">Admin Login</h1>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          {status && <p className="text-sm text-red-500 text-center">{status}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Job News Image Upload</h1>
        <p className="text-sm text-gray-600">
          Upload a newspaper image. The system will extract employment/job-related news
          using AI and store them in the JobNews table.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm"
        />

        <button
          onClick={handleUpload}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload & Extract
        </button>

        {status && <p className="mt-2 text-sm text-gray-800">{status}</p>}
      </div>
    </div>
  );
}
