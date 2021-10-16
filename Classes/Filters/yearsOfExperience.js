const JobOfferFilter = require("./JobOfferFilter");

class yearsOfExperience extends JobOfferFilter {
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].job_condition.years_of_experience != null ){
                if( val.from <= this.myList[i].job_condition.years_of_experience && this.myList[i].job_condition.years_of_experience <= val.to ){
                    await newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = yearsOfExperience;
