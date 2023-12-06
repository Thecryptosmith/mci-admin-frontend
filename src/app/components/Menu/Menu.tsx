"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Group from "@mui/icons-material/Group";
import Groups3Icon from "@mui/icons-material/Groups3";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import Login from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Wallet from "@mui/icons-material/Wallet";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  logout,
  selectCurrentUser,
  useDispatch,
  useSelector,
} from "@src/lib/redux";
import {
  clearLocalStorage,
  getAccessToken,
} from "@src/lib/tools/localStorage/token";

const LINKS = [
  { text: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { text: "Admins", href: "/admins", icon: Groups3Icon },
  { text: "Users", href: "/users", icon: Group },
  { text: "Orders", href: "/orders", icon: ListIcon },
  { text: "Wallets", href: "/wallets", icon: Wallet },
];

export default function Menu() {
  const [token, setToken] = useState<string>("");

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken("");
    }
  }, [user]);

  const logoutHandler = () => {
    dispatch(logout());
    clearLocalStorage();
    router.push("/auth/sign-in");
  };

  return (
    <>
      {token ? (
        <>
          <Divider />
          <List>
            {LINKS.map(({ text, href, icon: Icon }) => (
              <ListItem key={href} disablePadding>
                <ListItemButton component={Link} href={href}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mt: "auto" }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={logoutHandler}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} href={"/auth/sign-in"}>
              <ListItemIcon>{<Login />}</ListItemIcon>
              <ListItemText primary={"Sign-in"} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </>
  );
}
