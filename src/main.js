import { chakra } from "@chakra-ui/vue-next";
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App).use(chakra);
app.mount("#app");

import "./assets/css/main.css";
