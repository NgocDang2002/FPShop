// validation/statistical.validation.js

const Joi = require('joi');

const getSalesStatistics = {
    query: Joi.object().keys({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
    }),
};

module.exports = {
    getSalesStatistics,
};
