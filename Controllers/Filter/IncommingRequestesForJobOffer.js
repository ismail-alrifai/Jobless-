const Filter = require('../../Classes/Filters/myFilters');

// ======================================= //

exports.Age = async (list ,val) => {
    const filter = new Filter.Age(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.GenderOfUser = async (list ,val) => {
    const filter = new Filter.GenderOfUser(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.Graduate = async (list ,val) => {
    const filter = new Filter.Graduate(list);
    return await filter.applyFilter(val);
}

// ======================================= //