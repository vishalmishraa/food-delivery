import { and, eq } from 'drizzle-orm';
import { db } from '../db/index';
import { Item, Organnization, Pricing } from '../db/schema';
import { Request, Response } from 'express';
import * as z from 'zod'

const priceStructureSchema = z.object({
    organization_id: z.number().min(1),
    pricingStructures: z.array(z.object({
        zone: z.string().min(1),
        item_type: z.string().min(1),
        item_description: z.string().min(1),
        base_distance_in_km: z.number().min(1),
        km_price: z.number().min(1),
        fix_price: z.number().min(1),
    })),
})

export const priceStructure = async (req:Request, res:Response) => {
    try {
        
        //validating the request body
        priceStructureSchema.parse(req.body);
        
        
        const { organization_id, pricingStructures } = req.body;

        // Validate payload
        if (!organization_id || !pricingStructures || !Array.isArray(pricingStructures)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all data fields',
            });
        }

        if (pricingStructures.length < 1) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one pricing structure',
            });
        }

        const tasks = pricingStructures.map(async (structure) => {
            const {
                zone, item_type, item_description, base_distance_in_km, km_price, fix_price,
            } = structure;

            if (!zone || !item_type || !base_distance_in_km || !km_price || !fix_price) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all data fields',
                });
            }

            // search for organization
            const organization = await db
                .select()
                .from(Organnization)
                .where(eq(Organnization.id, organization_id));
            if (!organization) {
                return res.status(400).json({
                    success: false,
                    message: 'Organization not found',
                });
            }

            // search for item , if not found create it
            let item = await db
                .select({ id: Item.id })
                .from(Item)
                .where(eq(Item.type, item_type));

            if (item.length < 1) {
                await db
                    .insert(Item)
                    .values({ type : item_type, description: item_description });

                // search for itemId with item type
                item = await db
                    .select({ id: Item.id })
                    .from(Item)
                    .where(eq(Item.type, item_type ));
            }

            const pricing = await db
                .select()
                .from(Pricing)
                .where(
                    and(
                        eq(Pricing.organization_id, organization_id),
                        eq(Pricing.zone, zone),
                        eq(Pricing.item_id, item[0].id),
                    ),
                );

            if (pricing.length > 0) {
                await db.update(Pricing).set({
                    base_distance_in_km,
                    km_price,
                    fix_price,
                }).where(eq(Pricing.id, pricing[0].id));
            } else {
                await db.insert(Pricing).values({
                    organization_id,
                    item_id: item[0].id,
                    zone,
                    base_distance_in_km,
                    km_price,
                    fix_price,
                });
            }
        });

        await Promise.all(tasks);

        res.status(200).json({
            success: true,
            message: 'Pricing structure created/updated successfully',
        });
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
};
