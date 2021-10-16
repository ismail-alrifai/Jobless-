const JobOfferFilter = require("./JobOfferFilter");

class InRadiusJobOffer extends JobOfferFilter{
    constructor(myList) {
        super(myList);
    }

    toRad(deg){
        return deg * Math.PI / 180.0;
    }

    haversineDistance(latitude1 ,longitude1 ,latitude2 ,longitude2) {
        const R = 6371;
        let latDistance = this.toRad(latitude2 - latitude1);
        let lonDistance = this.toRad(longitude2 - longitude1);
        let a = Math.pow(Math.sin(latDistance / 2), 2) +
            Math.cos(this.toRad(latitude1)) * Math.cos(this.toRad(latitude2)) *
            Math.pow(Math.sin(lonDistance / 2), 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    async applyFilter(radius ,latitude ,longitude){
        let newList = [];

        for(let i in this.myList){
            let dist = 2000000000;
            if( this.myList[i].company.position != null ) {
                if( this.myList[i].company.position.longitude != null &&
                    this.myList[i].company.position.latitude != null ){
                        dist = this.haversineDistance(latitude ,longitude ,this.myList[i].company.position.latitude ,this.myList[i].company.position.longitude);
                }
            }

            if( dist <= radius ){
                newList.push(this.myList[i]);
            }
        }

        return newList;
    }
}

module.exports = InRadiusJobOffer;
