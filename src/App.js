import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Feed from "./components/Feed";
import Header from "./components/Header";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";

import { AppContext } from "./context/contextApi";

// step 8 importing the main components such as feed, header, searchResult, videoDetails
// step 9 provide app-context to the all children
// step 10 creating browser routes for different paths.

const App = () => {
    return (
        <AppContext>
            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Header />
                    <Routes>
                        {/* route for root and will show feed to users */}
                        <Route
                            path="/"
                            exact
                            element={<Feed />}
                        />
                        {/* route for the search-result and it will be dynamic based on search-query 
                            for ex. search-query : latest songs
                            path : /searchResult/latest songs => it will be encoded...
                        */}
                        <Route
                            path="/searchResult/:searchQuery"
                            element={<SearchResult />}
                        />
                        {/* route for the video detail and it will be dynamic based on the video id
                            for ex. id => something
                            path : /video/something
                         */}
                        <Route
                            path="/video/:id"
                            element={<VideoDetails />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </AppContext>
    );
};

export default App;
