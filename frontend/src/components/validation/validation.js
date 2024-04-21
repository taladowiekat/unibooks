// validation.js

import * as Yup from 'yup';

export const createPostValidationSchema = Yup.object({
  bookName: Yup.string().required('Book name is required'),
  listingType: Yup.string().required('Listing type is required'),
  images: Yup.array()
    .min(1, 'Please upload at least one image')
    .max(4, 'You can upload up to 4 images')
});

export const signInValidationSchema = Yup.object().shape({
  emailOrUniversityId: Yup.string()
    .matches(/^s\d{8}@stu\.najah\.edu$|^\d{8}$/, 'Invalid email or university ID format')
    .required('Email or university ID is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be at most 30 characters long')    
});

export const signUpValidationSchema = Yup.object().shape({
  universityId: Yup.string().matches(/^\d{8}$/, 'Invalid university ID format').required('University ID is required'),
  email: Yup.string().matches(/^s\d{8}@stu\.najah\.edu$/, 'Invalid Email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long').max(30, 'Password must be at most 30 characters long'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().matches(/^s\d{8}@stu\.najah\.edu$/, 'Invalid Email format').required('Email is required'),
});
