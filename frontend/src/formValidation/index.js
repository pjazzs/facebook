import * as yup from 'yup'

export const basicSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),

})

export const registerSchema = yup.object().shape({
    first_name: yup.string().required("What's your first name?").min(2, "First name must be between 2 and 16 character" ).max(16, "First name must be between 2 and 16 character").matches(/^[A-Za-z]+$/, "Numbers and special characters are not allowed"),

    last_name: yup.string().required("What's your last name?").min(2, "Last name must be between 2 and 16 character" ).max(16, "Last name must be between 2 and 16 character").matches(/^[A-Za-z]+$/, "Numbers and special characters are not allowed"),

    email:yup.string().required("You'll need this when you log in and if you ever need to reset your password. ").email("Enter a valid email address."),

    password: yup.string().required("Enter a combination of at least 6 numbers, letters and punctuation marks(such as ! and &)").min(6, "password must be at least 6 characters").max(16, 'password must be at least 16 characters')
})