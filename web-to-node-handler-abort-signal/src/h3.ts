import { fromWebHandler } from "h3";
import { handler } from "./handler";

export default fromWebHandler(handler);
