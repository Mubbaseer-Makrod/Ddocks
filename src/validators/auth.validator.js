import { checkSchema } from "express-validator";

const signUpValidator = {
    name: {
        errorMessage: 'Invalid name',
        notEmpty: true,
      },
      lastname: {
        errorMessage: 'Invalid name',
        notEmpty: true,
      },
      email: {
        errorMessage: 'Invalid email',
        isEmail: true,
        notEmpty: true,
      },
      password: {
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password should be at least 8 chars',
        },
      }
};


export { signUpValidator }