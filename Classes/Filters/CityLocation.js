const JobOfferFilter = require("./JobOfferFilter");

class CityLocation extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].company.position != null && this.myList[i].company.position.city != null ){
                if( this.myList[i].company.position.city === val ){
                    newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = CityLocation;