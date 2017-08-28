export const required = isMandatory => value =>
    (isMandatory && value ? undefined : 'Obrigatório');

export const number = isNumber => value =>
    (isNumber && value && isNaN(Number(value)) ? 'Precisa ser um número' : undefined);

export const email = isEmail => value =>
    (isEmail && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Endereço de e-mail inválido'
        : undefined);

export const alphaNumeric = isAlphaNumeric => value =>
    (isAlphaNumeric && value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Apenas caracteres alfanumericos'
        : undefined);

export const maxLength = max => value =>
    (value && value.length > max ? `Precisa ter no máxiom ${max} caracteres` : undefined);

export const minLength = min => value =>
    (value && value.length < min ? `Precisa ter no minimo ${min} caracteres` : undefined);

export const minValue = min => value =>
    (value && value < min ? `O valor minimo é ${min}` : undefined);