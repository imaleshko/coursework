import { createBrowserRouter, redirect } from "react-router";
import { Layout } from "@/layout/Layout/Layout";
import { Home } from "@/pages/Home/Home";
import { Fundraising } from "@/pages/Fundraising/Fundraising";
import { queryClient } from "@/api/queryClient.ts";
import { fundraisingApi } from "@/api/fundraisingApi.ts";
import Register from "@/pages/Auth/Register/Register.tsx";
import Login from "@/pages/Auth/Login/Login.tsx";
import Account from "@/pages/Account/Account.tsx";
import Profile from "@/pages/Account/Profile/Profile.tsx";
import { accountApi } from "@/api/accountApi.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: async () => {
      try {
        return await queryClient.ensureQueryData({
          queryKey: ["user"],
          queryFn: accountApi.getUser,
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

      {
        path: "account",
        Component: Account,
        loader: () => {
          const user = queryClient.getQueryData(["user"]);
          if (!user) {
            throw redirect("/login");
          }
          return null;
        },
        children: [
          {
            index: true,
            loader: () => redirect("profile"),
          },
          {
            path: "profile",
            Component: Profile,
          },
          {
            path: "donations",
            element: <div>Мої донати</div>,
          },
          {
            path: "fundraisers",
            element: <div>Мої збори</div>,
          },
        ],
      },
    ],
  },
]);
