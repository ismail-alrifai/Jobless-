const JobRequestFilter = require("./JobRequestFilter");

class Graduate extends JobRequestFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].educational_detail != null ){
                if( this.myList[i].educational_detail.graduate === val ){
                    newList.push({
                        object:this.myList[i]
                    });
                }
            }
        }
        return newList;
    }
}

module.exports = Graduate;
