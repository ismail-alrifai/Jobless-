// return basic details module

exports.get = (account) => {
    return account != null ? {
        id          : account.id,
        twitter     : account.twitter,
        instagram   : account.instagram,
        linkedin    : account.linkedin,
        gmail       : account.gmail,
        facebook    : account.facebook,
        telegram    : account.telegram
    } : null;
}