export const ErrorDictionary = {
  General: {
    E1500: {
      cause: 'E1500 - Internal error',
      message: 'Internal server error, need to handle unexpected error',
    },
  },
  Auth: {
    A1000: {
      cause: 'A1000 - Incorrect credentials',
      message: 'Check the username and password',
    },
  },
  User: {
    U0001: {
      cause: 'U0001 - Incorrect data',
      message: 'Verify the data and try again',
    },
    U0002: {
      cause: 'U0002 - Username unavailable',
      message: 'Change you username',
    },
    U0003: {
      cause: 'U0003 - User not exists',
      message: 'user with that username does not exist',
    },
  },
};
