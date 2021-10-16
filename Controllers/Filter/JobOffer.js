const Filter = require('../../Classes/Filters/myFilters');

// ======================================= //

exports.CityLocation = async (list ,val) => {
    const filter = new Filter.CityLocation(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.CountryLocation = async (list ,val) => {
    const filter = new Filter.CountryLocation(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.EducationLevel = async (list ,val) => {
    const filter = new Filter.EducationLevel(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.Gender = async (list ,val) => {
    const filter = new Filter.Gender(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.Salary = async (list ,val) => {
    const filter = new Filter.Salary(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.PublishDate = async (list ,val) => {
    const filter = new Filter.PublishDate(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.ShiftTimeOfJob = async (list ,val) => {
    const filter = new Filter.ShiftTimeOfJob(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.YearsOfExperience = async (list ,val) => {
    const filter = new Filter.YearsOfExperience(list);
    return await filter.applyFilter(val);
}

// ======================================= //

exports.RadiusJobOffer = async (list ,radius ,latitude ,longitude) => {
    const filter = new Filter.Radius(list);
    return await filter.applyFilter(radius ,latitude ,longitude);
}

// ======================================= //