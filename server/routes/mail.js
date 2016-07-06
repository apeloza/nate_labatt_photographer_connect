var express = require('express');
var router = express.Router();
var request = require('request');

var multer = require('multer');
var msg = multer();

var Job = require('../models/job');

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

router.post('/messages/received/', msg.any(), function(req, res) {

    var message = req.body;
    var exists = false;

    console.log('REQUEST', req.body);
    console.log('REQ.FILE', req.files);

    var matches = message.Subject.match(/\[(.*?)\]/);

    if (matches) {
        var id = matches[1];
        console.log("submatch", id);

            console.log('message matched to subject', message);
            messageObject = {
                message: message['stripped-text'],
                timestamp: Date.now(),
                username: message.sender,
                msgType: 'received'
            };

            Job.findById(id, function(err, job) {
                if (err) {
                    res.sendStatus(500);
                    return;
                }

                if (job) {

                    job.chat.messages.forEach(function(item, index) {

                        console.log('in db', item.timestamp);
                        console.log('new msg', message.timestamp);
                        if (item.message == message.message) {
                            exists = true;
                        }
                    });

                    if (!exists) {
                        job.chat.messages.push(message);
                        console.log('does not exist!');

                        job.save(function(err) {
                            if (err) {
                                res.sendStatus(500);
                                return;
                            }
                            console.log("/put a message");
                            res.sendStatus(204);
                        });
                    }
                }
            });
    }
});


module.exports = router;
