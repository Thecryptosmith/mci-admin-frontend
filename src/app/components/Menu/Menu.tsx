"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import ChecklistIcon from "@mui/icons-material/Checklist";
import Group from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import Login from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
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
import { removeTokens } from "@src/lib/tools/localStorage/token";

const LINKS = [
  { text: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { text: "Admins", href: "/admins", icon: ChecklistIcon },
  { text: "Users", href: "/users", icon: Group },
];

export default function Menu() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandler = () => {
    dispatch(logout());
    removeTokens();
    router.push("/auth/sign-in");
  };

  return (
    <>
      {user?.accessToken ? (
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
