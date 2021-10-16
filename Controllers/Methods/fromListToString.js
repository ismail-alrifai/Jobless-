exports = myList => {
    if( myList == null || myList.length === 0 ) return null;

    let res = "";

    myList.forEach(element => {
        res += element;
        res += ',';
    });

    return res;
}