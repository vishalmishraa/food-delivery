import {
    doublePrecision,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    varchar
} from 'drizzle-orm/pg-core';

export const itemTypeEnum = pgEnum('item_type_enum', ['perishable', 'non-perishable']);

export const Organnization = pgTable('organizations', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

export const Item = pgTable('items', {
    id: serial('id').primaryKey(),
    organization_id: integer('organization_id').references(() => Organnization.id).notNull(),
    type: itemTypeEnum('type').notNull(),
    description: text('description').notNull(),
});

export const Pricing = pgTable('pricing', {
    id: serial('id').primaryKey(),
    organization_id: integer('organization_id').references(() => Organnization.id).notNull(),
    item_id: integer('item_id').references(() => Item.id).notNull(),
    zone: varchar('zone').notNull(),
    base_distance_in_km: integer('base_distance_in_km').notNull(),
    km_price: doublePrecision('km_price').notNull(),
    fix_price: doublePrecision('fix_price').notNull(),
});
