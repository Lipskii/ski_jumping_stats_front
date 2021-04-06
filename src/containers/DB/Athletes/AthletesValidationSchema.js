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
        active: Yup.bool(),
        birthdate: Yup.date(),
        cityId: Yup.number(),
        clubId: Yup.number(),
        countryId: Yup.number()
            .required('Required'),
        lastName: Yup.string()
            .required('Required'),
        firstName: Yup.string()
            .required('Required'),
        fisCode: Yup.number(),
        genderId: Yup.number()
            .required('Required'),
        skisId: Yup.number(),
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