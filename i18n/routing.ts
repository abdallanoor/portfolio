import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',

  // Only add locale prefix for non-default locales
  localePrefix: {
    mode: 'as-needed'
  }
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);