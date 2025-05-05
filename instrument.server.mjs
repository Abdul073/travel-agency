import * as Sentry from "@sentry/react-router";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://1598c853409240a0588d9ac6383ea76f@o4507564671500288.ingest.us.sentry.io/4509218510733312",

  // Basic Configuration
  environment: process.env.NODE_ENV || "development",
  release: process.env.APP_VERSION || "1.0.0",

  // Performance Monitoring
  tracesSampleRate: 1.0, // Adjust in production (e.g., 0.1 for 10% sampling)
  profilesSampleRate: 1.0, // Adjust in production

  // Integrations
  integrations: [
    nodeProfilingIntegration(),
    // Add other integrations as needed
  ],

  // Privacy Configuration
  sendDefaultPii: true, // Only enable if compliant with privacy laws
  attachStacktrace: true,

  // Debugging (disable in production)
  debug: process.env.NODE_ENV === "development",

  // Filter out health check noise
  ignoreTransactions: ["/health"],
  denyUrls: [
    /\/health/,
    // Add other routes to ignore
  ],
});

// Optional: Global error handler
process.on("unhandledRejection", (error) => {
  Sentry.captureException(error);
});

process.on("uncaughtException", (error) => {
  Sentry.captureException(error);
});

// Export for potential manual instrumentation
export { Sentry };
