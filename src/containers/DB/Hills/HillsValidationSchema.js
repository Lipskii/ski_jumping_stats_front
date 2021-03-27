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
            .min(0, 'Cannot be negative')
            .required('Required'),
        e1: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        e2: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        es: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        t: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        gamma: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        alpha: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        r1: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        v0: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        h: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        n: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        s: Yup.number()
            .positive('Must be a positive number')
            .max(10, 'Too large. Value should be less than 10 m.')
            .required('Required'),
        l1: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        l2: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        a: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        betap: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        beta: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        betal: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        rl: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        r2l: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.'),
        r2: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        zu: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        p: Yup.number()
            .positive('Must be a positive number')
            .max(250, 'Too large.Value should be less than 250 m.')
            .required('Required'),
        l: Yup.number()
            .positive('Must be a positive number')
            .max(260, 'Too large. Value should be less than 260 m.')
            .required('Required'),
        b1: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        b2: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.'),
        bk: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        bu: Yup.number()
            .positive('Must be a positive number')
            .max(100, 'Too large. Value should be less than 100 m.')
            .required('Required'),
        d: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        q: Yup.number()
            .positive('Must be a positive number')
            .max(1000, 'Too large. Value should be less than 1000 m.')
            .required('Required'),
        validSince: Yup.date()
            .required('Required'),
        validUntil: Yup.date()
            .required('Required'),
        certificate: Yup.string()
            .url('Must be an URL')
            .required('Required')
    })