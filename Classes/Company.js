// return company module
exports.get =  (company ,position ,account ,rate) => {
    return {
        date_of_account_creation    : company.date_of_account_creation,
        specialization              : company.specialization,
        description                 : company.description,
        position                    : position, // full object
        account                     : account, // full object
        rating                      : rate + 0.1,
        email                       : company.email,
        image                       : company.image,
        name                        : company.name,
        id                          : company.id
    };
}