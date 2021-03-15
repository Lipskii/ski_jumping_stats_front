import * as Yup from 'yup'

export const JuryValidationSchema = () => Yup.object(
    {
        personId: Yup.number()
            .required('Required'),
        juryTypeId: Yup.number()
            .required('Required'),
    })