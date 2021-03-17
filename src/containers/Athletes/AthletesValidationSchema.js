import * as Yup from 'yup'

const FILE_SIZE = 2000 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

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
        file: Yup.mixed()
            .required("A file is required")
            .test(
                "fileSize",
                "File too large",
                value => value && value.size <= FILE_SIZE
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            )

    })