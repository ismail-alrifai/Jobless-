const JobRequestFilter = require("./JobRequestFilter");
const fromStringToDate = require("../../Controllers/Methods/fromStringToDate");

class Age extends JobRequestFilter{
    constructor(myList) {
        super(myList);
    }

    async applyFilter(val){
        let newList = [];
        for(let i in this.myList){
            if( this.myList[i].basic_detail.birthday_date != null ){
                const age = getAge(fromStringToDate(this.myList[i].basic_detail.birthday_date));

                if( val.from <= age && age <= val.to ){
                    newList.push({
                        object:this.myList[i]
                    });
                }
            }
        }
        return newList;
    }
}

// =================================== //
// =================================== //
// =================================== //

function getAge(birth) {
    const today = new Date();

    const nowyear = today.getFullYear();
    const nowmonth = today.getMonth();
    const nowday = today.getDay();

    const birthyear = birth.getFullYear();
    const birthmonth = birth.getMonth();
    const birthday = birth.getDay();

    let age = 0;
    if( nowyear > birthyear ){
        age = nowyear - birthyear;
        if( nowmonth < birthmonth ){
            age -= 1;
        }
        else if( nowmonth === birthmonth ){
            if( nowday < birthday ){
                age -= 1;
            }
        }
    }

    return age;
}

module.exports = Age;
