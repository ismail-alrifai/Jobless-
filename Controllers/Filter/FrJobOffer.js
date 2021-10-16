const Filter = require('../../Classes/Filters/myFilters');

// ======================================= //

exports.Wage = async (list ,val) => {
    const filter = new Filter.Wage(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.PublishDate = async (list ,val) => {
    const filter = new Filter.PublishDate(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.rateFreelancer = async (list ,val) => {
    const filter = new Filter.Rate(list);
    return await filter.applyFilter(val);
}

// ======================================= //