import { createBrowserRouter } from "react-router";
import { Layout } from "@/layout/Layout/Layout";
import { Home } from "@/pages/Home/Home";
import { Fundraising } from "@/pages/Fundraising/Fundraising";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "fundraising/:username/:slug",
        Component: Fundraising,
      },
    ],
  },
]);
