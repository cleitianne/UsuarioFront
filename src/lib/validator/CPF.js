class CPF {
  get numbers() {
    return this.value.slice(0, 9);
  }

  get checkers() {
    return this.value.slice(9, 11);
  }

  __calculateWeight() {
    return (a, b, c) => a * (c.length + 1 - b);
  }

  __addAll() {
    return (sum, val) => (sum === null ? val : sum + val);
  }

  constructor(cpf) {
    this.value = CPF.onlyNumbers(cpf)
      .split('')
      .map(v => parseInt(v));
  }

  lengthIsValid() {
    return this.value.length === 11;
  }

  numbersAreNotSame() {
    return !this.value
      .map(v => v.toString())
      .reduce((a, b) => (a === b ? a : NaN));
  }

  calcCheckerOne() {
    if (this.numbers.length !== 9) {
      return false;
    }

    const numbers = this.numbers;

    const sum = numbers.map(this.__calculateWeight()).reduce(this.__addAll());

    const quotient = sum / 11;
    const rest = sum % 11;

    return rest < 2 ? 0 : 11 - rest;
  }

  calcCheckerTwo(checkerOne) {
    if (this.numbers.length !== 9) {
      return false;
    }

    const cpf = this.numbers.concat([checkerOne]);

    const sum = cpf.map(this.__calculateWeight()).reduce(this.__addAll());

    const rest = sum % 11;

    return rest < 2 ? 0 : 11 - rest;
  }

  isValid() {
    if (!this.lengthIsValid() || !this.numbersAreNotSame()) {
      return false;
    }

    const checkerOne = this.calcCheckerOne();

    if (checkerOne !== this.checkers[0]) {
      return false;
    }

    const checkerTwo = this.calcCheckerTwo(checkerOne);

    return checkerTwo === this.checkers[1];
  }

  format() {
    return this.value
      .join('')
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  static onlyNumbers(cpf) {
    return cpf.replace(/\D/g, '');
  }

  getWithCalculedCheckers() {
    const checkerOne = this.calcCheckerOne();
    const checkerTwo = this.calcCheckerTwo(checkerOne);

    return checkerOne !== false && checkerTwo !== false
      ? new CPF(this.numbers.join('') + [checkerOne, checkerTwo].join(''))
      : this;
  }
}

export default (value, $t) => {
  let valid = new CPF(value).isValid();
  if (!valid) {
    return {
      validated: false,
      error: 'O CPF é inválido.',
    };
  }

  return {
    validated: true,
    error: '',
  };
};
