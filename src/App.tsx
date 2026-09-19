import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme as antTheme } from 'antd';
import { AuthProvider } from '@/hooks/auth/use-auth';
import { BasketProvider } from '@/hooks/storefront/use-basket';
import { ThemeProvider, useTheme, fontFamily } from '@/theme';
import { AppRouter } from '@/routes/AppRouter';
import '@/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function ThemedApp() {
  const { palette, mode } = useTheme();

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
