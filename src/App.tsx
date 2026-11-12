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
          controlOutline:
            mode === 'dark'
              ? 'rgba(249, 115, 22, 0.25)'
              : 'rgba(234, 88, 12, 0.18)',
        },
        components: {
          Button: {
            primaryShadow:
              mode === 'dark'
                ? '0 4px 12px rgba(249, 115, 22, 0.25)'
                : '0 4px 12px rgba(234, 88, 12, 0.22)',
            borderRadius: 8,
            fontWeight: 700,
          },
          Table: {
            headerBg: palette.primaryLight,
            headerColor: mode === 'dark' ? '#FFFFFF' : palette.primaryDark,
            rowHoverBg: palette.backgroundTint,
            borderColor: palette.border,
            colorBgContainer: palette.surface,
          },
          Menu: {
            itemSelectedBg: palette.primaryLight,
            itemSelectedColor: palette.primary,
            itemHoverBg: palette.backgroundTint,
            colorBgContainer: palette.surface,
          },
          Card: {
            borderRadiusLG: 16,
            colorBgContainer: palette.surface,
            colorBorderSecondary: palette.border,
          },
          Tag: {
            defaultBg: palette.primaryLight,
            defaultColor: mode === 'dark' ? '#FDBA74' : palette.primaryDark,
          },
          Modal: {
            borderRadiusLG: 20,
            contentBg: palette.surface,
            headerBg: palette.surface,
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
            colorBgContainer: palette.surface,
            colorText: palette.text,
            colorBorder: palette.border,
          },
          InputNumber: {
            borderRadius: 10,
            controlHeight: 42,
            colorBgContainer: palette.surface,
            colorText: palette.text,
            colorBorder: palette.border,
          },
          DatePicker: {
            borderRadius: 10,
            controlHeight: 42,
            colorBgContainer: palette.surface,
            colorBgElevated: palette.surfaceElevated,
            colorText: palette.text,
            colorTextPlaceholder: palette.textMuted,
            colorBorder: palette.border,
            activeBorderColor: palette.primary,
            hoverBorderColor: palette.primary,
            cellActiveWithRangeBg: palette.primaryLight,
            cellHoverWithRangeBg: palette.backgroundTint,
          },
          Select: {
            borderRadius: 10,
            controlHeight: 42,
            colorBgContainer: palette.surface,
            colorText: palette.text,
            colorBorder: palette.border,
            optionSelectedBg: palette.primaryLight,
            optionActiveBg: palette.backgroundTint,
          },
          Dropdown: {
            colorBgElevated: palette.surface,
            colorText: palette.text,
          },
          Popover: {
            colorBgElevated: palette.surface,
            colorText: palette.text,
          },
          Tooltip: {
            colorBgSpotlight: mode === 'dark' ? '#241444' : '#1A1028',
            colorTextLightSolid: '#FFFFFF',
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

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
