// apps/api/src/trpc/trpc.controller.ts
import { All, Controller, Get, Next, Req, Res } from '@nestjs/common';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import { TrpcRouterService } from './trpc.router.service';
import { TrpcService } from './trpc.service'; // твой сервис для контекста
import { renderTrpcPanel } from '@aeolun/trpc-ui';
import { expressHandler } from 'trpc-playground/handlers/express';






@Controller('trpc')
export class TrpcController {
    constructor(
        private readonly routerService: TrpcRouterService,
        private readonly trpcService: TrpcService
    ) { }



    @All(':path')
    async handle(@Req() req, @Res() res) {
        return nodeHTTPRequestHandler({
            path: req.params.path,
            req,
            res,
            router: this.routerService.appRouter,
            createContext: () => this.trpcService.create(),
        });
    }
}
function renderTrpcPlayground(arg0: { router: any; config: { endpoint: string; }; }) {
    throw new Error('Function not implemented.');
}

