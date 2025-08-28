// import { UnsupportedMediaTypeException } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const courseFileFields = [
//   { name: 'banner', maxCount: 1 },
//   { name: 'introVideo', maxCount: 1 },
// ];

// // Cloud storage konfiguratsiya
// export const fileStorages = (allowedMimes: string[]) => ({
//   storage: new CloudinaryStorage({
//     cloudinary,
//     params: async (req, file) => {
//       const mime = file.mimetype.split('/')[0];

//       // field bo‘yicha filter
//       if (file.fieldname === 'banner' && mime !== 'image') {
//         throw new UnsupportedMediaTypeException("banner type image bo'lishi kerak");
//       }
//       if (file.fieldname === 'introVideo' && mime !== 'video') {
//         throw new UnsupportedMediaTypeException("introVideo type video bo'lishi kerak");
//       }
//       if (!allowedMimes.includes(mime)) {
//         throw new UnsupportedMediaTypeException(
//           `Fayl turi [${allowedMimes.join(', ')}] bo'lishi kerak`,
//         );
//       }
//       console.log(file.filename,file.path)

//       return {
//         folder: 'courses',
//         resource_type: mime === 'video' ? 'video' : 'image',
//         public_id: `${Date.now()}-${file.originalname}`,
//       };
//     },
//   }),
// });




import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { UnsupportedMediaTypeException } from '@nestjs/common';
import { getPathInFileType } from './generator.types';

export const courseFileFields = [
  { name: 'banner', maxCount: 1 },
  { name: 'introVideo', maxCount: 1 },
]

export const fileStorages = (allowedMimes: string[]) => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const filePath = getPathInFileType(file.originalname);
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: fileFilters(allowedMimes),
});

function fileFilters(allowedMimes: string[]) {
  return (req, file, cb) => {
    const mime = file.mimetype.split('/')[0];
    if(file.fieldname && file.fieldname === 'banner'){
      if(mime !== "image"){
        cb(
          new UnsupportedMediaTypeException("banner type image bo'lishi kerak"),
          false
        )
      }
    }
    if(file.fieldname && file.fieldname === 'introVideo'){
      if(mime !== "video"){
        cb(
          new UnsupportedMediaTypeException("introVideo type video bo'lishi kerak"),
          false
        )
      }
    }
    if (!allowedMimes.includes(mime)) {
      cb(
        new UnsupportedMediaTypeException(
          `Fayl turi [${allowedMimes.join(', ')}] bo'lishi kerak`
        ),
        false,
      );
    } else {
      cb(null, true);
    }
  };
}

