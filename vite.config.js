import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                sass: resolve(__dirname, "SASS.html"),
                animation: resolve(__dirname, "animation.html"),
                movingobjects: resolve(__dirname, "movingobjects.html"),
                interaction: resolve(__dirname, "interaction.html"),
                diagram: resolve(__dirname, "diagram.html"),
                map: resolve(__dirname, "map.html")
            }
        }
    },
    css: {
        devSourcemap: true
    }
});
