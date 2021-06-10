import emailValidator from 'email-validator';

const validateField = (fieldName, value) => {
    let formErrors = {};

    switch (fieldName) {
        case 'email':
            if (!emailValidator.validate(value)) {
                formErrors.email = { valid: false, message: 'Please enter a valid email address' };
            } else {
                formErrors.email = { valid: true, message: null };
            }
            break;

        case 'password':
            if (value.length < 6) {
                formErrors.password = { valid: false, message: 'Password is too short' };
            } else {
                formErrors.password = { valid: true, message: null };
            }
            break;

        default:
            formErrors.email = { valid: false, message: 'Please enter a valid email address' };
            formErrors.password = { valid: false, message: 'Password is too short' };
            break;
    }

    return formErrors;
}

export default validateField;