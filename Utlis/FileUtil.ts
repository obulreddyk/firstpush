import * as fs from 'fs';
import * as path from 'path';
import { Logger } from './LoggerUtil';

/**
 * File system utility class for managing files and directories in test automation.
 */
export class FileUtil {
  /**
   * Reads a JSON file and parses it.
   * @param filePath Absolute or relative path to the JSON file
   */
  public static readJson(filePath: string): any {
    try {
      const absolutePath = path.resolve(filePath);
      const data = fs.readFileSync(absolutePath, 'utf-8');
      return JSON.parse(data);
    } catch (error: any) {
      Logger.error(`Failed to read JSON file at "${filePath}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Writes data as a JSON file, creating directories if needed.
   * @param filePath Target file path
   * @param data Object or array to write
   */
  public static writeJson(filePath: string, data: any): void {
    try {
      const absolutePath = path.resolve(filePath);
      const dirName = path.dirname(absolutePath);
      this.ensureDirectory(dirName);
      
      fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
      Logger.info(`Successfully wrote JSON to "${filePath}"`);
    } catch (error: any) {
      Logger.error(`Failed to write JSON file at "${filePath}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Checks if a file or directory exists.
   * @param filePath Path to check
   */
  public static exists(filePath: string): boolean {
    return fs.existsSync(path.resolve(filePath));
  }

  /**
   * Deletes a file if it exists.
   * @param filePath Path to delete
   */
  public static deleteFile(filePath: string): void {
    try {
      const absolutePath = path.resolve(filePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        Logger.info(`Successfully deleted file: "${filePath}"`);
      } else {
        Logger.warn(`File does not exist, skipping deletion: "${filePath}"`);
      }
    } catch (error: any) {
      Logger.error(`Failed to delete file "${filePath}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Ensures that a directory exists, creating it recursively if not.
   * @param dirPath Directory path to ensure
   */
  public static ensureDirectory(dirPath: string): void {
    try {
      const absolutePath = path.resolve(dirPath);
      if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath, { recursive: true });
        Logger.info(`Created directory: "${dirPath}"`);
      }
    } catch (error: any) {
      Logger.error(`Failed to ensure directory "${dirPath}": ${error.message}`);
      throw error;
    }
  }
}
