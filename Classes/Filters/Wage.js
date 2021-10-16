const FrJobOfferFilter = require("./FrJobOfferFilter");

class Wage extends FrJobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i]["wage"] != null ){
                if( parseFloat(val.from) <= parseFloat(this.myList[i].wage) && parseFloat(this.myList[i].wage) <= parseFloat(val.to) ){
                    newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = Wage;
