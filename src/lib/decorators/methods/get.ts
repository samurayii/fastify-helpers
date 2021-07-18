/* eslint-disable @typescript-eslint/ban-types */
import LinkCatalog from "../../app-catalog";

export function Get (path: string = "", app_id: string = "default"): Function {

    path = `${path.replace(/(^\/|\/$)/ig, "")}`;

    return function (target: unknown, name: string) {

        LinkCatalog.addRoute({
            id_controller: target.constructor.name,
            name: name,
            id_server: app_id,
            method: "GET",
            path: path
        });

    };

}