/// <reference types="astro/client" />

interface Window {
  dataLayer: IArguments[];
  gtag: (...args: unknown[]) => void;
  kotoriAnalytics?: {
    isAvailable: () => boolean;
    getChoice: () => string | null;
    grant: () => void;
    deny: () => boolean;
  };
}
