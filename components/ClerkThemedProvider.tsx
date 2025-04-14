'use client';

import { useTheme } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes'; // You can import built-in themes

export function ClerkThemedProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  console.log('Current theme:', theme);
  return (
    <ClerkProvider appearance={{
      baseTheme: theme === 'dark' ? dark : undefined,
    }}>
      {children}
    </ClerkProvider>
  );
}