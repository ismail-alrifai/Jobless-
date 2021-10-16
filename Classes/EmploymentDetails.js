exports.get = (employmentDetail) => {
    return employmentDetail != null ? {
        id              : employmentDetail.id,
        date_of_start   : employmentDetail.date_of_start,
        date_of_end     : employmentDetail.date_of_end,
        title           : employmentDetail.title,
        city            : employmentDetail.city,
        country         : employmentDetail.country,
        details         : employmentDetail.details,
        user_id         : employmentDetail.user_id
    } : null;
}