const Inbox = require('../models/inbox');
const Sent = require('../models/sent')

function isemailvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const getInbox = async (req, res) => {
    try {
        const mails = await Inbox.find({ to: req.user.email }).sort({createdAt:-1});
        return res.status(200).json({mails: mails, succese: true });
    } 
    catch (err) {

        return res.status(500).json({succese: false, error: err})
    }
}

const getSent = async (req, res) => {
    try {
        const mails = await Sent.find({ userId: req.user._id }).sort({createdAt:-1});
        return res.status(200).json({mails: mails, succese: true });
    } 
    catch (err) {

        return res.status(500).json({succese: false, error: err})
    }
}


const sendMail = async (req, res) => {
    try 
    {
        const{to, subject, body, isRead} = req.body;     
        if(isemailvalid(to) || isemailvalid(subject) ){
            return res.status(400).json({succese: false, message: "Parameters missing"});
        }  
        const userId = req.user._id;
        const email =  req.user.email;
        const date = new Date();
        const mails = await Inbox.create({
            from: email,
            to: to,
            subject: subject,
            body: body,
            isRead: isRead,
            createdAt: date,
            userId: userId
        });
        await Sent.create({
            from: email,
            to: to,
            subject: subject,
            body: body,
            isRead: isRead,
            createdAt: date,
            userId: userId
        });
        return res.status(200).json({mails: mails, message: 'Mail sent successfully', succese: true});   
    } 
    catch (err) {
        return res.status(500).json({succese: false, error: err});
    }
}

const updateMail = async (req, res) => {
    try 
    {
        const{id} = req.body;   
        await Inbox.updateOne({_id: id}, {$set: {isRead: true}});
        await Sent.updateOne({_id: id}, {$set: {isRead: true}});
        return res.status(200).json({ message: 'Mail status successfully updated', succese: true});   
        
    } 
    catch (err) {
        return res.status(500).json({succese: false, error: err});
    }
}

const deleteInbox = async (req, res) => {
    try {
        const mailId = req.params.mailId;
        await Inbox.findByIdAndRemove(mailId);      
        return res.status(200).json({succese: true, message: "Deleted Successfully"});       
    } 
    catch (err) {
        return res.status(403).json({succese: false, message: "Failed"})
    }
}

const deleteSent = async (req, res) => {
    try {
        const mailId = req.params.mailId;
        await Sent.findByIdAndRemove(mailId);      
        return res.status(200).json({succese: true, message: "Deleted Successfully"});       
    } 
    catch (err) {
        return res.status(403).json({succese: false, message: "Failed"})
    }
}

module.exports = {
    sendMail,
    getInbox,
    updateMail,
    deleteInbox,
    deleteSent,
    getSent
}

