
import { Delete, Controller, Get, Post, Head, Options, Put, Patch, IFastifyContext } from "../../../src";

@Controller("/api2/")
export class ControllerDPrefix {

    @Get("/get")
    async get_fn (context: IFastifyContext): Promise<void> {
        context.reply.send({ hello: "get" });
    }

    @Post("/post/")
    async post_fn (context: IFastifyContext): Promise<void> {
        context.reply.send({ hello: "post" });
    }

    @Delete("/delete")
    async delete_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Head("/head")
    async head_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Options("/options")
    async options_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Put("/put")
    async put_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Patch("/patch")
    async patch_fn (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

}