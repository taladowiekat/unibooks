import Message from '../../../db/models/message.model.js';
import User from '../../../db/models/user.model.js';

export const saveMessage = async (req, res) => {
    const { senderName, message, studentID } = req.body;

        const user = await User.findOne({ studentID });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newMessage = new Message({
            senderName,
            message,
            user: user._id 
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message saved successfully', data: newMessage });
    };


export const getMessage = async (req, res) => {
    
        const message = await Message.findById(req.params.messageId).populate('user', 'email');
        if (!message) {
            return res.status(404).send('Message not found');
        }
        res.send(message);
    } 
