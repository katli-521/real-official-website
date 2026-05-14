// @ts-nocheck
import { Root } from '@/components/home/root';

export function HomePage() {
  return (
    <>
      <Root />
      <div
        key="3"
        id="_r_0_"
        data-base-ui-portal=""
        data-slot="toast-portal-anchored"
      >
        <div
          tabIndex="-1"
          role="region"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions text"
          aria-label="Notifications"
          data-slot="toast-viewport-anchored"
          className="outline-none"
        />
      </div>
      <div key="4" id="_r_1_" data-base-ui-portal="" data-slot="toast-portal">
        <div
          tabIndex="-1"
          role="region"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions text"
          aria-label="Notifications"
          data-position="bottom-right"
          data-slot="toast-viewport"
          className="fixed z-50 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)] data-[position*=top]:top-(--toast-inset) data-[position*=bottom]:bottom-(--toast-inset) data-[position*=left]:left-(--toast-inset) data-[position*=right]:right-(--toast-inset) data-[position*=center]:-translate-x-1/2 data-[position*=center]:left-1/2"
        />
      </div>
    </>
  );
}
