`use strict`
/**
 * @file A collection of utilities in ECMAScript
 * @copyright Josélio de S. C. Júnior 2021
 * @license AGPL-3.0-or-later
 * Online tool used: <https://regexr.com/>
 */

/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @warning ⚠ This function have some features that are not supported by Safari browsers!
 * @requires <input type="text" ... >
 * @description Makes a type text HTMLInputElement to work similar as a type number HTMLInputElement and allows
 * to set the maximum range of digits of an integer or of a decimal number.
 * 
 * @param {HTMLInputElement} input The input element where this function will be working on.
 * @param {Number?} integerMaxLength Number that specifies the maximum length of the integer range. 
 * When setted as null, the maximum length will be set as 1 by default.
 * @param {String?} numberType String that specifies if it is a decimal, a signed decimal or a signed number.
 * 
 * When setted as 'digit' - allows just numbers;
 * 
 * When setted as 'signed' - allows negative number;
 * 
 * When setted as 'decimal' - allows decimal number;
 * 
 * When setted as 'decimal|signed' or vice-versa - allows negative decimal number.
 * 
 * When it is null - it will be assumed as integer number.
 * @param {Number?} decimalMaxLength Number that specifies the maximum number of digits of the decimal range.
 * When it is null, but decimal is true, the maximum number of digits of decimal range will be set as 2 by default.
 */
export function numberInput(input, integerMaxLength, numberType, decimalMaxLength) {

    input.addEventListener('input', ()=> {

        const value = input.value;

        // Allow only digits, dot sign and minus sign.
        const ndmp = /[^0-9.-]|(?<=\d+\.\d+)\.|(?<!\d+)\.|\.(?=\-)|(?<=.)\-/g;
        if (value.match(ndmp))
        return input.value = value.replace(ndmp, '');

        // If it is not a 'digit' number type, allow '0' to be typed just once before a dot sign.
        const zp = /(?<![0-9]|\.)0+(?=0)|(?<!\..*?)0(?=[1-9])(?!\.)/g;
        if ((numberType == null || !numberType.match(/digit/)) && value.match(zp))
        return input.value = value.replace(zp, '');

        // Integer range.
        const inr = integerMaxLength == null ? 1 : integerMaxLength;
        
        // Decimal range.
        const dnr = decimalMaxLength == null ? 2 : decimalMaxLength;

        // Allows minus sign if 'signed' is a number type.
        const sgn = numberType != null && numberType.match(/signed/) ? '' : `|\\-`;

        // Maximum integer and decimal ranges length.
        const dp = new RegExp(`(?<=\\d{${inr}})(?<!\\.\\d+)\\d+|(?<=\\.\\d{${dnr}})\\d+${sgn}`);
        if (numberType != null && numberType.match(/decimal/) && value.match(dp))
        return input.value = value.replace(dp, '');
        
        // Maximum integer or digit range length.
        const ip = new RegExp(`(?<=\\d{${inr}})\\d+|\\.${sgn}`);
        if ((numberType == null || numberType.match(/(?<!decimal\|)signed(?!\|decimal)|digit/)) && value.match(ip))
        return input.value = value.replace(ip, '');
    });
};

/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @warning ⚠ This function have some features that are not supported by Safari browsers!
 * @requires <input type="text" ... >
 * @description Makes a type text HTMLInputElement to work similar as a type number HTMLInputElement and allows to set the maximum range of digits.
 * 
 * @param {HTMLInputElement} input The input element where this function will be working on.
 * @param {Number?} maxLength Number that specifies the maximum length of the integer range.
 *
 * When max element attribute is not empty, the maximum length will be set according this number.
 * 
 * When maxlength element attribute is not empty, the maximum length will be set according this number.
 * 
 * When setted as null, the maximum length will be set as 4 by default.
 */
 export function digitInput(input, maxLength) {

    input.addEventListener('input', ()=> {

        const value = input.value;
        
        const max = input.max != null && input.max != '' ? input.max
        : input.maxlength != null && input.maxlength != '' ? input.maxlength
        : maxLength != null ? maxLength : 4;

        const numbers = new RegExp(`[^0-9]|(?<=\\d{${max}})\\d+`);
        if (value.match(numbers))
        return input.value = value.replace(numbers, '');
    });
};