const configuredMeasurementId = (import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '').trim();

export const gaMeasurementId = /^G-[A-Z0-9]+$/i.test(configuredMeasurementId)
  ? configuredMeasurementId
  : null;

export const analyticsEnabled = import.meta.env.PROD && gaMeasurementId !== null;
