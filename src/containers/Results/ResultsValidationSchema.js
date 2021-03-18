import * as Yup from 'yup'

export const ResultsValidationSchema = () => Yup.object(
    {
        date1: Yup.date()
            .required('Required'),
        hillVersionId: Yup.number()
            .required('Required'),
    })