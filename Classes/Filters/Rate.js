const Freelancer = require('./Freelancer');

class Rate extends Freelancer{
    constructor(myList){
        super(myList);
    }

    async applyFilter(val){
        let newList = [];

        for(let i in this.myList){
            if( parseFloat(this.myList[i].rate) >= parseFloat(val) ){ //value is %
                newList.push({
                    object:this.myList[i]
                });
            }
        }

        return newList;
    }
}

module.exports = Rate;
