// -- The Father Of Filters -- //

class Filter {
    constructor(myList) {
        if (new.target === Filter) {
            throw new TypeError("Cannot construct Abstract-Filter instances directly");
        }

        this.myList = myList
    }
}

module.exports = Filter;
