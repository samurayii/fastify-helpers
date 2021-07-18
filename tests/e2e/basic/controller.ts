
import { IFastifyContext } from "../../../src";
import { Delete, Controller, Get, Post, Head, Options, Put, Patch } from "../../../src";

@Controller("/")
export class Controller1 {

    private readonly _check_var: string

    constructor () {
        this._check_var = "get";
    }

    @Get()
    async get_fn (context: IFastifyContext): Promise<void> {
        context.reply.send({ message: this._check_var });
    }

    @Post()
    async post_fn (context: IFastifyContext): Promise<void> {
        context.reply.send({ message: "post" });
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

    @Get("/get")
    async get_fn_pr (context: IFastifyContext): Promise<void> {
        context.reply.send({ hello: "get" });
    }

    @Post("/post")
    async post_fn_pr (context: IFastifyContext): Promise<void> {
        context.reply.send({ hello: "post" });
    }

    @Delete("/delete")
    async delete_fn_pr (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Head("/head")
    async head_fn_pr (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Options("/options")
    async options_fn_pr (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Put("/put")
    async put_fn_pr (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

    @Patch("/patch")
    async patch_fn_pr (context: IFastifyContext): Promise<void> {
        context.reply.send();
    }

}