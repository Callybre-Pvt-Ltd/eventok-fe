export const ENV = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8100/api/v1',
  socketUrl:
    import.meta.env.VITE_SOCKET_URL ?? 'http://127.0.0.1:8100',
  requestTimeoutMs: 20_000,
} as const;
