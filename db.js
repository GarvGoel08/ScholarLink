const { ConnectionReadyEvent } = require('mongodb');
const mongoose = require('mongoose');


//Data Base Connection Code
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://garvgoel2927:TFexbjo3hxeziqvU@scholarlink.6nrbf2m.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

//Mentorship Session
const MentorshipSchema = new mongoose.Schema({
    name: String,
    email: String,
    mob: String,
    stream: String
});
const Mentorship = mongoose.model('MentorshipRequests', MentorshipSchema);

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mob: String,
    Mess: String
});
const ContactForm = mongoose.model('ContactForm', ContactSchema);

async function ContactFormManager(myName1, myEmail1, myTel1, myMess1){
    try {
        const ContactSub = new ContactForm({
            name: myName1,
            email: myEmail1,
            mob: myTel1,
            Mess: myMess1,
        });
        await ContactSub.save();
        return 'Succesful';
    }
    catch {
        return 'Failed';
    }
}

async function MentorshipForm(myName, email, myTel, myStream) {
    // Save booking details in MongoDB
    try {
        const NewMentorship = new Mentorship({
            name: myName,
            email: email,
            mob: myTel,
            stream: myStream,
        });
        await NewMentorship.save();
        return 'Succesful';
    }
    catch {
        return 'Failed';
    }
}

module.exports = { connectToDatabase, MentorshipForm,  ContactFormManager};