import * as Yup from 'yup'

const formSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(3, 'Your name must be at least 3 characters long.')
        .required('Your name is required to complete registration.'),
    email: Yup
        .string()
        .email('Must be a valid email address.')
        .required('Must include email address.'),
    password: Yup
        .string()
        .required('Please input a valid password.')
        .min(8,'Your password must be at least 8 characters long')
        ,
    tosAgree: Yup
        .boolean()
        .oneOf([true], "Unfortunately you can't use our service if you don't accept our Terms of Service.")

})

export default formSchema