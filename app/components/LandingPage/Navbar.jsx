"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useAuth } from "@/app/context/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const pages = [
  {
    label: "Home",
    page: "Home",
  },
];

function Navbar() {
  const [navBar, setNavBar] = useState(false);
  const { user, logout } = useAuth();
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
    <nav className="w-full mx-auto fixed px-4 sm:px-20 top-0 z-50 bg-white-slate-200 shadow text-black">
      <div className="justify-between md:items-center md:flex">
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
                    className="block lg:inline-block cursor-pointer text-center  hover:text-slate-950 "
                    href="/signup"
                    onClick={() => setNavBar(!navBar)}
                  >
                    Signup
                  </Link>
                  <Link
                    className="block lg:inline-block  cursor-pointer text-center  hover:text-slate-950"
                    href="/login"
                    onClick={() => setNavBar(!navBar)}
                  >
                    Login
                  </Link>
                  <Link
                    className="block lg:inline-block text-neutral-600 cursor-pointer text-center  hover:text-slate-950 "
                    href="/feedback"
                    onClick={() => setNavBar(!navBar)}
                  >
                    Feedback
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="block lg:inline-block  cursor-pointer text-center  hover:text-slate-950"
                    href="/dashboard/training"
                  >
                    Training
                  </Link>
                  <Link
                    className="block lg:inline-block  cursor-pointer text-center  hover:text-slate-950"
                    href="/dashboard/health"
                  >
                    Nutrition
                  </Link>
                  <Link
                    className="block lg:inline-block  cursor-pointer text-center  hover:text-slate-950"
                    href="/dashboard/gear"
                  >
                    Gear
                  </Link>
                  <Link
                    className="block lg:inline-block cursor-pointer text-center hover:text-slate-950"
                    href="/dashboard/injuryprevention"
                  >
                    Injury Prevention
                  </Link>
                  <h1
                    className="block lg:inline-block text-neutral-600 cursor-pointer text-center  hover:text-slate-950"
                    onClick={handlSignout}
                  >
                    Signout
                  </h1>
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
