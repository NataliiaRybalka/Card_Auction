// const fs = require('fs');
// const path = require('path');
// const uuid = require('uuid').v1;
// const { promisify } = require('util');
import fs from 'fs';
import path from 'path';
import { v1 } from 'uuid';

// const mkdirPromise = promisify(fs.mkdir);

export const createPhotoPath = async (filename, id) => {
  const pathWithoutStatic = path.join('cards', id.toString());
  const uploadPath = path.join(process.cwd(), 'static', pathWithoutStatic);
  const fileExtension = filename.split('.').pop();
  const photoName = `${v1()}.${fileExtension}`;
  const finalPath = path.join(uploadPath, photoName);
  const photoPath = path.join(pathWithoutStatic, photoName);
  
  await fs.mkdir(uploadPath, { recursive: true });
  
  return {
    finalPath,
    photoPath
  }
};
