import fs from 'fs';
import path from 'path';
import { v1 } from 'uuid';
import { promisify } from 'util';

const mkdirPromise = promisify(fs.mkdir);

export const createPhotoPath = async (filename, id, folderName) => {
  const pathWithoutStatic = path.join(folderName, id.toString());
  const uploadPath = path.join(process.cwd(), 'static', pathWithoutStatic);
  const fileExtension = filename.split('.').pop();
  const photoName = `${v1()}.${fileExtension}`;
  const finalPath = path.join(uploadPath, photoName);
  const photoPath = path.join(pathWithoutStatic, photoName);

await mkdirPromise(uploadPath, { recursive: true });
  
  return {
    finalPath,
    photoPath
  }
};
