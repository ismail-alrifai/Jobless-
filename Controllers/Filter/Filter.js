const JobOffer                      = require('./JobOffer');
const FrJobOffer                    = require('./FrJobOffer');
const IncommingRequestesForJobOffer = require('./IncommingRequestesForJobOffer');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.JobOfferFilter = async (req ,res) => {
    const body = req.body;

    let {list ,city_location ,country_location ,education_level ,gender ,salary ,publish_date ,shift_time_of_job ,years_of_experience ,position} = body;

    if( city_location != null ){
        list = await JobOffer.CityLocation(list, city_location);
    }

    if( country_location != null ){
        list = await JobOffer.CountryLocation(list, country_location);
    }

    if( education_level != null ){
        list = await JobOffer.EducationLevel(list, education_level);
    }

    if( gender != null ){
        list = await JobOffer.Gender(list, gender);
    }

    if( salary != null ){
        list = await JobOffer.Salary(list, salary);
    }

    if( publish_date != null ){
        list = await JobOffer.PublishDate(list, publish_date);
    }

    if( shift_time_of_job != null ){
        list = await JobOffer.ShiftTimeOfJob(list, shift_time_of_job);
    }

    if( years_of_experience != null ){
        list = await JobOffer.YearsOfExperience(list, years_of_experience);
    }

    if( position != null ){
        let {latitude ,longitude} = position;

        list = await JobOffer.RadiusJobOffer(list ,16.75 ,latitude ,longitude);
    }

    return res.status(200).json(list);
}

// ======================================== //
// ======================================== //
// ======================================== //

exports.FrJobOfferFilter = async (req ,res) => {
    const body = req.body;

    let {list  ,wage ,publish_date} = body;

    if( wage != null ){
        list = await FrJobOffer.Wage(list, wage);
    }

    if( publish_date != null ){
        list = await FrJobOffer.PublishDate(list, publish_date);
    }

    return res.status(200).json(list);
}

// ======================================== //
// ======================================== //
// ======================================== //

exports.IncommingRequestesForJobOfferFilter = async (req ,res) => {
    const body = req.body;

    let {list ,age ,graduate ,gender_of_user} = body;

    if( age != null ){
        list = await IncommingRequestesForJobOffer.Age(list, age);
    }

    if( gender_of_user != null ){
        list = await IncommingRequestesForJobOffer.GenderOfUser(list, gender_of_user);
    }

    if( graduate != null ){
        list = await IncommingRequestesForJobOffer.Graduate(list, graduate);
    }

    return res.status(200).json(list);
}

/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///

exports.IncommingRequestesForFrJobOfferFilter = async (req ,res) => {
    // we can use this middleware in:
        // user filter incomming request
        // user filter all freelancers

    const body = req.body;

    let {list ,rate} = body;

    if( rate != null ){
        list = await FrJobOffer.rateFreelancer(list, rate);
    }

    return res.status(200).json(list);
}
