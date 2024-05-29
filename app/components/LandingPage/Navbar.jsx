"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useAuth } from "@/app/context/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserNav from "./UserNav";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const pages = [
  {
    label: "Home",
    page: "Home",
  },
];

function Navbar() {
  const [navBar, setNavBar] = useState(false);
  const { user, logout } = useAuth();
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  useEffect(() => {
    console.log(user);
  }, []);

  const handlSignout = async () => {
    try {
      Cookies.remove("verify");
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="w-full mx-auto fixed px-4 sm:px-20 top-0 z-50 bg-white-slate-200 shadow text-black"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="justify-between md:items-center md:flex  ">
        <div className="flex items-center justify-between py-3">
          <div className="md:py-5 md:block">
            {!user ? (
              <Link href="/" className="text-2xl font-bold cursor-pointer ">
                Pace Pulse
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="text-2xl font-bold cursor-pointer "
              >
                Pace Pulse
              </Link>
            )}
          </div>
          <div className="md:hidden">
            {navBar ? (
              <IoMdClose size={30} onClick={() => setNavBar(!navBar)} />
            ) : (
              <IoMdMenu size={30} onClick={() => setNavBar(!navBar)} />
            )}
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navBar ? "block" : "hidden"
            }`}
          >
            <ul className="md:flex md:space-x-6 space-y-8 md:space-y-0">
              {!user ? (
                <>
                  <Link
                    className="tag-hover"
                    href="/signup"
                    onClick={() => setNavBar(!navBar)}
                  >
                    Signup
                  </Link>
                  <Link
                    className="tag-hover"
                    href="/login"
                    onClick={() => setNavBar(!navBar)}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleClick}
                    className="tag-hover"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                  >
                    <Avatar />
                  </button>
                  <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Avatar /> <Link href="/dashboard/profile">Profile</Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <Link className="tag-hover" href="/dashboard/health">
                        Nutrition
                      </Link>
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>
                      <Link href="/dashboard/gear">Gear</Link>
                    </MenuItem> */}
                    <MenuItem onClick={handleClose}>
                      <Link
                        className="tag-hover"
                        href="/dashboard/injuryprevention"
                      >
                        Injury Prevention
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handlSignout}>Signout</MenuItem>
                  </Menu>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
