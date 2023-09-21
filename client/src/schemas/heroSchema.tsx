import * as yup from 'yup';

export const heroCreateSchema = yup.object().shape({
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
        .required('Select at least one picture')
        .test('fileSize', 'The file is too large, not more then 5mb', (value) => {
            return value && (value as File).size <= 5000000
        })   
})

export const heroUpdateSchema = yup.object().shape({
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
        .required(),
    images_remain: yup
        .mixed()

})