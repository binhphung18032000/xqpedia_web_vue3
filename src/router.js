import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./pages/Home";
import Rush from "./pages/Rush";
import Beginner from "./pages/Beginner";
import Semi from "./pages/Semi";
import Pro from "./pages/Pro";
import Master from "./pages/Master";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/xom",
    component: Beginner,
  },
  {
    path: "/toc-chien",
    component: Rush,
  },
  {
    path: "/huyen",
    component: Semi,
  },
  {
    path: "/tinh",
    component: Pro,
  },
  {
    path: "/doc-co-cau-bai",
    component: Master,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
