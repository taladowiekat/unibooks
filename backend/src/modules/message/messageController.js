import Message from '../../../db/models/message.model.js';

export const saveMessage = async (req, res) => {
    const { 
        senderName, 
        message, 
        } = req.body;

        try {
        const newMessage = new Message({
            senderName,
            message,
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message saved successfully', data: newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving message' });
    }
};
