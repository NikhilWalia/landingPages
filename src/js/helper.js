export const pancardValidation = (text) => {
    let   regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if(regex.test(text)) {
         return true;
    }
    return false;
}

export const ONHOLD = ["Citi"];