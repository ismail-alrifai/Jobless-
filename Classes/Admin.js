// return admin module

exports.get = admin => {
    return {
        date_of_account_creation : admin.date_of_account_creation,
        first_name               : admin.first_name,
        last_name                : admin.last_name,
        email                    : admin.email,
        id                       : admin.id
    };
}