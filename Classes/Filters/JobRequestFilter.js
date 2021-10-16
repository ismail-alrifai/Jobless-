const Filter = require("./Filter");

class JobRequestFilter extends Filter{
    constructor(myList) {
        super(myList);
        if( new.target === JobRequestFilter ){
            throw new TypeError("Cannot construct Abstract-JobRequestFilter instances directly");
        }
    }
}

module.exports = JobRequestFilter;