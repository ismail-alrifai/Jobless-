// one file has all router we need

const RegistrationTokenRouter = require('./Contact/RegistrationToken');
const ProposingJobsRouter     = require('./Contact/ProposingJobsRouter');
const NotificationsRouter     = require('./Contact/NotificationsRouter');
const FreelancerRouter        = require('./FreelancerRouter');
const CountryRouter           = require('./Keyword/CountryRouter');
const MessageRouter           = require('./Contact/MessageRouter');
const CompanyRouter           = require('./CompanyRouter');
const SearchRouter            = require('./Search/Search');
const FilterRouter            = require('./Filter/Filter');
const AdminRouter             = require('./AdminRouter');
const GuestRouter             = require('./GuestRouter');
const UserRouter              = require('./UserRouter');
const AuthRouter              = require('./AuthRouter');
const TrieRouter              = require('./Trie/TrieRouter');

module.exports = {
    RegistrationTokenRouter : RegistrationTokenRouter,
    NotificationsRouter     : NotificationsRouter,
    ProposingJobsRouter     : ProposingJobsRouter,
    FreelancerRouter        : FreelancerRouter,
    CountryRouter           : CountryRouter,
    CompanyRouter           : CompanyRouter,
    MessageRouter           : MessageRouter,
    SearchRouter            : SearchRouter,
    FilterRouter            : FilterRouter,
    AdminRouter             : AdminRouter,
    GuestRouter             : GuestRouter,
    UserRouter              : UserRouter,
    AuthRouter              : AuthRouter,
    TrieRouter              : TrieRouter
}