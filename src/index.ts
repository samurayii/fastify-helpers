import { fastify as fastify_o, FastifyInstance } from "fastify";
import LinkCatalog from "./lib/app-catalog";

const fastify = new Proxy(fastify_o, {
    apply(target, thisArg, args) {

        const server_proxy = new Proxy(target.apply(thisArg, args), {
            get(target, prop) {
                if (prop === "listen") {
            
                    const ready_function_proxy = new Proxy(Reflect.get(target, prop), {
                        apply(target, thisArg: FastifyInstance, args) {

                            if (typeof args[0] === "object") {
                                LinkCatalog.calc(`${args[0].port}`, thisArg);
                            } else {
                                LinkCatalog.calc(`${args[0]}`, thisArg);
                            }

                            return target.apply(thisArg, args);
                        }
                    });

                    return ready_function_proxy;

                } else {
                    return Reflect.get(target, prop);
                }
            }
        });

        return server_proxy;
    }
});

export default fastify;

export * from "./lib/decorators";
export * from "./interfaces";
