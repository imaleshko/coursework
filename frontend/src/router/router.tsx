import { createBrowserRouter } from "react-router";
import { Layout } from "@/layout/Layout/Layout";
import { Home } from "@/pages/Home/Home";
import { Fundraising } from "@/pages/Fundraising/Fundraising";
import { queryClient } from "@/api/queryClient.ts";
import { fundraisingApi } from "@/api/fundraisingApi.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          return await queryClient.ensureQueryData({
            queryKey: ["newest"],
            queryFn: fundraisingApi.get5Newest,
          });
        },
      },
      {
        path: "fundraising/:username/:slug",
        Component: Fundraising,
      },
    ],
  },
]);
