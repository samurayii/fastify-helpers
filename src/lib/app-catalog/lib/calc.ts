/* eslint-disable @typescript-eslint/ban-types */
import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import { IFastifyContext, ILinkCatalogServer } from "../../../interfaces";

type TControllerInstance = {
    [key: string]: Function
}

export async function calc (id_server: string, app: ILinkCatalogServer, fastify_app: FastifyInstance): Promise<void> {

    const controllers = app.controllers;
    const routes = app.routes;
    
    for (const controller_id in controllers) {

        await fastify_app.register((instance: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error) => void) => {

            const controller = controllers[opts._controller_id];
            const constructor = controller.constructor_fn as FunctionConstructor;
            const controller_instance = (new constructor()) as unknown as TControllerInstance;

            const binded_urls: string[] = [];

            for (const id_route in routes) {

                const route = routes[id_route];

                if (route.controller !== controller.id) {
                    continue;
                }

                if (controller_instance[route.name] === undefined) {
                    fastify_app.log.fatal(`Controller "${route.controller}" does not have a method "${route.name}"`);
                    process.exit(1);
                }

                let url = route.path;

                if (url.length > 1) {
                    url = url.replace(/(^\/|\/$)/g, "");
                }

                const options: RouteOptions = {
                    method: route.method,
                    handler: function (...args) {

                        const context: IFastifyContext = {
                            fastify: instance,
                            request: args[0],
                            reply: args[1]
                        };

                        // eslint-disable-next-line prefer-spread
                        controller_instance[route.name].apply(controller_instance, [context]);
                    },
                    url: `/${url}`
                };

                instance.route(options);

                if (binded_urls.includes(`${route.method} ${options.url}`) === true) {
                    fastify_app.log.fatal(`Route "${route.method} ${options.url}" of controller "${route.controller}" already exist`);
                    process.exit(1);
                }

                binded_urls.push(`${route.method} ${options.url}`);

                fastify_app.log.debug(`Route "${route.method} ${instance.prefix}${options.url}" binded to "${id_server}" port`);

            }

            done();

        }, {
            prefix: controllers[controller_id].prefix,
            _controller_id: controller_id
        });

    }

}
