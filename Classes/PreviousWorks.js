exports.get = (previousWork) => {
    return previousWork != null ? {
        id            : previousWork.id,
        link          : previousWork.link,
        freelancer_id : previousWork.freelancer_id
    } : null;
}