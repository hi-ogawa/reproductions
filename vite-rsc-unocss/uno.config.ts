import { defineConfig } from "unocss";
import presetWind3 from "@unocss/preset-wind3";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  shortcuts: [
    [
      "btn",
      "rounded-lg border-0 px-3 py-2 text-base font-medium font-inherit cursor-pointer transition",
    ],
    ["link", "font-medium text-blue-500 no-underline hover:text-blue-400"],
  ],
  presets: [
    presetWind3(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
});
