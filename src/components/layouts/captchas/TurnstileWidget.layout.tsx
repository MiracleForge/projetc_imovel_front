"use client";

import { useEffect, useRef } from "react";

export default function Turnstile({
  siteKey,
  onSuccessAction,
}: {
  siteKey: string;
  onSuccessAction?: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const checkInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (widgetId.current && window.turnstile?.remove) {
      window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    }

    checkInterval.current = setInterval(() => {
      if (window.turnstile && containerRef.current) {
        clearInterval(checkInterval.current!);
        checkInterval.current = null;

        if (containerRef.current.children.length > 0) {
          containerRef.current.innerHTML = '';
        }

        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onSuccessAction?.(token),
        });
      }
    }, 100);

    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
      }
      if (widgetId.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, onSuccessAction]);

  return <div ref={containerRef} />;
}
