import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utilities/error";
import * as z from "zod";
import { and, eq } from "drizzle-orm";
import { Item, Organnization } from "../db/schema";
import { db } from "../db";


const itemSchema = z.object({
    type: z.enum(["perishable", "non-perishable"]),
    description: z.string().min(1),
    organization_id: z.number().min(1),
});


export const addItem = async (req: Request, res: Response, next:NextFunction) => {
    try {
        itemSchema.parse(req.body);

        const { type, description, organization_id } = req.body;

        const organization = await db
            .select()
            .from(Organnization)
            .where(eq(Organnization.id, organization_id));

        if (organization.length < 1) {
            throw new ErrorHandler(400, "Organization not found")
        }

        const item = await db
            .select()
            .from(Item)
            .where(
                    and(
                        eq(Item.type, type), 
                        eq(Item.description, description), 
                        eq(Item.organization_id, organization_id)
                    )
            );

        if(item.length > 0) {
            throw new ErrorHandler(400, "Item already exists")
        };
        
        await db.insert(Item).values({
            type,
            description,
            organization_id
        });

        res.status(201).json({
            success: true,
            message: "Item added successfully"
        });

    } catch (error) {
        return next(error)
    }
    next();
}

export const getAllItems = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const item = await db
            .select()
            .from(Item);

        if(item.length < 1) {
            throw new ErrorHandler(404, "No items found")
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        next(error)
    }
}

