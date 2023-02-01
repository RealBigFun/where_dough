// lib/trpc/router.ts
import { initTRPC, TRPCError } from '@trpc/server';
import delay from 'delay';

import { getUserById,getUsers,writeUser } from '$lib/server/db/users';
import type { Context } from '$lib/trpc/context';
import type { User } from '$lib/types/users';

export const t = initTRPC.context<Context>().create();

export const router = t.router({
  greeting: t.procedure.query(async () => {
    await delay(500); // 👈 simulate an expensive operation
    return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
  }),
  createUser: t.procedure
    .input((val:unknown): User => {
        if (typeof val !== 'object' || val === null) {
            throw new TRPCError( {
                message: 'input must be an object' ,
                code: 'BAD_REQUEST'
            });
        }
        const { name, email } = val as Record<string, unknown>;
        if (typeof name !== 'string') {
            throw new TRPCError( {
                message: 'name must be a string' ,
                code: 'BAD_REQUEST'
            });
        }
        if (typeof email !== 'string') {
            throw new TRPCError( {
                message: 'email must be a string' ,
                code: 'BAD_REQUEST'
            });
        }
        return { name, email };
    })
    .mutation(async (req) => {
    const user = await writeUser(req.input);
    return user;
  }),
  getUser: t.procedure
    .input((val:unknown): string => {
        if (typeof val !== 'string') {
            throw new TRPCError( {
                message: 'input must be a string' ,
                code: 'BAD_REQUEST'
            });
        }
        return val;
    })
    .query(async (req) => {
    const user = await getUserById(req.input);
    return user;
  }),
  listUsers: t.procedure.query(async () => {
    const users = await getUsers();
    return users;
  })
});

export type Router = typeof router;
