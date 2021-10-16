const Filter = require("./Filter");

class FrJobOfferFilter extends Filter{
    constructor(myList) {
        super(myList);
        if( new.target === FrJobOfferFilter ){
            throw new TypeError("Cannot construct Abstract-FrJobOfferFilter instances directly");
        }
    }
}

module.exports = FrJobOfferFilter;