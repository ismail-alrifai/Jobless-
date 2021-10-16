const JobOfferFilter = require("./JobOfferFilter");

class Gender extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].job_condition.gender != null ){
                if( this.myList[i].job_condition.gender === val ){
                    newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = Gender;
