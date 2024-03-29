import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utilities/error";

export const calculatePrice = (req:Request, res:Response, next:NextFunction) => {
    try {
        if(true)
            throw new ErrorHandler(500, 'Internal Server hello Error') 
    } catch (error) {
        return next(error);
    }
};
