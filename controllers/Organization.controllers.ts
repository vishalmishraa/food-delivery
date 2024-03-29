import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { db } from '../db/index';
import { Organnization } from '../db/schema';

export const newOrganization = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { organization_name } = await req.body;

        // Validate payload
        if (!organization_name) {
        
            return res.json({
                success: false,
                message: 'Organization name is required',
            });
        }

        // search for organization if found return error else create it.
        const organization = await db
            .select()
            .from(Organnization)
            .where(eq(Organnization.name, organization_name));

        if (organization.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Organization already exist',
            });
        }

        await db.insert(Organnization).values({ name: organization_name });

        return res.status(200).json({
            success: true,
            message: 'Organization created successfully',
        });
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            message: error,
            });
    }
};

// get all organizations
export const getAllOrganization = async (req:Request, res:Response, next:NextFunction) => {
   console.log('get all organization');
   
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
