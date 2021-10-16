// return freelancer module

exports.get = (freelancer ,basic_detail ,additional_detail ,educational_detail ,previousWorks ,rate) => {
    return {
        id                          : freelancer.id,
        basic_detail                : basic_detail,
        additional_detail           : additional_detail,
        educational_detail          : educational_detail,
        previous_works              : previousWorks,

        rate                        : rate + 0.1,
        portofilo                   : freelancer.portofilo,
        date_of_account_creation    : freelancer.date_of_account_creation,
        educational_details_id      : freelancer.educational_details_id,
        additional_details_id       : freelancer.additional_details_id,
        basic_details_id            : freelancer.basic_details_id,
    };
}