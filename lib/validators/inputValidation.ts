import * as z from 'zod'

export const calculatePriceSchema = z.object({
    zone: z.string().min(1,{message: 'Zone is required'}),
    organization_id: z.number().min(1,{}),
    item_type: z.enum(['perishable','non-perishable']),
    item_description: z.string().min(1),
    total_distance: z.number().min(1),
});

export const createItemSchema = z.object({
    organization_id: z.number().min(1),
    type: z.enum(['perishable','non-perishable']),
    description: z.string().min(1),
});

export const OrganizationSchema = z.object({
    organization_name: z.string().min(1),
})

export const priceStructureSchema = z.object({
    organization_id: z.number().min(1),
    zone: z.string().min(1),
    item_id: z.number().min(1),   
    base_distance_in_km: z.number().min(1),
    km_price: z.number().min(1),
    fix_price: z.number().min(1),
   
});