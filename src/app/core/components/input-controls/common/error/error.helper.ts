import { AbstractControl } from '@angular/forms';

export const getDefaultError = (control: AbstractControl) => {
  const getErrorArguments = (name: string, parameter: string = name) => {
    if (!control || !control.hasError(name)) {
      return null;
    } else {
      return control.getError(name)[parameter];
    }
  };
  //$localize`:@@error_RequiredField:Обязательно к заполнению`;

  const defaultErrors = new Map<string, Function>([
    ['required', () => 'Field is'],
    // ['requiredradio', () => translatePipe.transform('core_have-to-check-one-option')],
    // ['email', () => translatePipe.transform('common_invalid-e-mail-format')],
    // ['min', () => translatePipe.transform('common_there-must-be-more-than', { value: getErrorArguments('min') })],
    // ['max', () => translatePipe.transform('common_should-be-less-than', { value: getErrorArguments('max') })],
    // [
    // 	'minOrEqual',
    // 	() => translatePipe.transform('common_minimum-value', { value: getErrorArguments('minOrEqual', 'value') }),
    // ],
    // [
    // 	'minlength',
    // 	() =>
    // 		translatePipe.transform('common_minimum-character-required', {
    // 			value: getErrorArguments('minlength', 'requiredLength'),
    // 		}),
    // ],
    // [
    // 	'maxlength',
    // 	() =>
    // 		translatePipe.transform('common_maximum-characters-required', {
    // 			value: getErrorArguments('maxlength', 'requiredLength'),
    // 		}),
    // ],
    // [
    // 	'onlydecimalMaxLength',
    // 	() =>
    // 		translatePipe.transform('core_manissa-erorr', {
    // 			value: getErrorArguments('onlydecimalMaxLength', 'maxMantissaLength'),
    // 		}),
    // ],
    // ['onlynumbers', () => translatePipe.transform('core_only-numbers-allowed')],
    // ['onlyinteger', () => translatePipe.transform('core_only-numbers-allowed')],
    // ['onlydecimal', () => translatePipe.transform('core_only-decimal-numbers-allowed')],
    // ['confirmpassword', () => translatePipe.transform('common_password-does-not-match')],
    // ['unique', () => translatePipe.transform('common_not-unique')],
    // ['customError', () => `${getErrorArguments('customError')}`],
    // ['notEnoughItems', () => `Not enough on selected location`],
    // ['availability', () => `${getErrorArguments('availability')} items not available`],
    // ['creditCard', (msg) => `${getErrorArguments('creditCard', 'value')}`],
    // ['creditCard', msg => `${msg['value']}`],
    // [
    // 	'numHigherThan',
    // 	() => translatePipe.transform('core_must-be-more-than', { value: getErrorArguments('numHigherThan') }),
    // ],
    // [
    // 	'cannotBeEqual',
    // 	() => translatePipe.transform('core_cannot-be-equal', { value: getErrorArguments('cannotBeEqual', 'value') }),
    // ],
    // [
    // 	'cannotBeEqualOrLess',
    // 	() =>
    // 		translatePipe.transform('core_cannot-be-equal-to-or-less-than', {
    // 			value: getErrorArguments('cannotBeEqualOrLess', 'value'),
    // 		}),
    // ],
    // [
    // 	'cannotBeEqualOrGreater',
    // 	() =>
    // 		translatePipe.transform('core_cannot-be-greater-than-or-equal', {
    // 			value: getErrorArguments('cannotBeEqualOrGreater', 'value'),
    // 		}),
    // ],
    // [
    // 	'forbiddenSymbol',
    // 	() =>
    // 		translatePipe.transform('core_character-is-not-allowed', {
    // 			value: getErrorArguments('forbiddenSymbol', 'symbol'),
    // 		}),
    // ],
    //must have at least one lowercase ('a'-'z').;
    // ['requiresLower', () => translatePipe.transform('core_must-have-at-least-one-lowercase-letter')],
    //must have at least one uppercase ('A'-'Z').
    // ['requiresUpper', () => translatePipe.transform('core_must-have-at-least-one-capital-letter')],
    //must have at least one digit ('0'-'9')
    // ['requiresDigit', () => translatePipe.transform('core_must-be-at-least-one-digit')],
  ]);

  let errorMessage = null;
  for (let i = 0; i < defaultErrors.size; i++) {
    const errorName = [...defaultErrors.keys()][i];
    // if (control.hasError(errorName) && defaultErrors.has(errorName)) {
    // 	errorMessage =
    // 		errorName === 'onlydecimalMaxLength'
    // 			? defaultErrors.get(errorName)(control.getError('onlydecimalMaxLength'))
    // 			: defaultErrors.get(errorName)();

    // 	break;
    // }

    // if (control.hasError(errorName) && defaultErrors.has(errorName)) {
    // 	errorMessage =
    // 		errorName === 'availability'
    // 			? defaultErrors.get(errorName)(control.getError('availability'))
    // 			: defaultErrors.get(errorName)();

    // 	break;
    // }

    // if (control.hasError(errorName) && defaultErrors.has(errorName)) {
    // 	errorMessage =
    // 		errorName === 'customError'
    // 			? defaultErrors.get(errorName)(control.getError('customError'))
    // 			: defaultErrors.get(errorName)();

    // 	break;
    // }

    // if (control.hasError(errorName) && defaultErrors.has(errorName)) {
    // 	errorMessage =
    // 		errorName === 'numHigherThan'
    // 			? defaultErrors.get(errorName)(control.getError('numHigherThan'))
    // 			: defaultErrors.get(errorName)();

    // 	break;
    // }

    // if (control.hasError(errorName) && defaultErrors.has(errorName)) {
    // 	errorMessage =
    // 		errorName !== 'creditCard'
    // 			? defaultErrors.get(errorName)()
    // 			: defaultErrors.get(errorName)(control.getError('creditCard'));
    // 	// this.checkOverflowMessage();
    // 	break;
    // }
  }
  return errorMessage;
};
