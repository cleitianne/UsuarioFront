import {req} from './common';

export default (value, $t) => {
  let valid = req(value);
  if (!valid) {
    return {
      validated: false,
      error: 'O campo é obrigatório.',
    };
  }

  return {
    validated: true,
    error: '',
  };
};
