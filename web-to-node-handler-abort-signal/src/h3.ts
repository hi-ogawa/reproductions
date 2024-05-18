import { createApp, fromWebHandler, toNodeListener } from "h3";
import { handler } from "./handler";

export default toNodeListener(createApp().use(fromWebHandler(handler)));
