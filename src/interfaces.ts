/* eslint-disable @typescript-eslint/ban-types */
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export type TLinkCatalogControllerOptions = {
    constructor: Function
    id_controller: string
    id_server: string
    prefix: string
}

export type TLinkCatalogRouteOptions = {
    id_controller: string
    name: string
    id_server: string
    method: "DELETE" | "GET" | "POST" | "HEAD" | "OPTIONS" | "PUT" | "PATCH"
    path: string
}

export type TLinkCatalogRouteList = {
    [key: string]: ILinkCatalogRoute
}

export type TLinkCatalogControllerList = {
    [key: string]: ILinkCatalogController
}

export interface ILinkCatalog {
    addController: (options: TLinkCatalogControllerOptions) => void
    addRoute: (options: TLinkCatalogRouteOptions) => void
    calc: (id_server: string, fastify_app: FastifyInstance) => void
}

export interface ILinkCatalogController {
    readonly constructor_fn: Function
    readonly id: string
    readonly prefix: string
}

export interface ILinkCatalogRoute {
    readonly id: string
    readonly name: string
    readonly controller: string
    readonly path: string
    readonly method: "DELETE" | "GET" | "POST" | "HEAD" | "OPTIONS" | "PUT" | "PATCH"
}

export interface ILinkCatalogServer {
    readonly id: string
    readonly controllers: TLinkCatalogControllerList
    readonly routes: TLinkCatalogRouteList
    addController: (options: TLinkCatalogControllerOptions) => void
    addRoute: (options: TLinkCatalogRouteOptions) => void
}

export interface IFastifyContext {
    fastify: FastifyInstance,
    request: FastifyRequest, 
    reply: FastifyReply
}