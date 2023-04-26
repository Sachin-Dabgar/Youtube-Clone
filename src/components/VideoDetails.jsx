import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import millify from "millify";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
// import SuggestionVideoCard from "./SuggestionVideoCard";

const SuggestionVideoCard = lazy(() => import("./SuggestionVideoCard"));

const VideoDetails = () => {
    // required states and params
    const [video, setVideo] = useState();
    const [relatedVideos, setRelatedVideos] = useState();
    const { id } = useParams();
    const { setLoading } = useContext(Context);

    // whenever id changes the method inside useEffect will be called
    useEffect(() => {
        document.getElementById("root").classList.add("custom-h");
        // method to fetch the related videos for the selected video from the feed page
        const fetchRelatedVideos = () => {
            setLoading(true);
            fetchDataFromApi({
                typeOfProcess: "video/related-contents/",
                query: id,
            }).then((res) => {
                setRelatedVideos(res);
                setLoading(false);
            });
        };
        // method to get all the details for the selected video from feed page
        const fetchVideoDetails = () => {
            setLoading(true);
            fetchDataFromApi({
                typeOfProcess: "video/details/",
                query: id,
            }).then((res) => {
                setVideo(res);
                setLoading(false);
            });
        };
        fetchVideoDetails();
        fetchRelatedVideos();
    }, [id, setLoading]);

    return (
        <div className="flex justify-center flex-row h-[calc(100%-56px)] dark:bg-black bg-white">
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                {/* for video player */}
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[500px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            className="dark:bg-black bg-white"
                            playing={true}
                        />
                    </div>
                    {/* for title */}
                    <div className="dark:text-white text-black font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        {/* author details */}
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img
                                        src={video?.author?.avatar[0].url}
                                        alt="..."
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                {/* for channel name and verified badge if it is present in api */}
                                <div className="dark:text-white text-black text-md font-semibold flex items-center">
                                    {video?.author?.title}
                                    {video?.author?.badges[0]?.type ===
                                        "VERIFIED_CHANNEL" && (
                                        <BsFillCheckCircleFill className="dark:text-white/0.5] text-black/[0.5] text-[12px] ml-1" />
                                    )}
                                </div>
                                <div className="dark:text-white[0.7] text-black/[0.7] text-sm">
                                    {video?.author?.stats?.subscribersText}
                                </div>
                            </div>
                        </div>
                        {/* likes and views */}
                        <div className="flex dark:text-white text-black mt-4 md:mt-0 gap-1 text-[12px] md:text-[16px]">
                            {/* likes */}
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl dark:bg-white/[0.15] bg-black/[0.15]">
                                <AiOutlineLike className="text-xl dark:text-white text-black mr-2" />
                                <span>{`${millify(video?.stats?.likes, {
                                    precision: 2,
                                })} Likes`}</span>
                            </div>
                            {/* views */}
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl dark:bg-white/[0.15] bg-black/[0.15]">
                                <AiOutlineEye className="text-xl dark:text-white text-black mr-2" />
                                <span>{`${millify(video?.stats?.views, {
                                    precision: 2,
                                })} Views`}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* suggestion videos */}
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {relatedVideos?.contents?.map((item, index) => {
                        if (item?.type !== "video") {
                            return false;
                        }
                        return (
                            <Suspense>
                                <SuggestionVideoCard
                                    key={index}
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

export default VideoDetails;
