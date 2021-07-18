/* eslint-disable @typescript-eslint/ban-types */
import LinkCatalog from "../app-catalog";

export function Controller (prefix: string = "", app_id: string = "default"): Function {

    prefix = `${prefix.replace(/(^\/|\/$)/ig, "")}`;

    if (prefix.length > 0) {
        prefix = `/${prefix}`;
    }

    return function (constructor: Function) {

        LinkCatalog.addController({
            constructor: constructor,
            id_controller: constructor.name,
            id_server: app_id,
            prefix: prefix
        });

    };

}

