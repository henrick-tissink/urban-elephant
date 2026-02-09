"use client";

import { useCallback } from "react";
import Script from "next/script";

const TIDIO_KEY = process.env.NEXT_PUBLIC_TIDIO_KEY;

interface TidioChatApi {
  open: () => void;
  close: () => void;
  show: () => void;
  hide: () => void;
}

declare global {
  interface Window {
    tidioChatApi?: TidioChatApi;
  }
}

export function ChatWidget() {
  if (!TIDIO_KEY) return null;

  return (
    <Script
      src={`//code.tidio.co/${TIDIO_KEY}.js`}
      strategy="lazyOnload"
    />
  );
}

// Hook to control Tidio programmatically
export function useTidio() {
  const open = useCallback(() => {
    window.tidioChatApi?.open();
  }, []);

  const close = useCallback(() => {
    window.tidioChatApi?.close();
  }, []);

  const show = useCallback(() => {
    window.tidioChatApi?.show();
  }, []);

  const hide = useCallback(() => {
    window.tidioChatApi?.hide();
  }, []);

  return { open, close, show, hide };
}
