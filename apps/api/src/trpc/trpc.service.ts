


import { Injectable } from '@nestjs/common';
import { createTRPCContext } from '@big-summary-monorepo/trpc';

@Injectable()
export class TrpcService {

    async create() {
        return createTRPCContext(); // Возвращает { pg: pgPrisma }
    }
}
