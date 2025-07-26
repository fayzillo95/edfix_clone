import { CourseLevelArr, HomeWorkSubStatusArr } from "./enum.types";

export const lessonApiBody = {
  schema: {
    type: 'object',
    properties: {
      name: { type: "string" },
      about: { type: "string" },
      lessonModulId: { type: "string" },
      video: {
        type: 'string',
        format: "binary"
      }
    }
  }
}

export const lessonFileApiBody = {
  schema: {
    type: "object",
    properties: {
      note: {type : "string"},
      lessonId: {type : "string"},
      file: {
        type: "string",
        format: "binary"
      }
    }
  }
}

export const homeworkFIleApiBody = {
  schema: {
    type: 'object',
    properties: {
      task: { type: 'string' },
      lessonId: { type: 'string' },
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
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
      level: {
        type: "string",
        enum: CourseLevelArr
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

export const homeworkSubmissionFileApiBody = {
  schema: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      reason: { type: "string" },
      status: { enum: HomeWorkSubStatusArr},
      lessonId: { type: 'string' },
      homeworkId: { type: "string" },
      userId: { type: "string" },
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
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
