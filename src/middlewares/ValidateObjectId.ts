import InvalidIDException from 'exceptions/InvalidID';

const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) next(new InvalidIDException());
    next();
};
