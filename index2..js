import { and, eq } from 'drizzle-orm';
import { db } from './db/index.js';
import { Organnization } from './db/schema.js';

async function test(params) {
    const data = await db.select().from(Organnization).where(
        and(
            eq(Organnization.id, 5),
            eq(Organnization.name, 'TastyTreats'),
        ),
    );

    if (data.length > 0) {
        console.log(data);
    } else {
        console.log('No data found');
    }
}

test();
