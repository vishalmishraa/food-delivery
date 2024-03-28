import {errorHandler} from '../utilities/error.js'; //eslint-disable-line

export const priceStructure = (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'heheheheheh',
        });
    } catch (error) {
        return next(error);
    }
};
