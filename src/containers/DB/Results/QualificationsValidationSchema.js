import * as Yup from 'yup'

export const QualificationsValidationSchema = () => Yup.object(
    {
        date1: Yup.date()
            .required('Required'),
        airTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        airTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        avgWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        baseGate: Yup.number()
            .min(0, 'Value cannot be less than zero.'),
        humidityStart: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        humidityFinish: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        maxWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        minWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        snowTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        snowTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        startTime: Yup.date(),
        weatherId: Yup.number(),
        judgeAId: Yup.number(),
        judgeBId: Yup.number(),
        judgeCId: Yup.number(),
        judgeDId: Yup.number(),
        judgeEId: Yup.number(),
        judgeSCId: Yup.number(),
        resultsLink: Yup.string()
            .url('Must be an URL')
    })