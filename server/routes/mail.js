var express = require('express');
var router = express.Router();
var multer = require('multer');
var request = require('request');
var domain = process.env.MAILGUN_DOMAIN || 'sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org';
var key = process.env.MAILGUN_API_KEY || 'key-e8598fe5ada73e92e6f692b19e43f14f';
var mailgun = require('mailgun-js')({
    apiKey: key,
    domain: domain
});


//sends an email
router.post('/', function(req, res) {

    var sendTo = req.body.sendTo;
    var subject = req.body.subject;
    var jobID = req.body.jobID;
    var message = 'Hello,\n' +
'You’re receiving this message from a service called Pixel Houz! We help property owners connect with real estate photographers to set a time for a photo session. You indicated to your realtor that your preferred date and time are $preferred date$ in the $preferred time$ . \n\n' +

'Reply to this email to communicate directly with the photographer to find a time that works for both of you. \n\n' +

'Message from photographer:\n\n' +

req.body.message + '\n\n' +

'Job # [' + jobID + ']\n' +
'Pixel Houz\n' +
'9999 Road Way\n' +
'Minneapolis MN 5540\n' +

'Pixel Houz does not share your email or use it for anything except direct communication.\n\n';

    var sender = '"Pixel Houz" <' + process.env.MAILGUN_SMTP_LOGIN || 'postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org' + '>';

    var data = {
        from: process.env.MAILGUN_SMTP_LOGIN || 'postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org',
        to: 'anniegtom@yahoo.com',//test email, change to var sendTo when deployed
        subject: subject,
        text: message,
        'X-Mailgun-Variables' : {
            jobID: jobID
        }
    };
            //attachment: filepath

    console.log("before sending mailgun", data);
    //send mailgun
    mailgun.messages().send(data, function(error, body) {
        console.log(data);
        console.log(Date.now());
        res.sendStatus(200);
    });
});
//get mailgun email info from api
router.get('/messages', function(req, res) {
    console.log("get mail");
    console.log(domain);
    var mail = [];
    mailgun.get('/' + domain + '/events', //{ event: ['sent', 'delivered'] },

        function(error, body) {

            console.log(error);
            console.log(body);
            if (body) {
            res.send(body);
        }
        });

});

router.post('/messages/item', function(req, res) {

    var item = req.body;
        if (item.storage.key) {

            mailgun.messages(item.storage.key).info(function(error, body) {
                console.log(error);
                console.log('MESSAGE', body);
                res.send(body);
            });

        }

});

router.post('/messages/received/', function(req, res) {
    var body = req;
    console.log('REQUEST', req.body);
    // console.log('recipient: ', req.params.recipient);
    console.log('recipient: ', req.params);
    console.log('query: ', req.query);
    console.log('route: ', req.route);
    res.sendStatus(201);

});
module.exports = router;
