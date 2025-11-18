import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
