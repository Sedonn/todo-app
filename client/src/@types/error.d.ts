/** Known error codes that occur during task data operations. */
type TTaskErrorCode =
  | 'TASK_NOT_FOUND'
  | 'TASK_GET_FAILED'
  | 'TASK_CREATE_FAILED'
  | 'TASK_UPDATE_FAILED'
  | 'TASK_DELETE_FAILED';

/** Known error codes that occur during user data operations. */
type TUserErrorCode =
  | 'DUPLICATE_LOGIN'
  | 'REGISTER_FAILED'
  | 'AUTHORIZATION_FAILED';

/** All known error codes. */
type TAPIErrorCode =
  | TTaskErrorCode
  | TUserErrorCode
  | 'UNKNOWN_ERROR'
  | 'UNKNOWN_NETWORK_ERROR';

type ErrorResponse = { error: TAPIErrorCode };
