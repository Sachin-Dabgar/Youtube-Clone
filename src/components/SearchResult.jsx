import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
// import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResultVideoCard = lazy(() => import("./SearchResultVideoCard"));

const SearchResult = () => {
    const [result, setResult] = useState();
    const { searchQuery } = useParams();
    const { setLoading } = useContext(Context);

    // every time use search something the method inside useEffect will be called
    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        const fetchSearchResults = () => {
            setLoading(true);
            fetchDataFromApi({
                typeOfProcess: "search/",
                query: searchQuery,
            }).then((res) => {
                setResult(res?.contents);
                setLoading(false);
            });
        };
        fetchSearchResults();
    }, [searchQuery, setLoading]);

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            {/* left navigation menu */}
            <LeftNav />
            <div className=" grow w-[calc(100%-240px)] h-full overflow-y-auto dark:bg-black bg-white">
                <div className="grid grid-cols-1 gap-2 p-5">
                    {result?.map((item) => {
                        if (item?.type !== "video") return false;
                        let video = item?.video;
                        return (
                            <Suspense>
                                <SearchResultVideoCard
                                    key={video?.videoId}
                                    video={video}
                                />
                            </Suspense>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
