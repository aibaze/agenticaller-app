/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';

import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { AuthProvider } from 'src/auth/context/jwt';
import LocalizationProvider from 'src/providers/LocalizationMuiProvider';
import MixpanelProvider from 'src/providers/MixpanelProvider';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Agenticaller',
  description: 'All in one platform for coaches',
  keywords: 'Agenticaller,ai agents,voice ai',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={primaryFont.className}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kyr4guv.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c, l, a, r, i, t, y) {
                c[a] = c[a] || function() { 
                  (c[a].q = c[a].q || []).push(arguments); 
                };
                t = l.createElement(r); 
                t.async = 1; 
                t.src = "https://www.clarity.ms/tag/" + i; 
                y = l.getElementsByTagName(r)[0]; 
                y.parentNode.insertBefore(t, y); 
              })(window, document, "clarity", "script", "ne79yr3z9b");
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'dark', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MixpanelProvider>
                  <SnackbarProvider>
                    <MotionLazy>
                      <SettingsDrawer />
                      <ProgressBar />
                      {children}
                    </MotionLazy>
                  </SnackbarProvider>
                </MixpanelProvider>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
