/**
 * String generator utility class for creating test data dynamically during test runs.
 */
export class StringUtil {
  /**
   * Generates a random alphanumeric string of a given length.
   * @param length Length of the string
   */
  public static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random email address using a random name or a custom prefix.
   * @param prefix Optional custom email prefix
   */
  public static generateRandomEmail(prefix?: string): string {
    const defaultPrefix = prefix || `testuser_${this.generateRandomString(6).toLowerCase()}`;
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'neokred.tech'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${defaultPrefix}@${randomDomain}`;
  }

  /**
   * Generates a random numeric string of a given length.
   * @param length Length of the numeric string
   */
  public static generateRandomNumberString(length: number): string {
    const digits = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
  }

  /**
   * Generates a strong random password containing uppercase, lowercase, numbers, and special characters.
   * @param length Length of the password (defaults to 12)
   */
  public static generateRandomPassword(length: number = 12): string {
    if (length < 4) {
      length = 4; // Ensure minimum length to accommodate all character classes
    }
    
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    // Ensure at least one character from each class
    let password = '';
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += specials.charAt(Math.floor(Math.random() * specials.length));
    
    const allChars = lowercase + uppercase + numbers + specials;
    for (let i = 4; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Shuffle the password to make it random
    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }
}
