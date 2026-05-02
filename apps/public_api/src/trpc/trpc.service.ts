import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter, createTRPCContext } from '@big-summary-monorepo/trpc';

@Injectable()
export class TrpcService {
    // Этот метод мы вызовем в main.ts
    applyMiddleware(app: INestApplication) {
        app.use(
            '/trpc',
            trpcExpress.createExpressMiddleware({
                router: appRouter,
                createContext: createTRPCContext,
            }),
        );
    }
}
