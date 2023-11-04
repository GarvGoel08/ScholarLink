const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;
app.use('/satic', express.static('static'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const {connectToDatabase, MentorshipForm, ContactFormManager} = require('./db')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Home.html'));
});
app.get('/Home', (req, res) => {
  res.sendFile(path.join(__dirname, 'Home.html'));
});

connectToDatabase();

app.post('/BookMentorship', async (req, res) => {
  const { myName, myEmail, myTel, myCareer } = req.body;
  if (myName === "" || myTel === null || myEmail === "" || myCareer === "") {
    res.send('<script>alert("Please Enter all Details"); window.location = "/";</script>');
  }
  const rsp = await MentorshipForm(myName, myEmail, myTel, myCareer);
    if (rsp == 'Succesful') {
      // Append the alert message to the HomeBeta.html and send it
      const alertMessage = `
        <div class="alert alert-warning alert-dismissible fade show" style="margin:0;" role="alert">
          <strong>Thanks for choosing us!</strong> Your Booking has been confirmed
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      const filePath = path.join(__dirname, 'HomeBeta.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.send('An error occurred.');
        } else {
          // Inject the alert message into the HTML
          const updatedHtml = data.replace('<div id="alert-message"></div>', alertMessage);
          res.send(updatedHtml);
        }
      });
    }
});

app.post('/Contact', async (req, res) => {
  const { myName1, myEmail1, myTel1, myMess1 } = req.body;
  if (myName1 === "" || myEmail1 === "" || myTel1 === "" || myMess1 === "") {
    res.send('<script>alert("Please Enter all Details"); window.location = "/";</script>');
  }
  else {
    const rsp = await ContactFormManager(myName1, myEmail1, myTel1, myMess1);
    if (rsp == 'Failed') {
      const alertMessage = `
        <div class="alert alert-danger alert-dismissible fade show" style="margin:0;" role="alert">
          <strong>Error!</strong> An error was observed while saving your info, Please try again.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      const filePath = path.join(__dirname, 'HomeBeta.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.send('An error occurred.');
        } else {
          // Inject the alert message into the HTML
          const updatedHtml = data.replace('<div id="alert-message"></div>', alertMessage);
          res.send(updatedHtml);
        }
      });
    }
    else if (rsp == 'Succesful') {
      // Append the alert message to the HomeBeta.html and send it
      const alertMessage = `
        <div class="alert alert-warning alert-dismissible fade show" style="margin:0;" role="alert">
          <strong>Submitted!</strong> Your will get a call from one of our customer specialists soon
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      const filePath = path.join(__dirname, 'HomeBeta.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.send('An error occurred.');
        } else {
          // Inject the alert message into the HTML
          const updatedHtml = data.replace('<div id="alert-message"></div>', alertMessage);
          res.send(updatedHtml);
        }
      });
    }
  }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });