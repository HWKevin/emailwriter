'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: () => void;
          cancel: () => void;
        };
      };
    };
  }
}

const GOOGLE_IDENTITY_SCRIPT = 'https://accounts.google.com/gsi/client';

function loadGoogleIdentityScript() {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_IDENTITY_SCRIPT}"]`,
    );

    if (existing) {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = GOOGLE_IDENTITY_SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}

export default function GoogleOneTap() {
  const { status } = useSession();
  const initialized = useRef(false);

  useEffect(() => {
    if (status !== 'unauthenticated' || initialized.current) {
      return;
    }

    let cancelled = false;

    async function startOneTap() {
      try {
        const response = await fetch('/api/auth/google-client-id');
        const { clientId } = (await response.json()) as { clientId?: string };

        if (!clientId || cancelled) {
          return;
        }

        await loadGoogleIdentityScript();

        if (!window.google?.accounts?.id || cancelled) {
          return;
        }

        initialized.current = true;
        window.google.accounts.id.initialize({
          client_id: clientId,
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: true,
          callback: async ({ credential }) => {
            if (!credential) {
              return;
            }

            await signIn('google-one-tap', {
              credential,
              redirect: false,
            });
          },
        });
        window.google.accounts.id.prompt();
      } catch (error) {
        console.error('Google One Tap failed to initialize:', error);
      }
    }

    startOneTap();

    return () => {
      cancelled = true;
      window.google?.accounts?.id?.cancel();
    };
  }, [status]);

  return null;
}
