import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: "/ra16-homeworks-lifecycles-https-crud/", //для локального запуска - закомментировать
});
