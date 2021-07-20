import fastify from "../src";
import * as pino from "pino";
import "./e2e/basic/controller";
import "./e2e/basic/controller-prefix";
import "./e2e/basic/controller-d-prefix";
import "./e2e/basic/controller-args";

const logger = pino({
    prettyPrint: true,
    level: "trace"
});

const server = fastify({
    logger: logger
});

const bootstrap = async () => {

    await server.register( (instance, opts, done) => {   
        instance.listen(3000);
        done();
    }, {
        prefix: "/hello"
    });
    
    console.log(server.printRoutes());

};

bootstrap();