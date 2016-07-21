var express = require('express');
var router = express.Router();
var request = require('request');

var multer = require('multer');
var msg = multer();

var Job = require('../models/job');

var domain = process.env.MAILGUN_DOMAIN;
var key = process.env.MAILGUN_API_KEY;
var mailgun = require('mailgun-js')({
    apiKey: key,
    domain: domain
});
var orgName = 'Pixel Houz';
var orgAddress = '9999 Road Way';
var orgCityStateZip = 'Minneapolis, MN 55401';

var list = mailgun.lists('photographers@mg.pixelhouz.com');

//sends an email to clients
router.post('/', function(req, res) {

    var sendTo = req.body.sendTo;
    var subject = req.body.subject;
    var jobID = req.body.jobID;
    var preferredDate = new Date(req.body.preferredDate);
    preferredDate.toDateString();
    var preferredTime = req.body.preferredTime;

    var message = 'Hello,\n' +
        'You’re receiving this message from a service called Pixel Houz! We help property owners connect with real estate photographers to set a time for a photo session. You indicated to your realtor that your preferred date and time is ' + preferredDate + '  in the ' + preferredTime + '. \n\n' +

        'Reply to this email to communicate directly with the photographer to find a time that works for both of you. \n\n' +

        'Message from photographer:\n\n' +
        '-------------------------------------------\n\n' +
        req.body.message + '\n\n' +
        '-------------------------------------------\n\n' +
        'Job # [' + jobID + ']\n' +
        orgName + '\n' +
        orgAddress + '\n' +
        orgCityStateZip + '\n\n' +

        'Pixel Houz does not share your email or use it for anything except direct communication.\n\n';

    var sender = '"Pixel Houz" <' + process.env.MAILGUN_SMTP_LOGIN + '>';

    var data = {
        from: process.env.MAILGUN_SMTP_LOGIN,
        to: sendTo,
        subject: subject,
        text: message,
        'X-Mailgun-Variables': {
            jobID: jobID
        }
    };
    //attachment: filepath


    //send mailgun
    mailgun.messages().send(data, function(error, body) {
        console.log(data);
        console.log(Date.now());
        res.sendStatus(200);
    });
});

//sends an email to photographers about a new job
router.post('/newjob', function(req, res) {

    var sendTo = list.params[0];
    var subject = 'New job posted to Pixel Houz';
    var jobID = req.body.jobID;
    var address = req.body.address;

    var message = 'Hi,\n' +
        'A new job at ' + address + ' has been posted to Pixel Houz. If you\'d like more details please log in to Pixel Houz and go to http://www.pixelhouz.com/#/user \n\n' +
        'Job # [' + jobID + ']\n' +
        orgName + '\n' +
        orgAddress + '\n' +
        orgCityStateZip + '\n\n' +

        'Pixel Houz does not share your email or use it for anything except direct communication.\n\n';

    var sender = '"Pixel Houz" <' + process.env.MAILGUN_SMTP_LOGIN + '>';

    var data = {
        from: process.env.MAILGUN_SMTP_LOGIN,
        to: sendTo,
        subject: subject,
        text: message,
        'X-Mailgun-Variables': {
            jobID: jobID
        }
    };
    //attachment: filepath


    //send mailgun
    mailgun.messages().send(data, function(error, body) {
        console.log(data);
        console.log(Date.now());
        res.sendStatus(200);
    });
});

router.post('/finalized/:id', function(req, res) {
    var id = req.params.id;
    Job.findById(id, function(err, job) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        if (job) {
            var sendTo = job.emails;
            var subject = 'Your Pixel Houz Photo Session Time';
            var jobID = id;

            var date = new Date(req.body.date);
            date.toDateString();
            var time = req.body.time;
            var address = job.address.line1;

            var message = 'Hello,\n' +
                'You’re receiving this message from a service called Pixel Houz! We help property owners connect with real estate photographers to set a time for a photo session. You have finalized a time with your photographer.\n\n' +

                'Photo Session\n' +
                '-------------------------------------------\n' +
                'Date: ' + date + '\n' +
                'Time: ' + time + '\n' +
                'Address: ' + address + '\n' +

                '-------------------------------------------\n\n' +

                'Please do not reply directly to this email. If you feel like you need to contact your photographer, cut and paste this line\n\n' +
                'Job # [' + jobID + ']\n\n' +
                'into the subject of an email to postmaster@mg.pixelhouz.com and you should get a response.\n\n' +

                'Job # [' + jobID + ']\n' +
                orgName + '\n' +
                orgAddress + '\n' +
                orgCityStateZip + '\n\n' +

                'Pixel Houz does not share your email or use it for anything except direct communication.';

            var sender = '"Pixel Houz" <' + process.env.MAILGUN_SMTP_LOGIN + '>';

            var data = {
                from: process.env.MAILGUN_SMTP_LOGIN,
                to: sendTo,
                subject: subject,
                text: message,
                'X-Mailgun-Variables': {
                    jobID: jobID
                }
            };



            //send mailgun
            mailgun.messages().send(data, function(error, body) {
                console.log('message sent for session time', data);
                console.log(Date.now());
                res.sendStatus(200);
            });

        }
    });
});

//get mailgun email info from Mailgun API
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

//get one stored message
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

//receives messages from Mailgun by POST
router.post('/messages/received/', msg.any(), function(req, res) {

    var message = req.body;
    var exists = false;

    //match the message subject to the job ID
    var matches = message.Subject.match(/\[(.*?)\]/);

    if (matches) {
        var id = matches[1];

        var messageObject = {
            message: message['stripped-text'],
            timestamp: message.timestamp * 1000,
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

                    var inDBTime = new Date(item.timestamp);

                    var emailTime = new Date(message.timestamp * 1000);

                    if (inDBTime == emailTime) {
                        exists = true;
                    }
                });

                if (!exists) {
                    job.chat.messages.push(messageObject);

                    job.save(function(err) {
                        if (err) {
                            res.sendStatus(500);
                            return;
                        }

                        res.sendStatus(204);
                    });
                }

            }
        });
    }
});



// list.info(function (err, data) {
//   // `data` is mailing list info
//   console.log(data);
// });

//adds a new photographer to the mailing list.. still need to make unsubscribe function for when photographer is deleted
router.post('/addphotographer', function(req, res) {
    var photographer = {
        subscribed: true,
        address: req.body.email,
        name: req.body.username,
        vars: {
            phone: req.body.phone
        }
    };


    list.members().create(photographer, function(err, data) {
        // `data` is the member details
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            res.send(data);
            console.log('added a user email successfully');
            list.members().list(function(err, members) {
                // `members` is the list of members
                console.log(members);
            });
        }
    });
});


//
// list.members('bob@gmail.com').update({ name: 'Foo Bar' }, function (err, body) {
//   console.log(body);
// });

module.exports = router;
