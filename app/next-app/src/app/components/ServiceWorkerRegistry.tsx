"use client";

import { useEffect } from 'react';

export default function ServiceWorkerRegistry() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  }, []);

  return null; // UI不要の場合はnullを返す
}