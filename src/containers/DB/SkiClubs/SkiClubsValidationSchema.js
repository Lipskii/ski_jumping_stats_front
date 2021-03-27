import * as Yup from 'yup'

export const SkiClubsValidationSchema = () => Yup.object(
    {
        name: Yup.string()
            .required('Required'),
        cityId: Yup.number()
            .required('Required')
    })