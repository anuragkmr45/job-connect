'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import CardLayout from '@/components/layouts/CardLayout';
import { useAppSelector } from '@/store/hooks';
import { Input, Button, Alert } from 'antd';

const ADMIN_EMAIL = 'admin@kantiloai.com';
const ADMIN_PASSWORD = '@Hexmon123';

const STORAGE_KEY = 'jobUploadAdminAuthed';

export default function JobUploadPage() {
  const [authed, setAuthed] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [messageText, setMessageText] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>(
    'info'
  );

  // On mount, check if already "admin-logged-in" on this browser
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setAuthed(true);
    }
  }, []);

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuthed(true);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, 'true');
      }
      setMessageType('success');
      setMessageText('Admin access granted.');
    } else {
      setMessageType('error');
      setMessageText('Invalid admin credentials.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setMessageText(null);
  };

  const handleUpload = async () => {
    if (!authed) {
      setMessageType('error');
      setMessageText('You are not authorized to upload.');
      return;
    }

    if (!file) {
      setMessageType('error');
      setMessageText('Please select a CSV or XLSX file first.');
      return;
    }

    try {
      setUploading(true);
      setMessageText(null);

      const formData = new FormData();
      // IMPORTANT: field name "file" must match your multer upload config
      formData.append('file', file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/job-pool/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Upload failed with status ${res.status}`);
      }

      const data = await res.json().catch(() => ({}));

      setMessageType('success');
      setMessageText(
        data?.message ||
        `Upload successful${data.inserted || data.total
          ? ` (inserted: ${data.inserted ?? data.total})`
          : ''
        }.`
      );
      setFile(null);
    } catch (err: any) {
      console.error('Job upload error:', err);
      setMessageType('error');
      setMessageText(
        err?.message || 'Something went wrong while uploading the job file.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleLogoutAdmin = () => {
    setAuthed(false);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setEmail('');
    setPassword('');
    setMessageType('info');
    setMessageText('Admin session cleared for this browser.');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <CardLayout elevation="md" className="p-6 bg-white">
        <h1 className="text-2xl font-semibold mb-4">
          Admin Job Upload (CSV / XLSX)
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          This page allows an admin to upload bulk job data via CSV or Excel.
        </p>

        {messageText && (
          <div className="mb-4">
            <Alert message={messageText} type={messageType} showIcon />
          </div>
        )}

        {/* Admin login gate (hardcoded credentials) */}
        {!authed ? (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Admin Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kantiloai.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="@Hexmon123"
                required
              />
            </div>
            <Button type="primary" htmlType="submit" block>
              Login as Admin
            </Button>
          </form>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-green-700 font-medium">
                Admin access verified for this browser.
              </span>
              <Button size="small" danger onClick={handleLogoutAdmin}>
                Clear Admin Session
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select CSV / XLSX file
                </label>
                <input
                  type="file"
                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileChange}
                  className="block w-full text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use the exact template/format expected by the backend
                  (same as the one you shared).
                </p>
              </div>

              <Button
                type="primary"
                onClick={handleUpload}
                loading={uploading}
                disabled={!file || uploading}
              >
                {uploading ? 'Uploading…' : 'Upload Jobs File'}
              </Button>
            </div>
          </>
        )}
      </CardLayout>
    </div>
  );
}
