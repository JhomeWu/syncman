import fs from 'fs';

class FileHelper {
  // convert str to acceptable file name or path
  public static norm(str: string): string {
    return str.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
  }

  public static mkdir(path: string): string {
    const cleanPath = path
      .split('/')
      .map((dirFile) => FileHelper.norm(dirFile))
      .join('/');
    if (!fs.existsSync(cleanPath)) {
      fs.mkdirSync(cleanPath, { recursive: true });
    }
    return cleanPath;
  }

  public static writeJson(path: string, json: object): void {
    fs.writeFileSync(path, JSON.stringify(json, null, 2));
  }
}

export default FileHelper;
