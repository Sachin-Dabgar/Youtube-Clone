import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch, IoMdSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/Loader";

// step 11 importiing necessary files and icons as we can see above.

const Header = () => {
    // step 12 creating state for the searchQuery and initially it will be empty string.
    const [searchQuery, setSearchQuery] = useState("");

    // step 13 consuming the context provided by the contextProvider using useContext.
    const { loading, mobileMenu, setMobileMenu } = useContext(Context);

    // step 14 making navigator for navigation purpose
    const navigate = useNavigate();

    // step 15 whenever we type something in input field this method will be executed...
    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "SearchButton") &&
            searchQuery?.length > 0
        ) {
            // say... user enters songs in input field then it will be redirected to
            // searchResult/songs
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    // method to toggle mobile menu for out app
    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    // we can get pathname from the hook useLocation.
    const { pathname } = useLocation();

    // getting pagename from the pathname received above.
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    return (
        // main div
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
            {/* showing loader whenever loader is true */}
            {loading && <Loader />}

            {/* creating toggle menu for the mobile device... whenever pageName is not video */}
            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center h-10 justify-center w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-black dark:text-white text-xl" />
                        ) : (
                            <SlMenu className="text-black dark:text-white text-xl" />
                        )}
                    </div>
                )}

                {/* adding logo */}
                <Link
                    to="/"
                    className="flex h-5 items-center"
                >
                    {/* for large screen */}
                    <img
                        className=" h-full hidden dark:md:block"
                        src={ytLogo}
                        alt=""
                    />
                    {/* for small screen */}
                    <img
                        className=" h-full dark:md:hidden"
                        src={ytLogoMobile}
                        alt=""
                    />
                </Link>
            </div>
            {/* creating search section */}
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030]/[0.4] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoMdSearch className="text-black dark:text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-black dark:text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        value={searchQuery}
                        placeholder="Search"
                    />
                </div>
                <button className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030]/[0.4] rounded-r-3xl bg-black/[0.1] dark:bg-white/[0.1]">
                    <IoMdSearch className="text-black dark:text-white text-xl" />
                </button>
            </div>
            {/*  for  */}
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.1]">
                        <RiVideoAddLine className="text-black dark:text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.1]">
                        <FiBell className="text-black dark:text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-10 w-10 overflow-hidden rounded-full md:ml-4">
                    <img
                        src="https://xsgames.co/randomusers/assets/avatars/male/59.jpg"
                        alt="..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
