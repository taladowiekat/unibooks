import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export function useValidations() {
  const { t } = useTranslation();
  const mb = 1024 * 1024;

  const allowedColleges = [
    "Faculty of Agriculture and Veterinary Medicine",
    "Faculty of Business and Communication",
    "Faculty of Engineering and Information",
    "Faculty of Fine Arts",
    "Faculty of Medicine and Health Sciences",
    "Faculty of Law and Political Sciences",
    "Faculty of Humanities and Educational Sciences",
    "Faculty of Science",
    "Faculty of Shari'ah"
  ];

  const allowedGender = [
    "female",
    "male"
  ];

  // Validation schema for creating a post
  const createPostValidationSchema = yup.object({
    bookName: yup.string().required(t('bookNameRequired')),
    postType: yup.string().required(t('postTypeRequired')),
    notes: yup.string().required(t('notesRequired')),
    image: yup
      .mixed()
      .required(t('required'))
      .test(
        'FILE_TYPE',
        t('invalidFileType'),
        value => value && ['image/png', 'image/jpeg'].includes(value.type)
      )
      .test(
        'FILE_SIZE',
        t('fileSizeTooBig'),
        value => value && value.size < 10 * mb
      ),
    subImages: yup
      .array()
      .of(
        yup.mixed().test(
          'FILE_TYPE',
          t('invalidFileType'),
          value => value && ['image/png', 'image/jpeg'].includes(value.type)
        ).test(
          'FILE_SIZE',
          t('fileSizeTooBig'),
          value => value && value.size < 10 * mb
        )
      )
      .max(4, t('maxSubImages')),
    exchangeBookName: yup.string().when('postType', {
      is: 'Exchange',
      then: schema => schema.required(t('exchangeBookNameRequired')),
      otherwise: schema => schema.notRequired(),
    }),
  });

  // Validation schema for editing a post
  const editPostValidationSchema = yup.object({
    bookName: yup.string().required(t('bookNameRequired')),
    postType: yup.string().required(t('postTypeRequired')),
  });

  // Validation schema for signing in
  const signInValidationSchema = yup.object({
    emailOrstudentID: yup.string()
      .matches(/^(s\d{8}@stu.najah.edu|\d{8})$/, t('invalidEmailOrUniversityId'))
      .required(t('emailOrUniversityIdIsRequired')),
    password: yup.string()
      .required(t('passwordRequired'))
      .min(6, t('passwordTooShort'))
      .max(30, t('passwordTooLong')),
  });

  // Validation schema for signing up
  const signUpValidationSchema = yup.object({
    firstName: yup.string().required(t('firstnameRequired')),
    lastName: yup.string().required(t('lastnameRequired')),
    studentID: yup.string()
      .matches(/^\d{8}$/, t('studentIdDigits'))
      .required(t('studentIdReq')),
    email: yup.string()
      .required(t('emailIsRequired'))
      .matches(/^s\d{8}@stu\.najah\.edu$/, t('invalidEmailFormat'))
      .test('email-match-studentID', t('emailContainId'), function (value) {
        const { studentID } = this.parent;
        if (value) {
          const regex = new RegExp(`^s${studentID}@stu\\.najah\\.edu$`);
          return regex.test(value);
        }
        return false;
      }),
    password: yup.string()
      .required(t('passwordRequired'))
      .min(6, t('passwordTooShort'))
      .max(30, t('passwordTooLong')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('confirmPasswordMismatch'))
      .required(t('confirmPasswordRequired')),
      college: yup.string()
      .required(t('CollegeRequired')),
    gender: yup.string()
      .required(t('GenderRequired')).oneOf(allowedGender, t('InvalidGender'))
  });

  // Validation schema for resetting password
  const forgotPasswordValidationSchema = yup.object({
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

  // Validation schema for changing password in the profile page
  const changePasswordValidationSchema = yup.object().shape({
    currentPassword: yup.string(t('EnterPassword')).min(6, t("PasswordLong")).required("Enter your password"),
    newPassword: yup.string(t('EnterPassword')).required(t("newPassEnter")).min(6, t("passwordTooShort")).max(30, t("passwordTooLong")),
    confirmPassword: yup.string(t("ConfirmPassword")).oneOf([yup.ref("newPassword"), null], t("confirmPasswordMismatch")).required(t("confirmPasswordRequired")),
  });

  // Validation schema for forgot password form
  const resetPasswordValidationSchema = yup.object().shape({
    code: yup.string(t("EnterTheCode")).min(4, t("codeDigit")).required(t("empty")),
    password: yup.string(t("newPassEnter")).required(t("newPassEnter")).min(6, t("passwordTooShort")).max(30, t("passwordTooLong")),
    confirmPassword: yup.string(t("ConfirmPassword")).oneOf([yup.ref("password"), null], t("confirmPasswordMismatch")).required(t("confirmPasswordRequired")),
  })

  // Validation schema for profile page
  const profileValidationSchema = yup.object({
    firstName: yup.string().required(t('firstnameRequired')),
    lastName: yup.string().required(t('lastnameRequired')),
    college: yup.string()
      .oneOf(allowedColleges,t('InvalidCollege'))
      .required(t('CollegeRequired'))
  })


  return {
    createPostValidationSchema,
    profileValidationSchema,
    editPostValidationSchema,
    signInValidationSchema,
    signUpValidationSchema,
    resetPasswordValidationSchema,
    contactValidationSchema,
    forgotPasswordValidationSchema,
    changePasswordValidationSchema
  };
}
