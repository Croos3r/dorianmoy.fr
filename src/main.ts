import { inject } from "@vercel/analytics";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import i18n from "./i18n";
import "./lib/theme";
import "./lib/language";

const app = createApp(App);
app.use(i18n);
inject();
app.mount("#app");
