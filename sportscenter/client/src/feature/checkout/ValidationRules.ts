import * as yup from 'yup'

export const ValidationRules = [
    yup.object({
        firstName: yup.string().required('FirstName is required'),
        lastName: yup.string().required('LastName is required'),
        address1: yup.string().required('Address1 is required'),
        address2: yup.string().optional(),
        city: yup.string().required('City name is required'),
        state: yup.string().required('State is required'),
        zipcode: yup.string().required('Zipcode is required'),
        country: yup.string().required('Country name is Required')
    }),
    yup.object(),
    yup.object({
        cardName: yup.string().required(),
        carNumber: yup.string().required(),
        expDate: yup.string().required(),
        cvv: yup.string().required(),

    })
]