module.exports = strDate => {
    // --- function take string (yyyy/mm/dd) --- //
  
    // get time in milliseconds from 1970
    const timeInMilliseconds = Date.parse(strDate);

    // convert it to date object
    return new Date(timeInMilliseconds);
}