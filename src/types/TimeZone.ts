/**
 * An IANA time zone name such as "Asia/Tehran", "UTC", or "Europe/Istanbul".
 * The listed names are editor suggestions; any zone the runtime's Intl data
 * supports is accepted.
 */
type TimeZone = "Asia/Tehran" | "UTC" | "America/New_York" | (string & {});

export default TimeZone;
