import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme as antTheme } from 'antd';
import { ApiError } from '@/api/client';
import { AuthProvider } from '@/hooks/auth/use-auth';
import { useQueryCacheReset } from '@/hooks/auth/use-query-cache-reset';
import { BasketProvider } from '@/hooks/storefront/use-basket';
import { ThemeProvider, useTheme, fontFamily } from '@/theme';
import { AppRouter } from '@/routes/AppRouter';
import '@/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // A 4xx will not fix itself on retry; transient failures get two more tries.
      retry: (failureCount, error) =>
        !(
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500
        ) && failureCount < 2,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

function ThemedApp() {
  const { palette, mode } = useTheme();
  useQueryCacheReset();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: palette.primary,
          colorLink: palette.primary,
          colorInfo: palette.primary,
          fontFamily: fontFamily.body,
          borderRadius: 12,
          colorBgContainer: palette.surface,
          colorBgLayout: palette.backgroundAlt,
          colorText: palette.text,
          colorBorder: palette.border,
          colorPrimaryBg: palette.primaryLight,
          controlOutline: 'rgba(232, 0, 111, 0.18)',
        },
        components: {
          Button: {
            primaryShadow: '0 6px 16px rgba(232, 0, 111, 0.28)',
            borderRadius: 10,
            fontWeight: 600,
          },
          Table: {
            headerBg: palette.primaryLight,
            headerColor: palette.primaryDark,
            rowHoverBg: palette.backgroundTint,
            borderColor: palette.border,
          },
          Menu: {
            itemSelectedBg: palette.primaryLight,
            itemSelectedColor: palette.primary,
            itemHoverBg: palette.backgroundTint,
          },
          Card: {
            borderRadiusLG: 16,
          },
          Tag: {
            defaultBg: palette.primaryLight,
            defaultColor: palette.primaryDark,
          },
          Modal: {
            borderRadiusLG: 20,
            headerBg: 'transparent',
            titleFontSize: 20,
            titleLineHeight: 1.3,
            paddingContentHorizontalLG: 28,
            paddingMD: 20,
          },
          Input: {
            borderRadius: 10,
            paddingBlock: 9,
            controlHeight: 42,
            activeBorderColor: palette.primary,
            hoverBorderColor: palette.primary,
          },
          InputNumber: {
            borderRadius: 10,
            controlHeight: 42,
          },
          Select: {
            borderRadius: 10,
            controlHeight: 42,
          },
        },
      }}
    >
      <AuthProvider>
        <BasketProvider>
          <AppRouter />
        </BasketProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
