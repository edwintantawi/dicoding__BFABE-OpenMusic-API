const fs = require('fs');

class StorageService {
  constructor(folderPath) {
    this._folderPath = folderPath;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = `${+new Date()}-${meta.filename}`;
    const path = `${this._folderPath}/${filename}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = { StorageService };
