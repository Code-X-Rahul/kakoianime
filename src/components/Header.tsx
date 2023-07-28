"use client";
import logo from "../assets/logo.png";
import { RiSearchLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import Form from "./Form";
import Link from "next/link";
import SignUpModal from "./SignUpModal";
import { useAuth } from "../context/UserContext";
import Image from "next/image";
import { useState } from "react";
import Nav from "./Nav";
import { MobileSidebar } from './Mobile-Slidebar';

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  return (
    <>
      <header
        id="header"
        className="z-[200] py-4 bg-gradient-to-tr from-teal-600 to-teal-400"
      >
        <nav className="flex items-center px-2">
          <MobileSidebar />
          <div className="flex items-center flex-1 justify-between">
            <Link href="/">
              <Image src={logo} alt="logo" className="w-[10rem]" />
            </Link>
            <div className=" hidden md:flex justify-between  ">
              <Nav />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setSearchBar((prev) => !prev)}
              className="text-black bg-slate-50 p-2 rounded-full text-lg mx-2"
            >
              <RiSearchLine />
            </button>
            {!user && <SignUpModal />}
            {user && (
              <Link
                className="text-black bg-slate-50 p-2 rounded-full text-lg mx-2"
                href="/dashboard"
              >
                <RxPerson />
              </Link>
            )}
          </div>
        </nav>
        <div
          className={`${!searchBar && "hidden"} transition-all md:hidden`}
        >
          <Form search={setSearchBar} />
        </div>
      </header>
    </>
  );
};

export default Header;
