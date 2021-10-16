// return basic details module

exports.get = (basicDetail) => {
    return basicDetail != null ? {
        id              : basicDetail.id,
        first_name      : basicDetail.first_name,
        last_name       : basicDetail.last_name,
        email           : basicDetail.email,
        birthday_date   : basicDetail.birthday_date,
        gender          : basicDetail.gender,
        phone_number    : basicDetail.phone_number
    } : null;
}