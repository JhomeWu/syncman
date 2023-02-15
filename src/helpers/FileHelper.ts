import fs from 'fs';

class FileHelper {
  public static mkdir(path: string): string {
    const cleanPath = path.replace(/[~#%&*{}\\:<>? +|]/g, '_');
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
