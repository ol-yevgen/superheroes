import * as yup from 'yup';

export const heroSchema = yup.object().shape({
    nickname: yup
        .string()
        .min(2, 'Minimum 2 characters')
    .required(),
    real_name: yup
        .string()
        .required()
        .min(2, 'Minimum 2 characters'),
    superpowers: yup
        .string()
        .required()
        .min(2, 'Minimum 2 characters'),
    catch_phase: yup
        .string()
        .required()
        .min(2, 'Minimum 2 characters'),
    origin_description: yup
        .string()
        .required()
        .min(6, 'Minimum 6 characters'),
    images: yup
        .mixed()
        // .required('Please select at least one picture')
        // .test(
        //     'fileSize',
        //     'The file is too large',
        //     (value: any) => value && value[0].size <= 10485760 // 10 MB
        // )

})