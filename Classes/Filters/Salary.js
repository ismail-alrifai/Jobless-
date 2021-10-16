const JobOfferFilter = require("./JobOfferFilter");

class Salary extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].salary != null ){
                if( val.from <= this.myList[i].salary && this.myList[i].salary <= val.to ){
                    newList.push(this.myList[i]);
                }
            }
        }
        return newList;
    }
}

module.exports = Salary;
