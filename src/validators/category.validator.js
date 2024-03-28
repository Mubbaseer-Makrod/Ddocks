import { checkSchema } from "express-validator";

const categoryValidator = {
    name: {
        errorMessage: 'Invalid name',
        notEmpty: true,
      }
};


export { categoryValidator }