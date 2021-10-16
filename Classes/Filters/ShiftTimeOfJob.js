const JobOfferFilter = require("./JobOfferFilter");

class ShiftTimeOfJob extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].shift_time_of_job != null ){
                if( this.myList[i].shift_time_of_job === val ){
                    newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = ShiftTimeOfJob;
