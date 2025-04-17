import Router from "@koa/router";
import swaggerJSDoc from "swagger-jsdoc";
import { koaSwagger } from "koa2-swagger-ui";

import fs from "fs";
import path from "path";
import yaml from "yaml";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentazione GDR Node",
      version: "1.0.0",
      description: "API Documentation of our gdr",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
// console.log(swaggerSpec);

const yamlData = yaml.stringify(swaggerSpec);
// console.log(yamlData);
fs.writeFileSync(path.join("openapi.yaml"), yamlData);

export const swaggerRoute = new Router().get("/swagger.json", (ctx) => {
  ctx.set("Content-Type", "application/json");
  ctx.body = swaggerSpec;
});

export const swaggerUI = koaSwagger({
  routePrefix: "/docs",
  swaggerOptions: {
    url: "/swagger.json",
  },
});
