// one file has all tabels in database

const sequelize                      = require('./db');
const Positions                      = require('./Public Details/Position');
const Accounts                       = require('./Public Details/Accounts');
const EducationaDetails              = require('./Public Details/Educational Details');
const AdditionalDetails              = require('./Public Details/Additional Details');
const BasicDetails                   = require('./Public Details/Basic Details');
const User                           = require('./User DB/User');
const EmploymentDetails              = require('./User DB/Employment Details');
const Freelancer                     = require('./Freelancer DB/Freelancer');
const PreviousWorks                  = require('./Freelancer DB/Previous Works');
const Company                        = require('./Company DB/Company');
const JobConditions                  = require('./Business/Job Conditions');
const JobOffer                       = require('./Business/Job Offer');
const UserJobOffer                   = require('./Business/User Job Offer');
const JobArchive                     = require('./Business/Job Archive');
const JobOfferAdminAccepter          = require('./Business/Job Offer Admin Accepter');
const FreelanceJobOffer              = require('./Business/Freelance Job Offer');
const FreelancerJobOffer             = require('./Business/Freelancer Job Offer');
const FreelancerJobArchive           = require('./Business/Freelance Job Archive');
const Notification                   = require('./Contact/Notification');
const Message                        = require('./Contact/Message');
const FavoriteFreelancerFrJob        = require('./Favorite/Favorite Freelancer_FrJob');
const FavoriteUserJob                = require('./Favorite/Favorite User_Job');
const Admin                          = require('./Admin DB/Admin');
const LoginId                        = require('./Login Id DB/Login Id');
const CompanySignupAdminAccepter     = require('./Admin DB/Company Signup Admin Accepter');
const Country                        = require('./Keyword/Country');
const City                           = require('./Keyword/City');
const ProposingJobs                  = require('./Contact/Proposing jobs');

// ----------------------------------------------------------------------------------- //

module.exports = {
    CompanySignupAdminAccepter  : CompanySignupAdminAccepter,
    FavoriteFreelancerFrJob     : FavoriteFreelancerFrJob,
    JobOfferAdminAccepter       : JobOfferAdminAccepter,
    FreelancerJobArchive        : FreelancerJobArchive,
    FreelancerJobOffer          : FreelancerJobOffer,
    FreelanceJobOffer           : FreelanceJobOffer,
    EducationaDetails           : EducationaDetails,
    AdditionalDetails           : AdditionalDetails,
    EmploymentDetails           : EmploymentDetails,
    FavoriteUserJob             : FavoriteUserJob,
    PreviousWorks               : PreviousWorks,
    JobConditions               : JobConditions,
    ProposingJobs               : ProposingJobs,
    BasicDetails                : BasicDetails,
    Notification                : Notification,
    UserJobOffer                : UserJobOffer,
    JobArchive                  : JobArchive,
    Freelancer                  : Freelancer,
    sequelize                   : sequelize,
    Position                    : Positions,
    Accounts                    : Accounts,
    JobOffer                    : JobOffer,
    Company                     : Company,
    Message                     : Message,
    LoginId                     : LoginId,
    Country                     : Country,
    Admin                       : Admin,
    User                        : User,
    City                        : City
}
