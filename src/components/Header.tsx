"use client";
import logo from "../assets/logo.png";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import Form from "./Form";
import Link from "next/link";
import SignUpModal from "./SignUpModal";
import { useAuth } from "../context/UserContext";
import Image from "next/image";
import { useState } from "react";
import Nav from "./Nav";

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
        <nav className="flex justify-between ">
          <div className="flex items-center justify-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black bg-slate-50 p-2 rounded-full text-lg mx-2 md:hidden"
            >
              <AiOutlineMenu />
            </button>

            <Link href="/">
              <Image src={logo} alt="logo" className="w-[10rem]" />
            </Link>
            <div className="hidden md:flex justify-between ">
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
      <aside
        className={`fixed left-0 transition-transform top-0 bottom-0 ${!menuOpen ? "translate-x-[-1000%]" : "translate-x-0"
          } z-[1000] w-[12rem] md:hidden  overflow-hidden overflow-y-scroll hide-scrollbar text-center text-slate-300  bg-opacity-90 backdrop-filter backdrop-blur-xl  bg-blend-multiply bg-teal-600  z-[100
        ]`}
      >
        <div className="flex flex-col h-full">
          <div className="flex w-full justify-between">
            <button
              className="bg-zinc-700 rounded-full text-xl p-2 m-2 flex items-center justify-center"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <FaAngleLeft />
            </button>
          </div>
          <Link href="/">
            <p className="text-lg text-teal-400">HOME</p>
          </Link>
          <Link href="/contact-us">
            <p className="text-lg mx-4 text-teal-400">Contact Us</p>
          </Link>
          <Link href="/About-us">
            <p className="text-lg mx-4 text-teal-400">About Us</p>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Header;
