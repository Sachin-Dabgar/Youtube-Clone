import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNav = () => {
    const { selectCategories, setSelectCategories, mobileMenu } =
        useContext(Context);

    const navigate = useNavigate();

    // method to set the category based on use click on the categories available in the left menu
    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                return setSelectCategories(name);
            case "home":
                return setSelectCategories(name);
            case "menu":
                return false;
            default:
                break;
        }
    };

    return (
        // creating left navigation menu
        <div
            className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-white dark:bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
                mobileMenu ? "translate-x-[0px]" : ""
            }`}
        >
            <div className="flex px-5 flex-col">
                {categories.map((item, index) => {
                    return (
                        <React.Fragment key={item.name + index}>
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                action={() => {
                                    clickHandler(item.name, item.type);
                                    navigate("/");
                                }}
                                className={`${
                                    selectCategories === item.name
                                        ? "bg-black/[0.15] dark:bg-white/[0.15]"
                                        : ""
                                }`}
                            />
                            {item.divider && (
                                <hr className="my-5 border-black/[0.15] dark:border-white/[0.15]" />
                            )}
                        </React.Fragment>
                    );
                })}
                <hr className="my-5 border-black/[0.15] dark:border-white/[0.15]" />
                <div className="text-black/[0.5] dark:text-white/[0.5] text-[12px]">
                    Clone By Sachin Dabgar
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
