import fastify from "../../src";
import * as pino from "pino";
import { FastifyInstance } from "fastify";
import fetch from "node-fetch";
import { expect } from "chai";
import "./basic/controller";
import "./basic/controller-prefix";
import "./basic/controller-d-prefix";
import "./basic/controller-args";

describe("Basic methods", () => {

    let app: FastifyInstance;

    const port = 3000;

    beforeAll(async () => {

        const logger = pino({
            prettyPrint: false,
            level: "warn"
        });
        
        app = fastify({
            logger: logger
        });

        await app.listen(port);

    });

    describe("no prefix", () => {

        it("GET /", async () => {
            const response = await fetch(`http://localhost:${port}/`);
            expect(response.status).equal(200);
            const data = await response.json();
            expect(data.message).equal("get");
        });
    
        it("POST /", async () => {
            const response = await fetch(`http://localhost:${port}/`, { method: "POST"});
            expect(response.status).equal(200);
        });
    
        it("HEAD /", async () => {
            const response = await fetch(`http://localhost:${port}/`, { method: "HEAD"});
            expect(response.status).equal(200);
        });
    
        it("PUT /", async () => {
            const response = await fetch(`http://localhost:${port}/`, { method: "PUT"});
            expect(response.status).equal(200);
        });
    
        it("OPTIONS /", async () => {
            const response = await fetch(`http://localhost:${port}/`, { method: "OPTIONS"});
            expect(response.status).equal(200);
        });
    
        it("PATCH /", async () => {
            const response = await fetch(`http://localhost:${port}/`, { method: "PATCH"});
            expect(response.status).equal(200);
        });
    
        it("DELETE /", async () => {
            const response = await fetch(`http://localhost:${port}/`, { method: "DELETE"});
            expect(response.status).equal(200);
        });

    });

    describe("get args", () => {

        it("GET /", async () => {
            const response = await fetch(`http://localhost:${port}/args/hello`);
            expect(response.status).equal(200);
            const data = await response.json();
            expect(data.message).equal("hello");
        });

    });

    describe("method path", () => {

        it("GET /get", async () => {
            const response = await fetch(`http://localhost:${port}/get`);
            expect(response.status).equal(200);
        });
    
        it("POST /post", async () => {
            const response = await fetch(`http://localhost:${port}/post`, { method: "POST"});
            expect(response.status).equal(200);
        });
    
        it("HEAD /head", async () => {
            const response = await fetch(`http://localhost:${port}/head`, { method: "HEAD"});
            expect(response.status).equal(200);
        });
    
        it("PUT /put", async () => {
            const response = await fetch(`http://localhost:${port}/put`, { method: "PUT"});
            expect(response.status).equal(200);
        });
    
        it("OPTIONS /options", async () => {
            const response = await fetch(`http://localhost:${port}/options`, { method: "OPTIONS"});
            expect(response.status).equal(200);
        });
    
        it("PATCH /patch", async () => {
            const response = await fetch(`http://localhost:${port}/patch`, { method: "PATCH"});
            expect(response.status).equal(200);
        });
    
        it("DELETE /delete", async () => {
            const response = await fetch(`http://localhost:${port}/delete`, { method: "DELETE"});
            expect(response.status).equal(200);
        });

    });

    describe("controller prefix", () => {

        const prefix = "api";

        it(`GET /${prefix}`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/`);
            expect(response.status).equal(200);
        });
    
        it(`POST /${prefix}`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/`, { method: "POST"});
            expect(response.status).equal(200);
        });
    
        it(`HEAD /${prefix}`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/`, { method: "HEAD"});
            expect(response.status).equal(200);
        });
    
        it(`PUT /${prefix}`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/`, { method: "PUT"});
            expect(response.status).equal(200);
        });
    
        it(`OPTIONS /${prefix}`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/`, { method: "OPTIONS"});
            expect(response.status).equal(200);
        });
    
        it(`PATCH /${prefix}`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/`, { method: "PATCH"});
            expect(response.status).equal(200);
        });
    
        it(`DELETE /${prefix}`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/`, { method: "DELETE"});
            expect(response.status).equal(200);
        });

    });

    describe("controller prefix+path", () => {

        const prefix = "api2";

        it(`GET /${prefix}/get`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/get`);
            expect(response.status).equal(200);
        });
    
        it(`POST /${prefix}/post`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/post`, { method: "POST"});
            expect(response.status).equal(200);
        });
    
        it(`HEAD /${prefix}/head`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/head`, { method: "HEAD"});
            expect(response.status).equal(200);
        });
    
        it(`PUT /${prefix}/put`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/put`, { method: "PUT"});
            expect(response.status).equal(200);
        });
    
        it(`OPTIONS /${prefix}/options`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/options`, { method: "OPTIONS"});
            expect(response.status).equal(200);
        });
    
        it(`PATCH /${prefix}/patch`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/patch`, { method: "PATCH"});
            expect(response.status).equal(200);
        });
    
        it(`DELETE /${prefix}/delete`, async () => {
            const response = await fetch(`http://localhost:${port}/${prefix}/delete`, { method: "DELETE"});
            expect(response.status).equal(200);
        });

    });

    afterAll(async () => {
        await app.close();
    });

});