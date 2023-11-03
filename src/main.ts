import { createApp } from "vue";
import App from "./App.vue";

import { BootstrapVueNext } from "bootstrap-vue-next";

const app = createApp(App);
app.use(BootstrapVueNext);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

app.mount("#app");
