const JobOfferFilter = require("./JobOfferFilter");

class CountryLocation extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].company.position != null && this.myList[i].company.position.country != null ){
                if( this.myList[i].company.position.country === val ){
                    newList.push(this.myList[i]);
                }
            }
            else if( this.myList[i].job_condition != null ){
                if( this.myList[i].job_condition.country != null ){
                    if( this.myList[i].job_condition.country === val ){
                        newList.push(this.myList[i]);
                    }
                }
            }
        }
        return newList;
    }
}

module.exports = CountryLocation;