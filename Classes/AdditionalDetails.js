// return additional details module
exports.get = (additional_detail ,account ,positon) => {
    return additional_detail != null ? {
        id                  : additional_detail.id,
        image               : additional_detail.image,
        credit_card_number  : additional_detail.credit_card_number,
        nationality         : additional_detail.nationality,
        account_id          : additional_detail.account_id,
        position_id         : additional_detail.position_id,
        account             : account,
        position            : positon
    } : null;
}