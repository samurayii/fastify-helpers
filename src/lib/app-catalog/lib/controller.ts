/* eslint-disable @typescript-eslint/ban-types */
import { ILinkCatalogController, TLinkCatalogControllerOptions } from "../../../interfaces";

export class LinkCatalogController implements ILinkCatalogController {

    constructor (
        private readonly _config: TLinkCatalogControllerOptions
    ) {}

    get constructor_fn (): Function {
        return this._config.constructor;
    }

    get id (): string {
        return this._config.id_controller;
    }

    get prefix (): string {
        return this._config.prefix;
    }

}