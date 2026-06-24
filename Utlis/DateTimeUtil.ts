/**
 * Utility helper class for date and time parsing, formatting, and arithmetic operations.
 */
export class DateTimeUtil {
  /**
   * Returns current timestamp in standard ISO-like format: YYYY-MM-DD_HH-mm-ss
   */
  public static getCurrentTimestamp(): string {
    const now = new Date();
    return now.toISOString()
      .replace(/T/, '_')
      .replace(/\..+/, '')
      .replace(/:/g, '-');
  }

  /**
   * Formats a Javascript Date object to custom string formats.
   * Supports: 'YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY/MM/DD', 'MM/DD/YYYY', 'YYYY-MM-DD HH:mm:ss'
   * @param date Date object to format
   * @param format Desired output format style
   */
  public static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');

    return format
      .replace('YYYY', yyyy)
      .replace('MM', mm)
      .replace('DD', dd)
      .replace('HH', hh)
      .replace('mm', min)
      .replace('ss', ss);
  }

  /**
   * Returns a new Date object representing a specified number of days in the future.
   * @param days Number of days to add
   */
  public static getFutureDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  /**
   * Returns a new Date object representing a specified number of days in the past.
   * @param days Number of days to subtract
   */
  public static getPastDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  /**
   * Checks if a date string is valid.
   * @param dateStr Date string to check
   */
  public static isValidDate(dateStr: string): boolean {
    const timestamp = Date.parse(dateStr);
    return !isNaN(timestamp);
  }
}
