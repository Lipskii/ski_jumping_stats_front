import * as Yup from 'yup'

export const AthletesValidationSchema = () => Yup.object(
    {
        active: Yup.bool()
            .required('Required'),
        birthdate: Yup.date()
            .required('Required'),
        cityId: Yup.number()
            .required('Required'),
        clubId: Yup.number()
            .required('Required'),
        countryId: Yup.number()
            .required('Required'),
        lastName: Yup.string()
            .required('Required'),
        firstName: Yup.string()
            .required('Required'),
        fisCode: Yup.number()
            .required('Required'),
        genderId: Yup.number()
            .required('Required'),
        skisId: Yup.number()
            .required('Required'),

    })