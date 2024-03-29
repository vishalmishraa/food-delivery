import { eq } from 'drizzle-orm';
import { ErrorHandler } from '../utilities/error.js';
import { db } from '../db/index.js';
import { Organnization } from '../db/schema.js';

export const newOrganization = async (req, res, next) => {
    try {
        const { organization_name } = await req.body;

        // Validate payload
        if (!organization_name) {
            return next(new ErrorHandler(400, 'Please provide all data fields'));
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
    } catch (error) {
        return next(error);
    }
};

// get all organizations
export const getAllOrganization = async (req, res, next) => {
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
