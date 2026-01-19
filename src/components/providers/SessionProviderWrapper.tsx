'use client';

import { ReactNode } from 'react';

interface SessionProviderWrapperProps {
  children: ReactNode;
}

export default function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
  return <>{children}</>;
}
