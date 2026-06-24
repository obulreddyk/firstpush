import * as fs from 'fs';
import * as path from 'path';
import { FileUtil } from './FileUtil';
import { Logger } from './LoggerUtil';

// @ts-ignore
import { pdf } from 'pdf';

/**
 * PDF Utility class to handle creation of PDFs for test automation.
 */
export class PdfUtil {
  /**
   * Generates a PDF file containing the specified text content.
   * Useful for UI/API upload test scenarios.
   * @param filePath Target path for the generated PDF
   * @param textContent Text to write inside the PDF
   */
  public static async generatePdf(filePath: string, textContent: string): Promise<void> {
    try {
      const absolutePath = path.resolve(filePath);
      const dirName = path.dirname(absolutePath);
      FileUtil.ensureDirectory(dirName);

      const doc = new pdf();
      // Write the content text into the PDF document (coordinates: x=20, y=20)
      doc.text(20, 20, textContent);
      
      fs.writeFileSync(absolutePath, doc.output());
      Logger.info(`Successfully generated PDF file at: "${filePath}"`);
    } catch (error: any) {
      Logger.error(`Failed to generate PDF at "${filePath}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Extracts text from a PDF file.
   * NOTE: This is a stub placeholder. For advanced PDF reading/parsing assertions,
   * we recommend installing the 'pdf-parse' package:
   * Run: npm install pdf-parse @types/pdf-parse
   * 
   * @param filePath Path to the PDF file to read
   */
  public static async extractText(filePath: string): Promise<string> {
    try {
      const absolutePath = path.resolve(filePath);
      if (!FileUtil.exists(absolutePath)) {
        throw new Error(`PDF file does not exist at "${absolutePath}"`);
      }

      Logger.warn(
        `PDF text extraction requires additional dependencies (e.g., 'pdf-parse'). Returning a placeholder. ` +
        `To enable full PDF text validation, install 'pdf-parse' and update this method.`
      );
      
      // Basic buffer reading
      const buffer = fs.readFileSync(absolutePath);
      return buffer.toString('utf-8');
    } catch (error: any) {
      Logger.error(`Failed to read PDF text at "${filePath}": ${error.message}`);
      throw error;
    }
  }
}
