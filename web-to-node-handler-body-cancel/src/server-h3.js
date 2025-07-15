import { H3, serve } from "h3"
import { handler } from "./handler.js"

const app = new H3().get("/", () => handler())

serve(app)
