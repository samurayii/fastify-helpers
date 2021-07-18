
import { IFastifyContext } from "../../../src";
import { Controller, Get } from "../../../src";

@Controller("/args")
export class ControllerArgs {

    @Get("/:text")
    async get_fn (context: IFastifyContext): Promise<void> {
        const params = context.request.params as {text: string};
        context.reply.send({ message: params.text });
    }

}