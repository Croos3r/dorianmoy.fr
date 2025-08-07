import { inject } from "@vercel/analytics";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueSmoothScroll from "vue3-smooth-scroll";
import i18n from "./i18n";

const app = createApp(App);
app.use(VueSmoothScroll);
app.use(i18n);
inject();
app.mount("#app");
