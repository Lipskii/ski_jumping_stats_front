import * as Yup from 'yup';

export const HillsValidationSchema = (hillsNames) => Yup.object(
    {
        name: Yup.string()
            .required('Required'),
        sizeOfHillId: Yup.number()
            .required('Required'),
        kPoint: Yup.number()
            .max(250, 'Too large')    //check this in FIS rules
            .min(0, 'Cannot be negative')
            .required('Required'),
        hs: Yup.number()
            .max(250, 'Too large')
            .min(0, 'Cannot be negative')
            .required('Required'),
        e1: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        e2: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large'),
        es: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        t: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        gamma: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        alpha: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        r1: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        v0: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        h: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        n: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        s: Yup.number()
            .positive('Must be a positive number')
            .max(9.99, 'Too large')
            .required('Required'),
        l1: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        l2: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        a: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        betap: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        beta: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        betal: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        rl: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        r2l: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large'),
        r2: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        zu: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        p: Yup.number()
            .positive('Must be a positive number')
            .max(250, 'Too large')
            .required('Required'),
        l: Yup.number()
            .positive('Must be a positive number')
            .max(260, 'Too large')
            .required('Required'),
        b1: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        b2: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large'),
        bk: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        bu: Yup.number()
            .positive('Must be a positive number')
            .max(99.99, 'Too large')
            .required('Required'),
        d: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        q: Yup.number()
            .positive('Must be a positive number')
            .max(999.99, 'Too large')
            .required('Required'),
        validSince: Yup.date()
            .required('Required'),
        validUntil: Yup.date()
            .required('Required'),
        certificate: Yup.string()
            .url('Must be an URL')
            .required('Required')
    })