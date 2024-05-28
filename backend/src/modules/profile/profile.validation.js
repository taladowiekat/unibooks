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

export const profileSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Last name is required'
    }),
    college: Joi.string().valid(...allowedColleges).required().messages({
        'any.only': 'Invalid college',
        'string.empty': 'College is required'
    })
});
