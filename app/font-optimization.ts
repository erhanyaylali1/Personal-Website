// Font optimization for performance
// This prevents layout shift by using system fonts with fallbacks

export const fontOptimization = {
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
  fontDisplay: 'swap' as const,
};
