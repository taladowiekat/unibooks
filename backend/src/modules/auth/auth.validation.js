import Joi from 'joi';

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

export const signupschema = Joi.object({
        firstname: Joi.string().min(1).max(30).required().messages({
            'string.min': 'First name must be at least 1 character long!',
            'string.max': 'First name must not exceed 30 characters!',
            'any.required': 'First name is required!'
        }),
        lastname: Joi.string().min(1).max(30).required().messages({
            'string.min': 'Last name must be at least 1 character long!',
            'string.max': 'Last name must not exceed 30 characters!',
            'any.required': 'Last name is required!'
        }),
        studentID: Joi.string().pattern(new RegExp(/^\d{8}$/)).required().messages({
            'string.pattern.base': 'Student ID must be 8 digits long!',
            'any.required': 'Student ID is required!'
        }),
        email: Joi.string().pattern(new RegExp(/^s\d{8}@stu.najah.edu$/)).required().messages({
            'string.pattern.base': 'Invalid student email address!',
            'any.required': 'Email is required!'
        }),
        password: Joi.string().min(6).max(30).required().messages({
            'string.min': 'Password must be at least 6 characters long!',
            'string.max': 'Password must not exceed 30 characters!',
            'any.required': 'Password is required!'
        })
        ,
        college: Joi.string().valid(...allowedColleges).required().messages({
            'any.required': 'Password is required!'
        }) ,
        gender: Joi.string().valid(...allowedGender).required().messages({
            'any.required': 'Password is required!'
        })     
    })


    export const signinschema = Joi.object({
        email: Joi.string() 
            .pattern(new RegExp(/^s\d{8}@stu\.najah\.edu$|^\d{8}$/))// user can use his uni.. id
            .required()
            .messages({
                'string.pattern.base': 'Invalid email or university ID format',
                'any.required': 'Email or university ID is required'
            }),
        password: Joi.string().min(6).max(30).required().messages({
            'string.min': 'Password must be at least 6 characters long!',
            'string.max': 'Password must not exceed 30 characters!',
            'any.required': 'Password is required!'
        }),

    })
