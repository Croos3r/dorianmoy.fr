import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Vue Smooth Scroll
import VueSmoothScroll from "vue3-smooth-scroll";

// Vercel Analytics
import { inject } from "@vercel/analytics";

// Vuetify
import { createVuetify } from "vuetify";
import { VTextarea } from "vuetify/components/VTextarea";
import { VTextField } from "vuetify/components/VTextField";

const vuetify = createVuetify({
	components: {
		VTextField,
		VTextarea,
	},
	theme: false,
});
const app = createApp(App);

app.use(VueSmoothScroll).use(vuetify);

inject();

app.mount("#app");
