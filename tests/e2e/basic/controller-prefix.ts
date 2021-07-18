
import { Delete, Controller, Get, Post, Head, Options, Put, Patch, IFastifyContext } from "../../../src";

@Controller("/api")
export class ControllerPrefix {

    @Get()
    async get_fn (context: IFastifyContext): Promise<void> {
        context.reply.send({ hello: "get" });
    }

    @Post()
    async post_fn (context: IFastifyContext): Promise<void> {
        context.reply.send({ hello: "post" });
    }

    @Delete()
    async delete_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Head()
    async head_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Options()
    async options_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Put()
    async put_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Patch()
    async patch_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

}