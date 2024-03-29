import { ErrorHandler } from '../utilities/error.js'; //eslint-disable-line

export const calculatePrice = (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Price calculated successfully',
        });
    } catch (error) {
        return next(error);
    }
};
