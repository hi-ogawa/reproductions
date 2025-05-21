import express from "express";
import { renderRequest } from "@parcel/rsc/node";
import { Root } from "./root";

const app = express();

app.use(express.static("dist"));

app.get("/", async (req, res) => {
  await renderRequest(req, res, <Root url={req.url} />, {
    component: Root as any,
  });
});

app.listen(3001);
console.log("Server listening on port 3001 (http://localhost:3001)");
