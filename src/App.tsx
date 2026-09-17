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
          fontFamily: fontFamily.body,
          borderRadius: 4,
          colorBgContainer: palette.surface,
          colorBgLayout: palette.background,
          colorText: palette.text,
          colorBorder: palette.border,
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
