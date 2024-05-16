import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export function useValidations() {
  const { t } = useTranslation();
  const mb = 1024 * 1024;

  // Validation schema for creating a post
  const createPostValidationSchema = yup.object({
    bookName: yup.string().required(t('bookNameRequired')),
    listingType: yup.string().required(t('listingTypeRequired')),
    image: yup
      .mixed()
      .required(t('Required'))
      .test(
        'FILE_TYPE',
        t('invalidFileType!'),
        value => value && ['image/png', 'image/jpeg'].includes(value.type)
      )
      .test(
        'FILE_SIZE',
        t('fileSizeTooBig!'),
        value => value && value.size < 10 * mb
      ),
  });

  // Validation schema for editing a post
  const editPostValidationSchema = yup.object({
    bookName: yup.string().required(t('bookNameRequired')),
    listingType: yup.string().required(t('listingTypeRequired')),
  });

  // Validation schema for signing in
  const signInValidationSchema = yup.object({
    emailOrUniversityId: yup.string()
      .matches(/^s\d{8}@stu\.najah\.edu$|^\d{8}$/, t('invalidEmailOrUniversityId'))
      .required(t('emailOrUniversityIdIsRequired')),
    password: yup.string()
      .required(t('passwordRequired'))
      .min(6, t('passwordTooShort'))
      .max(30, t('passwordTooLong')),
  });

  // Validation schema for signing up
  const signUpValidationSchema = yup.object({
    universityId: yup.string()
      .matches(/^\d{8}$/, t('invalidUniversityIdFormat'))
      .required(t('universityIdRequired')),
    email: yup.string()
      .matches(/^s\d{8}@stu\.najah\.edu$/, t('invalidEmailFormat'))
      .required(t('emailIsRequired')),
    currentPassword: yup.string()
      .min(6, t('passwordTooShort'))
      .required(t('passwordRequired')),
    password: yup.string()
      .required(t('passwordRequired'))
      .min(6, t('passwordTooShort'))
      .max(30, t('passwordTooLong')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('confirmPasswordMismatch'))
      .required(t('confirmPasswordRequired')),
  });

  // Validation schema for resetting password
  const resetPasswordValidationSchema = yup.object({
    email: yup.string()
      .matches(/^s\d{8}@stu\.najah\.edu$/, t('invalidEmailFormat'))
      .required(t('emailIsRequired')),
  });

  // Validation schema for contacting support
  const contactValidationSchema = yup.object({
    name: yup.string().min(3, t('enterName')).required(t('nameIsRequired')),
    phoneNumber: yup.string()
      .matches(/^(05[02469]\d{7})$/, t('invalidPhoneNumber'))
      .required(t('phoneNumberIsRequired')),
    email: yup.string()
      .matches(/^s\d{8}@stu\.najah\.edu$/, t('invalidEmailFormat'))
      .required(t('enterEmail')),
    message: yup.string().required(t('enterMessage')),
  });

  return {
    createPostValidationSchema,
    editPostValidationSchema,
    signInValidationSchema,
    signUpValidationSchema,
    resetPasswordValidationSchema,
    contactValidationSchema,
  };
}