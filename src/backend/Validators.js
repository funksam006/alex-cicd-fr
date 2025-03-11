export const VALIDATE = {
    EMAIL:
      /^\s*[a-zA-Z0-9._%+\-\s]+@[a-zA-Z0-9.\-\s]+\.[a-zA-Z]{2,}\s*$/,
    ALPHABET_ONLY: /^[a-zA-Z \s]*$/,
    NUMBER: /[0-9]$/,
    MOBILE: /^[0-9]{1,20}$/,
    STREET: /^[a-zA-Z0-9 '-.~!@#$%^&*()_+={}[];':"<>,.\s]*$/,
    PASSWORD: /[d\-_\s]+$/,
  };
  
  export const makeErrors = (form) => {
    let count = 0
    let obj = {}
    for (const field in form) {
      if (Object.hasOwnProperty.call(form, field)) {
        obj[field] = [form[field]]
        if (count == Object.keys(form).length) {
          return obj
        } else {
          count++
        }
      }
    }
  }
  export const isValidForm = (form = {}) => {
    let valid = true;
    for (const field in form) {
      if (Object.hasOwnProperty.call(form, field)) {
        const error = form[field];
        valid = valid && !error;
      }
    }
    return valid;
  };
  
  export const validators = {
    checkAlphabet: (name, min, max, value) => {
      var min = min || 2;
      var max = max || 30;
      if (value) {
        if (!VALIDATE.ALPHABET_ONLY.test(value)) {
          // SimpleToast();
          return `${name} is Invalid.`;
        } else if (value.length < min || value.length > max) {
          // SimpleToast();
          return `${name} must be between ${min} to ${max} Characters.`;
        }
        return null;
      } else {
        // SimpleToast();
        return `${name} is required.`;
      }
    },
  
    checkEmail: (name, value) => {
      if (value) {
        if (!VALIDATE.EMAIL.test(value)) {
          return `${name} is invalid.`;
        } else {
          return null;
        }
      } else {
        return `${name} is required.`;
      }
      return null;
    },
  
    checkNumber: (name, value) => {
      if (value) {
        if (!VALIDATE.MOBILE.test(value)) {
          return `${name} is invalid.`;
        }
        return null;
      } else {
        return `${name} is required.`;
      }
    },
  
    checkPhoneNumberWithFixLength: (name, max, value) => {
      var max = max || 10;
      if (value) {
        if (!VALIDATE.MOBILE.test(value)) {
          return `${name} is Invalid.`;
        } else if (value.length != max) {
          return `${name} should be ${max} digits.`;
        }
        return null;
      } else {
        return `${name} is required.`;
      }
    },
  
    checkOptionalPhoneNumberWithFixLength: (name, max, value) => {
      var max = max || 10;
      if (value) {
        if (!VALIDATE.MOBILE.test(value)) {
          return `${name} is Invalid.`;
        } else if (value.length != max) {
          return `${name} should be ${max} digits.`;
        }
        return null;
      } else {
        return `${name} is required.`;
      }
    },
  
    checkPhoneNumber: (name, value, min, max) => {
      var min = min || 10;
      var max = max || 10;
      if (value) {
        if (!VALIDATE.MOBILE.test(value)) {
          // SimpleToast();
          return `${name} is Invalid.`;
        }
        else if (value.length < min || value.length > max) {
          // SimpleToast(`${name} should be greater than ${min - 1} digits.`);
          return `${name} should be ${min} digits.`;
          // return `${name} should be greater than ${min - 1} digits.`;
        }
        return null;
      } else {
        // SimpleToast();
        return `${name} is required.`;
      }
    },
  
    checkNotNull: (name, min, max, value) => {
      var min = min || 5;
      var max = max || 40;
      if (value) {
        if (value.length < min || value.length > max) {
          return `${name} must be between ${min} to ${max} Characters.`;
        }
        return null;
      } else {
        return `${name} is required.`;
      }
    },
  
    checkRequire: (name, value) => {
      if (value) {
        return null;
      } else {
        return `${name} is required.`;
      }
    },
    checkMultiple: (name, value) => {
      if (value?.length > 0) {
        return null;
      } else {
        return `${name} is required.`;
      }
      // if (value) {
      //     return null;
      // } else {
      //     return `Please enter ${name}`;
      // }
    },
  
    checkPassword: (name, value, min = 8, max = 15) => {
      if (value) {
        if (VALIDATE.PASSWORD.test(value)) {
          return `${name} is invalid.`;
        }
        else if (value.length < min || value.length > max) {
          return `${name} entered must be between ${min} to ${max} Characters.`;
        }
        return null;
      } else {
        return `${name} is required.`;
      }
    },
  
    checkMatch: (name, value, name2, value2) => {
      // var min = min || 5;
      // var max = max || 40;
      if (value && value2) {
        if (value === value2) {
          return null
        } else {
          // SimpleToast(`${name} and ${name2} should be same.`);
          return `${name} and ${name2} should be same.`;
        }
      } else {
        return `${name} is required.`;
      }
    },
  
    checkStreet: (name, min, max, value) => {
      var min = min || 7;
      var max = max || 15;
      if (value) {
        if (VALIDATE.STREET.test(value)) {
          return `${name} is Invalid.`;
        } else if (value.length < min || value.length > max) {
          return `${name} entered must be between ${min} to ${max} Characters.`;
        }
        return null;
      } else {
        return `${name} is required.`;
      }
    },
  };
  