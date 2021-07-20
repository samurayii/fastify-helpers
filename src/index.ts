import { fastify as fastify_o, FastifyInstance } from "fastify";
import LinkCatalog from "./lib/app-catalog";

const getProxyInstance = (instance: FastifyInstance) => {

    return new Proxy(instance, {
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

            }

            if (prop === "register") {

                const register_function_proxy = new Proxy(Reflect.get(target, prop), {
                    apply(target, thisArg: FastifyInstance, args) {

                        args[0] = new Proxy(args[0], {
                            apply(target, thisArg: FastifyInstance, args) {

                                if (args[1] !== undefined) {
                                    if (args[1] === "/") {
                                        args[1] = "";
                                    }
                                }

                                args[0] = getProxyInstance(args[0]);

                                return target.apply(thisArg, args);
                            }
                        });

                        return target.apply(thisArg, args);
                    }
                });

                return register_function_proxy;

            }

            return Reflect.get(target, prop);
        }
    });

};

const fastify = new Proxy(fastify_o, {
    apply(target, thisArg, args) {
        return getProxyInstance(target.apply(thisArg, args));
    }
});

export default fastify;

export * from "fastify";
export * from "./lib/decorators";
export * from "./interfaces";
