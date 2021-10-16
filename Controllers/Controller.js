// one file has all Controllers we need

const RegistrationTokenController = require('./Contact/RegistrationToken');
const ProposingJobsController     = require('./Contact/ProposingJobsController');
const NotificationsController     = require('./Contact/NotificationsController');
const SignUpAuthController        = require('./SignUpAuthController');
const ListGetterController        = require('./Filter/ListGetter');
const FreelancerController        = require('./FreelancerController');
const LogInAuthController         = require('./LogInAuthController');
const CompanyController           = require('./CompanyController');
const MessageController           = require('./Contact/MessageController');
const CountryController           = require('./Keyword/CountryController');
const FilterController            = require('./Filter/Filter');
const SearchController            = require('./Search/Search');
const AdminController             = require('./AdminController');
const GuestController             = require('./GuestController');
const UserController              = require('./UserController');
const AuthController              = require('./AuthController');
const TrieController              = require('./Trie/TrieController');

module.exports = {
    RegistrationTokenController: RegistrationTokenController,
    ProposingJobsController    : ProposingJobsController,
    NotificationsController    : NotificationsController,
    FreelancerController       : FreelancerController,
    SignUpAuthController       : SignUpAuthController,
    ListGetterController       : ListGetterController,
    LogInAuthController        : LogInAuthController,
    CompanyController          : CompanyController,
    CountryController          : CountryController,
    MessageController          : MessageController,
    SearchController           : SearchController,
    FilterController           : FilterController,
    AdminController            : AdminController,
    GuestController            : GuestController,
    UserController             : UserController,
    AuthController             : AuthController,
    TrieController             : TrieController
}