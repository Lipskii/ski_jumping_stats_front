import * as Yup from 'yup'

const FILE_SIZE = 2000 * 1024;
const SUPPORTED_FORMATS = [
    "csv"
];

export const ResultsValidationSchema = () => Yup.object(
    {
        assistantRDId: Yup.number(),
        assistantTDId: Yup.number(),
        cancelledAtRound: Yup.number()
            .min(0, "Cannot be less than 0")
            .max(4, "Cannot be more than 4"),
        chiefOfCompetitionId: Yup.number(),
        date1: Yup.date()
            .required('Required'),
        date2: Yup.date(),
        equipmentController1Id: Yup.number(),
        equipmentController2Id: Yup.number(),
        firstRoundAirTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        firstRoundAirTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        firstRoundAvgWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        firstRoundBaseGate: Yup.number()
            .min(0, 'Value cannot be less than zero.'),
        firstRoundHumidityStart: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        firstRoundHumidityFinish: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        firstRoundMaxWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        firstRoundMinWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        firstRoundSnowTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        firstRoundSnowTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        firstRoundStartTime: Yup.date(),
        firstRoundWeatherId: Yup.number(),
        fourthRoundAirTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        fourthRoundAirTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        fourthRoundAvgWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        fourthRoundBaseGate: Yup.number()
            .min(0, 'Value cannot be less than zero.'),
        fourthRoundHumidityStart: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        fourthRoundHumidityFinish: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        fourthRoundMaxWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        fourthRoundMinWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        fourthRoundSnowTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        fourthRoundSnowTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        fourthRoundWeatherId: Yup.number(),
        gateFactor: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        hillId: Yup.number(),
        hillVersionId: Yup.number()
            .required('Required'),
        isTeam : Yup.bool(),
        judgeAId: Yup.number(),
        judgeBId: Yup.number(),
        judgeCId: Yup.number(),
        judgeDId: Yup.number(),
        judgeEId: Yup.number(),
        judgeSCId: Yup.number(),
        meterValue: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        raceDirectorId: Yup.number(),
        resultsLink: Yup.string()
            .url('Must be an URL'),
        // resultsFile: Yup.mixed()
        //     .required("A file is required")
        //     .test(
        //         "fileSize",
        //         "File too large",
        //         value => value && value.size <= FILE_SIZE
        //     )
        //     .test(
        //         "fileFormat",
        //         "Unsupported Format",
        //         value => value && SUPPORTED_FORMATS.includes(value.type)
        //     ),
        seasonId: Yup.number()
            .required('Required'),
        secondRoundAirTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        secondRoundAirTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        secondRoundAvgWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        secondRoundBaseGate: Yup.number()
            .min(0, 'Value cannot be less than zero.'),
        secondRoundHumidityStart: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        secondRoundHumidityFinish: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        secondRoundMaxWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        secondRoundMinWind: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        secondRoundSnowTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        secondRoundSnowTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        secondRoundWeatherId: Yup.number(),
        seriesMajorId: Yup.number()
            .required('Required'),
        seriesMinorId: Yup.number(),
        technicalDelegateId: Yup.number(),
        thirdRoundAirTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        thirdRoundAirTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        thirdRoundBaseGate: Yup.number()
            .min(0, 'Value cannot be less than zero.'),
        thirdRoundHumidityStart: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        thirdRoundHumidityFinish: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        thirdRoundSnowTempStart: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        thirdRoundSnowTempFinish: Yup.number()
            .max(99.9, 'Too large. Value should be less than 100.')
            .min(-99.9, 'Too small. Value should be more than -100.'),
        thirdRoundWeatherId: Yup.number(),
        venueId: Yup.number(),
        windFactorTail: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),
        windFactorFront: Yup.number()
            .min(0, 'Value cannot be less than zero.')
            .max(99.9, 'Too large. Value should be less than 100.'),

    })