

export function displayPrice(price) {
    return insertStringInString(price.toString().replace('.', ','), '.', -6);
}

export function insertStringInString(main_string, ins_string, pos) {
    // Function used to add . in price over 1.000 kr
    if (!pos) {
        pos = 0;
    }
    if (!ins_string || main_string.length < pos * -1) {
        ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}