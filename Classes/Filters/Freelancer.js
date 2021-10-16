const Filter = require('./Filter');

class Freelancer extends Filter{
    constructor(myList){
        super(myList);
        if (new.target === Freelancer) {
            throw new TypeError("Cannot construct Abstract-Freelancer instances directly");
        }
    }
}

module.exports = Freelancer;