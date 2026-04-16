import { createBrowserRouter } from "react-router";
import { Layout } from "@/layout/Layout/Layout";
import { Home } from "@/pages/Home/Home";
import { Fundraising } from "@/pages/Fundraising/Fundraising";
import { queryClient } from "@/api/queryClient.ts";
import { fundraisingApi } from "@/api/fundraisingApi.ts";
import Register from "@/pages/Auth/Register/Register.tsx";
import Login from "@/pages/Auth/Login/Login.tsx";
import { authApi } from "@/api/authApi.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: async () => {
      try {
        return await queryClient.ensureQueryData({
          queryKey: ["user"],
          queryFn: authApi.getUser,
        });
      } catch {
        return null;
      }
    },
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
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
