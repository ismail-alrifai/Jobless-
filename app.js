// ---------- NodeJs imports ------------- //


// ------- 3rd Party Pkg imports --------- //
const express = require('express');
const bodyParser = require('body-parser');

// ------------ My imports --------------- //
const db = require('./database/myDB');
const Router = require('./Router/Router');
const ErrorHandler = require('./jwt/error-handler');

// --------------------------------------- //

const app = express();
const runningPort = 3000;

db.sequelize.sync(/*{force:true}*/ /*{alter:true}*/)
    .then( async () => {
        await db.sequelize.query("set global max_allowed_packet=1000000000;");

        console.log("----------------------------------------");
        console.log("----------- Start Of The App -----------");
        console.log("----------------------------------------");

        app.use(bodyParser.json({
            limit: '256mb'
        }));

        app.use((req ,res) => {
           console.log(req.body);
        });

        app.use(Router.AuthRouter);
        app.use(Router.UserRouter);
        app.use(Router.TrieRouter);
        app.use(Router.AdminRouter);
        app.use(Router.GuestRouter);
        app.use(Router.FilterRouter);
        app.use(Router.SearchRouter);
        app.use(Router.MessageRouter);
        app.use(Router.CompanyRouter);
        app.use(Router.FreelancerRouter);
        app.use(Router.ProposingJobsRouter);
        app.use(Router.NotificationsRouter);
        app.use(Router.RegistrationTokenRouter);

        app.use(ErrorHandler);

        app.listen(runningPort ,() => {
            console.log("---- Server Is Running On Port " + runningPort + " ----");
            console.log("----------------------------------------");
        });
    })
    .catch( err => {
      console.log(err);
    });

