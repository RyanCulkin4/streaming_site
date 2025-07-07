'use client';

import { useEffect, useRef, useState } from 'react';

export default function LogConsole() {
  // Persist visibility state
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('logConsoleVisible') === 'true';
    }
    return false;
  });

  // Persist logs state
  const [logs, setLogs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const storedLogs = localStorage.getItem('logConsoleLogs');
      return storedLogs ? JSON.parse(storedLogs) : [];
    }
    return [];
  });

  const ref = useRef<HTMLDivElement>(null);

  // Save visibility state to localStorage
  useEffect(() => {
    localStorage.setItem('logConsoleVisible', JSON.stringify(visible));
  }, [visible]);

  // Save logs to localStorage when they change
  useEffect(() => {
    localStorage.setItem('logConsoleLogs', JSON.stringify(logs));
  }, [logs]);

  // Simulate incoming logs
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      const newLog = '[INFO] ' + new Date().toLocaleTimeString() + ' — New system log entry.';
      setLogs((prev) => {
        const updated = [...prev.slice(-99), newLog];
        return updated;
      });
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <>
      <button
        onClick={() => setVisible(!visible)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
      >
        {visible ? 'Close Logs' : 'View Logs'}
      </button>

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-700 h-64">
          <div
            ref={ref}
            className="overflow-y-scroll h-full px-4 py-2 font-mono text-sm text-gray-300"
          >
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
