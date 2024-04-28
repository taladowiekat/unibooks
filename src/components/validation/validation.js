// validation.js

import * as yup from 'yup';

export const createPostValidationSchema = yup.object({
  bookName: yup.string().required('Book name is required'),
  listingType: yup.string().required('Listing type is required'),
  images: yup.array()
    .min(1, 'Please upload at least one image')
    .max(4, 'You can upload up to 4 images')
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
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long').max(30, 'Password must be at most 30 characters long'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
});

export const resetPasswordValidationSchema = yup.object().shape({
  email: yup.string().matches(/^s\d{8}@stu\.najah\.edu$/, 'Invalid Email format').required('Email is required'),
});

export const contactValidation = yup.object({
  name: yup.string().min(3).required("Please Enter Name"),
  phoneNumber: yup.string().matches(/^(05[02469]\d{7})$/, "Invalid Phpne Number").required("Please Enter Phone Number"),
  email: yup.string().matches(/^s\d{8}@stu\.najah\.edu$/, 'Invalid Email ').required('Please Enter Email'),
  message: yup.string().required("Please Enter Message")
  });
