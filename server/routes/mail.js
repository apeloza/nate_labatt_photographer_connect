var express = require('express');
var router = express.Router();
//var nodemailer = require('nodemailer');
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
    var message = req.body.message;
    var sender = '"Pixel Houz" <' + process.env.MAILGUN_SMTP_LOGIN || 'postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org' + '>';

    var data = {
        from: process.env.MAILGUN_SMTP_LOGIN || 'postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org',
        to: 'apeloza@alumni.uwo.ca',//test email, change to var sendTo when deployed
        subject: subject,
        text: message
            //attachment: filepath
    };

    //   var transporter = nodemailer.createTransport({
    //       service: 'Mailgun',
    //       auth: {
    //           user: process.env.MAILGUN_SMTP_LOGIN ||  'postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org',
    //           pass: process.env.MAILGUN_SMTP_PASSWORD || 'cb28882b6b95bc142d8d415e2096204b',
    //
    //       }
    //   });
    //
    //   var mailOptions = {
    //     from: '"Photo Connect" <' + process.env.MAILGUN_SMTP_LOGIN || 'postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org' + '>', // sender address
    //     to: sendTo, // list of receivers
    //     subject: 'nodemailer!!!', // Subject line
    //     text: message //, // plaintext body
    //     //html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    // };
    //
    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         console.log(error);
    //         res.json({yo: 'error'});
    //     } else {
    //         console.log('Message sent: ' + info.response);
    //         res.json({yo: info.response});
    //     };
    // });
    console.log("before sending mailgun");
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

            res.send(body);

        });

});

router.post('/messages/item', function(req, res) {

    var item = req.body;
        if (item.storage.key) {

            mailgun.messages(item.storage.key).info(function(error, body) {
                console.log(error);
                //console.log('MESSAGE', body);
                res.send(body);
            });

        }

});

module.exports = router;
