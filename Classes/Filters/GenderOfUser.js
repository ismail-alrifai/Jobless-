const JobRequestFilter = require("./JobRequestFilter");

class GenderOfUser extends JobRequestFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].basic_detail.gender != null ){
                if( this.myList[i].basic_detail.gender === val ){
                    newList.push({
                        object:this.myList[i]
                    });
                }
            }
        }
        return newList;
    }
}

module.exports = GenderOfUser;
    