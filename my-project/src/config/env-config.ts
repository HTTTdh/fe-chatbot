interface EnvConfig {
  apiBaseUrl: string;
  wsBaseUrl: string;
  nodeEnv: string;
}

export const envConfig: EnvConfig = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL || "https://chatbot1022be.hasontech.com",
  wsBaseUrl:
    import.meta.env.VITE_WS_BASE_URL || "wss://chatbot1022be.hasontech.com",
  nodeEnv: import.meta.env.VITE_NODE_ENV || "development",
};
