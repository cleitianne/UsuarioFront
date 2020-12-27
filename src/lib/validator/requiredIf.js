import {req} from './common';

export default (value, prop, $t) => {
  let valid = value === prop ? req(value) : false;
  if (!valid) {
    return {
      validated: false,
      error: 'Os campos não conferem.',
    };
  }

  return {
    validated: true,
    error: '',
  };
};
