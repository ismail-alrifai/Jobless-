const Filter = require("./Filter");

class JobOfferFilter extends Filter{
    constructor(myList) {
        super(myList);
        if( new.target === JobOfferFilter ){
            throw new TypeError("Cannot construct Abstract-JobOfferFilter instances directly");
        }
    }
}

module.exports = JobOfferFilter;