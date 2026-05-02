// apps/api/src/trpc/trpc.controller.ts
import { All, Controller, Req, Res } from '@nestjs/common';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import { TrpcService } from './trpc.service';
import { appRouter } from '@big-summary-monorepo/trpc'; // ваш главный роутер из пакета

@Controller('trpc')
export class TrpcController {
    constructor(private readonly contextService: TrpcService) { }

    @All(':path') // обрабатывает /trpc/getUser, /trpc/getTasks и т.д.
    async handle(@Req() req, @Res() res) {
        return nodeHTTPRequestHandler({
            path: req.params.path,
            req,
            res,
            router: appRouter,
            createContext: () => this.contextService.create(),
        });
    }
}
