import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { db } from '../db/index';
import { ErrorHandler } from "../utilities/error";
import { Organnization } from '../db/schema';
import * as z from 'zod'

const OrganizationSchema = z.object({
    organization_name: z.string().min(1),
})


export const newOrganization = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
        const { organization_name } =  OrganizationSchema.parse(req.body);

        // Validate payload
        if (!organization_name) {
            throw new ErrorHandler(400, 'Please provide all data fields');
        }

        // search for organization if found return error else create it.
        const organization = await db
            .select()
            .from(Organnization)
            .where(eq(Organnization.name, organization_name));

        if (organization.length > 0) {
            throw new ErrorHandler(400, 'Organization already exists');
        }

        await db.insert(Organnization).values({ name: organization_name });

        return res.status(200).json({
            success: true,
            message: 'Organization created successfully',
        });
    } catch (error:any) {
        return next(error)
    }
};

// get all organizations
export const getAllOrganization = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const organizations = await db
            .select()
            .from(Organnization);

        return res.status(200).json({
            success: true,
            organizations,
        });
    } catch (error) {
        return next(error);
    }
};
