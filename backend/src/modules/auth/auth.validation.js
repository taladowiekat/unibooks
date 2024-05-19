import * as yup from 'yup';

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

export const signupschema = yup.object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    studentID: yup.string()
      .matches(/^\d{8}$/, 'Student ID must be 8 digits long')
      .required('Student ID is required'),
    email: yup.string()
      .required('Email is required')
      .matches(/^s\d{8}@stu\.najah\.edu$/, 'Invalid student email format')
      .test('email-match-studentID', 'Email must contain the student ID', function (value) {
          const { studentID } = this.parent;
          if (value) {
              const regex = new RegExp(`^s${studentID}@stu\\.najah\\.edu$`);
              return regex.test(value);
          }
          return false;
      }),
    password: yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .max(30, 'Password must not exceed 30 characters'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    college: yup.string()
      .oneOf(allowedColleges, 'Invalid college')
      .required('College is required'),
    gender: yup.string()
      .oneOf(allowedGender, 'Invalid gender')
      .required('Gender is required')
});

export const signinschema = yup.object({
  identifier: yup.string()
  .matches(/^(s\d{8}@stu\.najah\.edu|\d{8})$/, 'Invalid email or university ID format')
  .required('Email or university ID is required'),
    password: yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .max(30, 'Password must not exceed 30 characters')
});
