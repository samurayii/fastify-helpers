import { FastifyInstance } from "fastify";
import { ILinkCatalog, ILinkCatalogServer, TLinkCatalogControllerOptions, TLinkCatalogRouteOptions } from "../../interfaces";
import { LinkCatalogServer } from "./lib/server";
import { calc } from "./lib/calc";

class LinkCatalog implements ILinkCatalog {

    private readonly _catalog: {
        [key: string]: ILinkCatalogServer
    }

    constructor () {
        this._catalog = {};
    }

    private _createApp (id_server: string): void {

        if (this._catalog["default"] === undefined) {
            this._catalog["default"] = new LinkCatalogServer("default");
        }

        if (this._catalog[id_server] === undefined) {
            this._catalog[id_server] = new LinkCatalogServer(id_server);
        }

    }

    addController (options: TLinkCatalogControllerOptions): void {

        this._createApp(options.id_server);

        this._catalog[options.id_server].addController(options);

    }

    addRoute (options: TLinkCatalogRouteOptions): void {
        
        this._createApp(options.id_server);

        this._catalog[options.id_server].addRoute(options);

    }

    calc (id_server: string, fastify_app: FastifyInstance): void {

        if (this._catalog["default"] !== undefined) {
            const app = this._catalog["default"];
            calc(id_server, app, fastify_app);
            delete this._catalog["default"];
        }

        if (this._catalog[id_server] !== undefined) {
            const app = this._catalog[id_server];
            calc(id_server, app, fastify_app);
            delete this._catalog[id_server];
        }

    }

}

const link_catalog = new LinkCatalog();

export default link_catalog;