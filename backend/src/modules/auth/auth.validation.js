import { query } from 'express';
import joi from 'joi';

export const signupschema = {
    body: joi.object({
        studentID: joi.string().pattern(new RegExp(/^\d{8}$/)).required().messages({
            'string.pattern.base': 'Student ID must be 8 digits long!',
            'any.required': 'Student ID is required!'
        }),
        email: joi.string().pattern(new RegExp(/^s\d{8}@stu.najah.edu$/)).required().messages({
            'string.pattern.base': 'Invalid student email address!',
            'any.required': 'Email is required!'
        }),
        password: joi.string().min(6).max(30).required().messages({
            'string.min': 'Password must be at least 6 characters long!',
            'string.max': 'Password must not exceed 30 characters!',
            'any.required': 'Password is required!'
        }),

        query: joi.object({
            test: joi.bool().required(),
        })
    })
}

export const signinschema = {
    body: joi.object({
        email: joi.string() 
            .pattern(/^s\d{8}@stu\.najah\.edu$|^\d{8}$/) // user can use his uni.. id
            .required()
            .messages({
                'string.pattern.base': 'Invalid email or university ID format',
                'any.required': 'Email or university ID is required'
            }),
        password: joi.string().min(6).max(30).required().messages({
            'string.min': 'Password must be at least 6 characters long!',
            'string.max': 'Password must not exceed 30 characters!',
            'any.required': 'Password is required!'
        }),

    })
}
