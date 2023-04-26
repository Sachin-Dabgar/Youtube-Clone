import React, { useState, useEffect, createContext } from "react";

import { fetchDataFromApi } from "../utils/api";

// step 7 creating the app context which will be available to all the children whereever it is provided
// creating context
export const Context = createContext();

export const AppContext = (props) => {
    // Defining all the states here

    // state for loading
    const [loading, setLoading] = useState(false);

    // state for the search results we get from api request
    const [searchResults, setSearchResults] = useState(false);

    // state for the current selected category by user.. by default it it set to new
    const [selectCategories, setSelectCategories] = useState("New");

    // state for mobile menu if the mobile menu is selected of not.
    const [mobileMenu, setMobileMenu] = useState(false);

    // here we are fetching data for the selected category whenever the selected category is changed.
    useEffect(() => {
        fetchSelectedCategoryData(selectCategories);
    }, [selectCategories]);

    // method to get the data for the selected category and setting it to search-results
    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi({ typeOfProcess: "search/", query: query }).then(
            ({ contents }) => {
                setSearchResults({ contents });
                setLoading(false);
            }
        );
    };

    return (
        // here is my context provider which will be available to all the child components.
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                setSearchResults,
                selectCategories,
                setSelectCategories,
                mobileMenu,
                setMobileMenu,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
