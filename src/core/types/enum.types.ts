
export const enum HomeworkSubStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
export const HomeWorkSubStatusArr = ['PENDING', 'APPROVED', 'REJECTED']


export const enum PaidVia {
  PAYME = 'PAYME',
  CLICK = 'CLICK',
  CASH = 'CASH'
}
export const PaidViaArr = ['PAYME','CLICK','CASH']

enum Role {
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  ASSISTANT  = 'ASSISTANT',
  STUDENT = 'STUDENT'
}

enum Action {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

enum CourseLevel {
  BEGINNER = 'BEGINNER',
  PRE_INTERMEDIATE = 'PRE_INTERMEDIATE',
  INTERMEDIATE = 'INTERMEDIATE',
  UPPER_INTERMEDIATE = 'UPPER_INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}
export const CourseLevelArr = ['BEGINNER','ADVANCED','UPPER_INTERMEDIATE','INTERMEDIATE','PRE_INTERMEDIATE',]
enum ExamAnswer {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}