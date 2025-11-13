'use client';

import { AdminProvider } from '@/context/AdminContext';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
