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
import requireAuth from "@/router/requireAuth.ts";
import Fundraisers from "@/pages/Account/Fundraisers/Fundraisers.tsx";
import CreateFundraising from "../pages/Account/Fundraisers/CreateFundraising/CreateFundraising.tsx";
import Donations from "@/pages/Account/Donations/Donations.tsx";
import EditFundraising from "@/pages/Account/Fundraisers/EditFundraising/EditFundraising.tsx";

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
        queryClient.setQueryData(["user"], null);
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
        errorElement: (
          <div style={{ padding: "40px", color: "white", textAlign: "center" }}>
            Збір не знайдено (404)
          </div>
        ),
        loader: async ({ params }) => {
          const { username, slug } = params;

          if (!username || !slug) {
            throw redirect("/");
          }
          return await queryClient.ensureQueryData({
            queryKey: ["fundraising", params.username, params.slug],
            queryFn: () => fundraisingApi.getByUsernameAndSlug(username, slug),
          });
        },
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
        loader: requireAuth,
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
            Component: Donations,
          },
          {
            path: "fundraisers",
            children: [
              {
                index: true,
                Component: Fundraisers,
              },
              {
                path: "create",
                Component: CreateFundraising,
              },
              {
                path: "edit/:slug",
                Component: EditFundraising,
              },
            ],
          },
        ],
      },
    ],
  },
]);
