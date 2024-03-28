import { errorHandler } from '../utilities/error.js'; //eslint-disable-line

export const newOrganization = (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Price  helllllcalculated successfully',
        });
    } catch (error) {
        return next(error);
    }
};
