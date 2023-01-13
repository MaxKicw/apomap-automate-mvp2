import * as Sentry from "@sentry/nextjs";

export const errorLogger = (
  errorMessage: string,
  errorObject: any
) =>
  Sentry.captureException(new Error(errorMessage), {tags:{error: errorObject}});
