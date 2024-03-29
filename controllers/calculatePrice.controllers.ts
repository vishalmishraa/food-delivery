import { NextFunction, Request, Response } from "express";

export const calculatePrice = (req:Request, res:Response, next:NextFunction) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Price calculated successfully',
        });
    } catch (error) {
        return next(error);
    }
};
