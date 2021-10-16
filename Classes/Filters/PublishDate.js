const fromStringToDate  = require('../../Controllers/Methods/fromStringToDate');
const JobOfferFilter    = require("./JobOfferFilter");

class PublishDate extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    fromDaysToMS(val){
        return  val * 24 * 60 * 60 * 1000;
    }

    async applyFilter(val){
        let needed = this.fromDaysToMS(val);
        let today = Date.parse(new Date().toDateString());

        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].date_of_publication != null ){
                let dop = fromStringToDate(this.myList[i].date_of_publication);
                let date_of_publication = Date.parse(dop.toDateString());

                if( date_of_publication >= today - needed ){
                    newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = PublishDate;
