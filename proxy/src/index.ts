require("dotenv").config();
import * as express from "express";
import { connect } from "@holochain/hc-web-client";
import { text } from "body-parser";
import * as basicAuth from "express-basic-auth";

// hopefully there is away to store this in holo as well...
const addresses: { [key: string]: string } = {};

const start = async (): Promise<void> => {
  console.log(`Connecting to holochain on ${process.env.HOLOCHAIN_URL}...`);
  const connection = await connect(process.env.HOLOCHAIN_URL);
  console.log("Connected");

  const app = express();

  app.use(text());

  app.post(
    "/deploy",
    basicAuth({
      users: {
        admin: process.env.ADMIN_PASSWORD!
      },
      unauthorizedResponse: () => "Unauthorized"
    }),
    async (req, res) => {
      try {
        const url: string = req.query.url;
        const content = req.body;

        const result = await connection.call(
          `${process.env.HOLOCHAIN_INSTANCE}/server/create_resource`
        )({
          entry: {
            content
          }
        });

        const data = JSON.parse(result);

        if (!data.Ok) {
          return res.status(400).send({
            error: "An error occurred",
            data
          });
        }

        addresses[url] = data.Ok;
        console.log(`Deployed ${url} to key ${data.Ok}`);

        res.send("ok");
      } catch (e) {
        console.error(e);
        res.status(400).send({
          error: e.message
        });
      }
    }
  );

  app.all("*", async (req, res) => {
    try {
      let url = req.originalUrl;

      if (url.endsWith("/")) {
        url += "index.html";
      }

      if (!addresses[url]) {
        return res.status(404).send(`Nothing found for url ${url}`);
      }
      const result = await connection.call(
        `${process.env.HOLOCHAIN_INSTANCE}/server/get_resource`
      )({
        address: addresses[url]
      });
      const data = JSON.parse(result);

      if (!data.Ok) {
        return res.status(400).send({
          error: "An error occurred",
          data
        });
      }

      const resource = JSON.parse(data.Ok.App[1]);
      res.send(resource.content);
    } catch (e) {
      console.error(e);
      res.status(400).send({
        error: e.message
      });
    }
  });

  await app.listen(parseInt(process.env.PORT!, 10), process.env.HOST!);
  console.log(`Online at ${process.env.HOST}:${process.env.PORT}`);
};

start();
