// return basic details module

exports.get = (position) => {
    return position != null ? {
        id          : position.id,
        city        : position.city,
        country     : position.country,
        longitude   : position.longitude,
        latitude    : position.latitude
    } : null
}