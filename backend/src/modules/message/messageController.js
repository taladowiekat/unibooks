import Message from '../../../db/models/message.model.js';

export const saveMessage = async (req, res) => {
    const { 
        senderName, 
        message,
        email,
        recevieEmail
        } = req.body;

        try {
        const newMessage = new Message({
            senderName,
            message,
            email,
            recevieEmail
        });

        await newMessage.save();
        return res.status(201).json({ message: 'Message saved successfully', data: newMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error saving message' });
    }
};

export const getMessage = async (req, res) => {
    const message = await Message.findById(req.params.messageId).populate('user', 'email');
    if (!message) {
        return res.status(404).send('Message not found');
    }
    res.send(message);
};
