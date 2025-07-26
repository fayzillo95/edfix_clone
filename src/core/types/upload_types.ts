import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { UnsupportedMediaTypeException } from '@nestjs/common';

export const userImageStorage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = join(process.cwd(), "src", "core", "uploads", "user_images");

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);

    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },

  }),
  fileFilter(req, file, callback) {
    const extract = extname(file.originalname)
    console.log(file.mimetype)
    if (!file.mimetype.includes("image")) {
      callback(new UnsupportedMediaTypeException("File type image bo'lishi kerak"), false)
    } else {
      callback(null, true)
    }
  },
};

export const courseFileFields = [
      { name: 'banner', maxCount: 1 },
      { name: 'introVideo', maxCount: 1 },
    ]
export const courseStorage =  {
      storage: diskStorage({
        destination: (req,file,cb) =>{
          if(file.fieldname === 'banner'){
            cb(null,join(process.cwd(), "src", "core", "uploads", "banners"))
          }else if(file.fieldname === "introVideo"){
            cb(null,join(process.cwd(), "src", "core", "uploads", "intro_videos"))
          }
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }

export const userApiBody = {
  schema: {
    type: 'object',
    properties: {
      fullName: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};


export const courseApiBody = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      about: { type: 'string' },
      price: { type: 'number' },
      categoryId: { type: 'string' },
      mentorId: { type: 'string' },
      published: { type: 'boolean' },
      level : {
        type : "string",
        enum : ['BEGINNER','ADVANCED','UPPER_INTERMEDIATE','INTERMEDIATE','PRE_INTERMEDIATE',]
      },
      banner: {
        type: 'string',
        format: 'binary',
      },
      introVideo: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};


export const lessoVideoStorage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = join(process.cwd(), "src", "core", "uploads", "lesson-videos");

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);

    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },

  }),
  fileFilter(req, file, callback) {
    const extract = extname(file.originalname)
    console.log(file.mimetype)
    if (!file.mimetype.includes("video")) {
      callback(new UnsupportedMediaTypeException("File type image bo'lishi kerak"), false)
    } else {
      callback(null, true)
    }
  },
};

export const lessonFileStorage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = join(process.cwd(), "src", "core", "uploads", "lesson-files");

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);

    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },

  }),
  fileFilter(req, file, callback) {
    const extract = extname(file.originalname)
    console.log(file.mimetype)
    if (!file.mimetype.includes("video")) {
      callback(new UnsupportedMediaTypeException("File type image bo'lishi kerak"), false)
    } else {
      callback(null, true)
    }
  },
};

export const lessonApiBody = {
    schema: {
      type: 'object',
      properties: {
        name          : {type :"string"},
        about         : {type :"string"},
        lessonModulId : {type :"string"},
        video  : {
          type : 'string',
          format : "binary"
        }
      }
    }
  }

export const lessonFileApiBody = {
    schema : {
      type : "object",
      properties : {
        note : {},
        lessonId : {},
        file : {
          type : "string",
          format : "binary"
        }
      }
    }
  }

// @ApiBody({
//   schema: {
//     type: 'object',
//     properties: {
//       name: { type: 'string' },
//       about: { type: 'string' },
//       price: { type: 'number' },
//       categoryId: { type: 'string' },
//       mentorId: { type: 'string' },
//       published: { type: 'boolean' },
//       banner: {
//         type: 'string',
//         format: 'binary',
//       },
//       introVideo: {
//         type: 'string',
//         format: 'binary',
//       },
//     },
//   },
// })
