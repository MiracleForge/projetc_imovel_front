export { };

declare global {
  interface Window {
    turnstile: {
      render: (selector: string | HTMLElement, options: any) => any;
      reset?: (widgetId?: string) => void;
      remove?: (widgetId?: string) => void;
    };
  }
}

