const JobOfferFilter = require("./JobOfferFilter");

class EducationLevel extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].job_condition.education_level != null ){
                if( this.myList[i].job_condition.education_level === val ){
                    newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = EducationLevel;
