import * as Yup from 'yup';

export const HillsValidationSchema = () => Yup.object(
    {
        name: Yup.string()
            .trim()
            .required('Required'),
        sizeOfHillId: Yup.number()
            .required('Required'),
        kPoint: Yup.number()
            .max(250, 'Too large. Value should be less than 250 m.')    //check this in FIS rules
            .min(0, 'Cannot be negative')
            .required('Required'),
        hillSize: Yup.number()
            .max(250, 'Too large. Value should be less than 250 m.')
            .min(0, 'Cannot be negative'),
        e1: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        e2: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        es: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        t: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        gamma: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        alpha: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        r1: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        v0: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        h: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        n: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        s: Yup.number()
            .positive('Must be a positive number')
            .max(10, 'Too large. Value should be less than 10 m.'),
        l1: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        l2: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        a: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        betap: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        beta: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        betal: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        rl: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        r2l: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        r2: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        zu: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        p: Yup.number()
            .positive('Must be a positive number')
            .max(250, 'Too large.Value should be less than 250 m.'),
        l: Yup.number()
            .positive('Must be a positive number')
            .max(260, 'Too large. Value should be less than 260 m.'),
        b1: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        b2: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        bk: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        bu: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        d: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        q: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        validSince: Yup.date(),
        validUntil: Yup.date(),
        certificate: Yup.string()
            .url('Must be an URL'),
    })