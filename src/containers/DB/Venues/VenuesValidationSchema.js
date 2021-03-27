import * as Yup from 'yup'

export const VenuesValidationSchema = () => Yup.object(
    {
        name: Yup.string()
            .required('Required'),
        capacity: Yup.number()
            .min(0,"Cannot be less than 0")
            .required('Required'),
        cityId: Yup.number()
            .required('Required'),
        yearOfOpening: Yup.number()
            .min(1800,'Year is incorrect')
            .required('Required'),
        skiClubId: Yup.number()
            .required('Required'),

    })