import React, { useEffect, useContext, lazy } from "react";

import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import { Suspense } from "react";
// import VideoCard from "./VideoCard";

const VideoCard = lazy(() => import("./VideoCard"));

const Feed = () => {
    const { loading, searchResults } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
    }, []);

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            {/* left navigation menu */}
            <LeftNav />
            {/* all the video cards for each video fetched from api for the searchResults */}
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {!loading &&
                        searchResults.contents &&
                        searchResults.contents?.map((item, index) => {
                            if (item.type !== "video") return;
                            return (
                                <Suspense>
                                    <VideoCard
                                        key={item?.video?.videoId}
                                        video={item?.video}
                                    />
                                </Suspense>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Feed;
