'use client';

import '/styles/globals.css';
import { ReactNode } from 'react';
import Auth0ProviderWrapper from './providers/Auth0ProviderWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Auth0ProviderWrapper>
          {children}
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}