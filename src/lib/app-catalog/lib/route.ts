/* eslint-disable @typescript-eslint/ban-types */
import { ILinkCatalogRoute, TLinkCatalogRouteOptions } from "../../../interfaces";

export class LinkCatalogRoute implements ILinkCatalogRoute{

    constructor (
        private readonly _config: TLinkCatalogRouteOptions
    ) {}

    get id (): string {
        return `${this._config.id_controller}:${this._config.method}:${this._config.path}`;
    }
    get name (): string {
        return this._config.name;
    }

    get controller (): string {
        return this._config.id_controller;
    }

    get method (): "DELETE" | "GET" | "POST" | "HEAD" | "OPTIONS" | "PUT" | "PATCH" {
        return this._config.method;
    }

    get path (): string {
        return this._config.path;
    }

}


