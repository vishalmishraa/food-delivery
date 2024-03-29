import { and, eq } from 'drizzle-orm';
import * as z from 'zod';
import { NextFunction, Request, Response } from 'express';
import { db } from '../db/index';
import { ErrorHandler } from '../utilities/error';
import { Item, Organnization, Pricing } from '../db/schema';

const priceStructureSchema = z.object({
    organization_id: z.number().min(1),
    zone: z.string().min(1),
    item_id: z.number().min(1),   
    base_distance_in_km: z.number().min(1),
    km_price: z.number().min(1),
    fix_price: z.number().min(1),
   
});

export const priceStructure = async (req:Request, res:Response, next:NextFunction) => {
    try {
        // validating the request body
        priceStructureSchema.parse(req.body);

        const { organization_id, zone , item_id , base_distance_in_km , km_price , fix_price} = req.body;

        const organization = await db
                    .select()
                    .from(Organnization)
                    .where(eq(Organnization.id, organization_id));
        
        if (organization.length < 1) {
                throw new ErrorHandler(400, 'Organization not found');               
        }

        const item = await db
                    .select()
                    .from(Item)
                    .where(
                        and(
                            eq(Item.id, item_id),
                            eq(Item.organization_id, organization_id)
                        )
                    )
        if (item.length < 1) {
            throw new ErrorHandler(400, 'Item not found');
            
        }

        const pricing = await db
                    .select()
                    .from(Pricing)
                    .where(
                        and(
                            eq(Pricing.organization_id, organization_id),
                            eq(Pricing.zone, zone),
                            eq(Pricing.item_id, item_id)
                        )
                    )
        
        if (pricing.length > 0) {
            throw new ErrorHandler(400, 'Pricing structure already exists');
        }

        await db.insert(Pricing).values({
            organization_id,
            zone,
            item_id,
            base_distance_in_km,
            km_price,
            fix_price
        });

        res.json({
            success: true,
            message: 'Pricing structure created successfully'
        });

    } catch (error:any) {
        return next(error);
    }
};

export const getAllPricing = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const pricing = await db.select().from(Pricing);
        if (pricing.length < 1) {
            throw new ErrorHandler(404, 'No pricing structure found');
        }

        res.status(200).json({
            success: true,
            data: pricing,
        });
    } catch (error:any) {
        return next(error);
    }
}
