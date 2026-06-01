import { inject } from "@vercel/analytics";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import i18n from "./i18n";
import "./lib/theme";
import "./lib/language";

const app = createApp(App);
app.use(i18n);
app.mount("#app");

// Defer analytics off the critical render path so it doesn't compete with
// first paint. requestIdleCallback when available, setTimeout otherwise.
const loadAnalytics = () => inject();
if ("requestIdleCallback" in window) {
	requestIdleCallback(loadAnalytics);
} else {
	setTimeout(loadAnalytics, 1);
}
