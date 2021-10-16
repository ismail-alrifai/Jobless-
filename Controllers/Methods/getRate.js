exports.getRate = (list) => {
    let sum = 0;
    let cnt = 0;
    
    if( list != null){
        for (let i in list) {
            if (list[i].rate > 0) {
                sum += list[i].rate;
                cnt += 1;
            }
        }
        return cnt === 0 ? 0 :  sum / cnt;
    }

    return sum;
}

