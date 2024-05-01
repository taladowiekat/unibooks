import * as yup from 'yup';

const mb = 1024 * 1024;

export const createPostValidationSchema = yup.object({
  bookName: yup.string().required('Book name is required'),
  listingType: yup.string().required('Listing type is required'),
  image: yup
    .mixed().required('Required!')
     .test('FILE_TYPE','Invalid!',(value) => value && ['image/png','image/jpeg'].includes(value.type))
     .test('FILE_SIZE','Too big!',(value) => value && value.size < 10* mb)
});

    

export const signInValidationSchema = yup.object().shape({
  emailOrUniversityId: yup.string()
    .matches(/^s\d{8}@stu\.najah\.edu$|^\d{8}$/, 'Invalid email or university ID format')
    .required('Email or university ID is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be at most 30 characters long')    
});

export const signUpValidationSchema = yup.object().shape({
  universityId: yup.string().matches(/^\d{8}$/, 'Invalid university ID format').required('University ID is required'),
  email: yup.string().matches(/^s\d{8}@stu\.najah\.edu$/, 'Invalid Email format').required('Email is required'),
  currentPassword: yup.string("Enter your password").min(8, "Password must be at least 6 characters long").required("Password is required"),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long').max(30, 'Password must be at most 30 characters long'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
});

export const resetPasswordValidationSchema = yup.object().shape({
  email: yup.string().matches(/^s\d{8}@stu\.najah\.edu$/, 'Invalid Email format').required('Email is required'),
});