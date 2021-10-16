const db = require('../myDB');

// =========================================== //

exports.addFreelnceJobOffer = async (user_id ,date_of_publication ,title ,description ,image ,wage ,deadline ,skills) => {
    return await db.FreelanceJobOffer.create({
        date_of_publication : date_of_publication,
        description         : description,
        deadline            : deadline,
        user_id             : user_id,
        skills              : skills,
        title               : title,
        image               : image,
        wage                : wage
    });
}

// =========================================== //
// =========================================== //
// =========================================== //

exports.addFrJobOfferArchive = async (freelancer_id ,frJoboffer) => {
    return await db.FreelancerJobArchive.create({
        freelancer_id   : freelancer_id,
        description     : frJoboffer["description"],
        deadline        : frJoboffer["deadline"],
        user_id         : frJoboffer["user_id"],
        title           : frJoboffer["title"],
        wage            : frJoboffer["wage"]
    });
}