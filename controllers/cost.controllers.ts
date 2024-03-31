import { eq , and } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import * as z from 'zod'
import { db } from '../db/index';
import { ErrorHandler } from "../utilities/error";
import { Pricing , Item } from '../db/schema';
import { calculatePriceSchema } from '../lib/validators/inputValidation';


export const calculateCost = async(req:Request, res:Response, next:NextFunction) => {//eslint-disable-line
    try {
         
        const { 
                    zone,
                    organization_id,
                    item_type,
                    item_description,
                    total_distance
                } =  calculatePriceSchema.parse(req.body); 

        //first find item_id to find pricing structure
         const item_id = await db
                .select({ id: Item.id })
                .from(Item)
                .where(
                    and(
                        eq(Item.type, item_type),
                        eq(Item.description, item_description),
                        eq(Item.organization_id,organization_id)
                    ),
                );

        if (item_id.length < 1 ) {
            throw new ErrorHandler(400, 'Item not found');
        }

        //find pricing structure
        const pricing = await db
            .select({
                km_price: Pricing.km_price,
                fix_price: Pricing.fix_price,
                base_distance_in_km: Pricing.base_distance_in_km,
            })
            .from(Pricing)
            .where(
                and(
                    eq(Pricing.zone, zone),
                    eq(Pricing.item_id, item_id[0].id),
                    eq(Pricing.organization_id, organization_id)
                ),
            );

        if (pricing.length < 1) {
            throw new ErrorHandler(400, 'Cost not found for this item in the given zone or organization');
        }

        const total_price = (
                                (total_distance <= pricing[0].base_distance_in_km) ? 
                                pricing[0].fix_price :
                                pricing[0].fix_price + (total_distance - pricing[0].base_distance_in_km) * pricing[0].km_price
                            
                                ).toFixed(2);

        res.json({
            success: true,
            total_price,
        });

    } catch (error) {

        if(error instanceof z.ZodError){
            const message = error.errors[0].message + ' in ' + error.errors[0].path;
            next(new ErrorHandler(400, message));
        }
        
        return next(error);
    }
};
