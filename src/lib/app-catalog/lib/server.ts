import { ILinkCatalogServer, TLinkCatalogControllerList, TLinkCatalogControllerOptions, TLinkCatalogRouteList, TLinkCatalogRouteOptions } from "../../../interfaces";
import { LinkCatalogController } from "./controller";
import { LinkCatalogRoute } from "./route";
import * as chalk from "chalk";

export class LinkCatalogServer implements ILinkCatalogServer {

    private readonly _controllers_list: TLinkCatalogControllerList
    private readonly _route_list: TLinkCatalogRouteList
    private readonly _prefix_list: string[]

    constructor (
        private readonly _id: string
    ) {
        this._controllers_list = {};
        this._route_list = {};
        this._prefix_list = [];
    }

    get id (): string {
        return this._id;
    }

    get controllers (): TLinkCatalogControllerList {
        return this._controllers_list;
    }

    get routes (): TLinkCatalogRouteList {
        return this._route_list;
    }

    addController (options: TLinkCatalogControllerOptions): void {

        if (this._controllers_list[options.id_controller] !== undefined) {
            console.log(`${chalk.bgRed("[CRITICAL]")} Controller named ${chalk.yellow(options.id_controller)} for ${chalk.yellow(options.id_server)} application already exist`);
            process.exit(1);
        }

        const controller = new LinkCatalogController(options);

        if (this._prefix_list.includes(controller.prefix) === true) {
            console.log(`${chalk.bgRed("[CRITICAL]")} Prefix ${chalk.yellow(controller.prefix)} of controller ${chalk.yellow(controller.id)} for ${chalk.yellow(options.id_server)} application already exist`);
            process.exit(1);
        }

        this._controllers_list[options.id_controller] = new LinkCatalogController(options);

    }

    addRoute (options: TLinkCatalogRouteOptions): void {
        const route = new LinkCatalogRoute(options);
        this._route_list[route.id] = route;
    }

}