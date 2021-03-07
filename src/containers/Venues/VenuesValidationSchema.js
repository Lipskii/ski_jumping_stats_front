import * as Yup from 'yup';

export const VenuesValidationSchema = () => Yup.object(
    {
        name: Yup.string()
            .required('Required'),
        capacity: Yup.number()
            .required('Required'),
        cityId: Yup.number()
            .required('Required'),
        skiClubId: Yup.number
            .required('Required'),
        yearOfOpening: Yup.number
            .required('Required')
    })