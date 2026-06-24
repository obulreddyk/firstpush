import * as XLSX from 'xlsx';
import * as path from 'path';
import { Logger } from './LoggerUtil';
import { FileUtil } from './FileUtil';

/**
 * Excel Utility class to read, write, and manipulate Excel files using 'xlsx' library.
 */
export class ExcelUtil {
  /**
   * Reads an Excel sheet and returns parsed data as an array of objects.
   * @param filePath Absolute or relative path to the Excel file
   * @param sheetName Optional name of the sheet to read (defaults to the first sheet)
   */
  public static readExcel(filePath: string, sheetName?: string): any[] {
    try {
      const absolutePath = path.resolve(filePath);
      if (!FileUtil.exists(absolutePath)) {
        throw new Error(`Excel file does not exist at "${absolutePath}"`);
      }

      const workbook = XLSX.readFile(absolutePath);
      const targetSheetName = sheetName || workbook.SheetNames[0];
      const worksheet = workbook.Sheets[targetSheetName];
      
      if (!worksheet) {
        throw new Error(`Sheet name "${targetSheetName}" not found in Excel file.`);
      }

      const data = XLSX.utils.sheet_to_json(worksheet);
      Logger.info(`Successfully read Excel sheet "${targetSheetName}" from "${filePath}" (${data.length} rows)`);
      return data;
    } catch (error: any) {
      Logger.error(`Failed to read Excel file at "${filePath}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Writes an array of objects to an Excel sheet. Creates directories if necessary.
   * @param filePath Target path for the Excel file
   * @param data Array of objects to write to the sheet
   * @param sheetName Optional sheet name (defaults to 'Sheet1')
   */
  public static writeExcel(filePath: string, data: any[], sheetName: string = 'Sheet1'): void {
    try {
      const absolutePath = path.resolve(filePath);
      const dirName = path.dirname(absolutePath);
      FileUtil.ensureDirectory(dirName);

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      XLSX.writeFile(workbook, absolutePath);
      Logger.info(`Successfully wrote Excel file to "${filePath}" under sheet "${sheetName}"`);
    } catch (error: any) {
      Logger.error(`Failed to write Excel file at "${filePath}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Gets a specific cell value based on 0-indexed row and col numbers.
   * @param filePath Path to the Excel file
   * @param sheetName Name of the sheet to query
   * @param row Row number (0-indexed)
   * @param col Col number (0-indexed)
   */
  public static getCellValue(filePath: string, sheetName: string, row: number, col: number): any {
    try {
      const absolutePath = path.resolve(filePath);
      if (!FileUtil.exists(absolutePath)) {
        throw new Error(`Excel file does not exist at "${absolutePath}"`);
      }

      const workbook = XLSX.readFile(absolutePath);
      const worksheet = workbook.Sheets[sheetName];

      if (!worksheet) {
        throw new Error(`Sheet name "${sheetName}" not found in Excel file.`);
      }

      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = worksheet[cellAddress];
      return cell ? cell.v : undefined;
    } catch (error: any) {
      Logger.error(`Failed to read cell (${row}, ${col}) from sheet "${sheetName}" in "${filePath}": ${error.message}`);
      throw error;
    }
  }
}
