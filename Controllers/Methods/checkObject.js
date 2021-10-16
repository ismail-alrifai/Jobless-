// function that check if object has values or not

// return true  if obj == null
// return false if obj != null

function check(obj) {

    if( typeof obj === "object" ){

        if( obj !== [] ) {

            for (let key in obj) {

                if( key === "id" ){
                    continue;
                }

                 if( !check(obj[key]) ){
                    return false;
                }
            }
        }

        return true;
    }

    if( typeof obj === "string" ) return obj === "";

    return obj == null;
}

module.exports = check;