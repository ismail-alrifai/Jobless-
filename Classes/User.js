// return user module

exports.get = (user ,basic_detail ,additional_detail ,educational_detail ,employmentDetails) => {
    return {
        id : user.id,

        basic_detail : basic_detail != null ? {
            id              : basic_detail.id,
            first_name      : basic_detail.first_name,
            last_name       : basic_detail.last_name,
            email           : basic_detail.email,
            birthday_date   : basic_detail.birthday_date,
            gender          : basic_detail.gender,
            phone_number    : basic_detail.phone_number
        } : null,

        additional_detail          : additional_detail,
        educational_detail         : educational_detail,
        employment_details         : employmentDetails,

        date_of_account_creation    : user.date_of_account_creation,
        educational_details_id      : user.educational_details_id,
        additional_details_id       : user.additional_details_id,
        basic_details_id            : user.basic_details_id,
    };
}