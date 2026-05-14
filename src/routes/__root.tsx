/// <reference types="vite/client" />
import { Outlet, createRootRoute, Scripts } from '@tanstack/react-router';

import globalCss from '@/styles/global.css?url';
import { TrpcProvider } from '@/client/trpc/provider';

export const Route = createRootRoute({
  component: RootDocument,
});

function RootDocument() {
  return (
    <html className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="no-referrer" />
        <link rel="shortcut icon" href="data:," type="image/x-icon" />
        <title>KAT.LI</title>
        <link rel="stylesheet" href={globalCss} />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background: 'oklch(0.07 0.02 265)',
          color: 'oklch(0.93 0.01 265)',
          margin: 0,
          padding: 0,
        }}
      >
        <TrpcProvider>
          <Outlet />
        </TrpcProvider>
        <Scripts />
      </body>
    </html>
  );
}
