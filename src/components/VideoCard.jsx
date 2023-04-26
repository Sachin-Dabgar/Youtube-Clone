import React from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from "../shared/VideoLength";
import millify from "millify";

const VideoCard = ({ video }) => {
    return (
        <Link to={`video/${video.videoId}`}>
            <div className="flex flex-col mb-8">
                <div className="relative h-48 md:h-48 md:rounded-xl overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={video?.thumbnails[0]?.url}
                        alt="..."
                    />
                    {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds} />
                    )}
                </div>
                <div className="flex text-black dark:text-white mt-3">
                    {/* avatar */}
                    <div className="flex items-start">
                        <div className="flex h-9 w-9 rounded-full overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src={video?.author?.avatar[0]?.url}
                                alt="..."
                            />
                        </div>
                    </div>
                    {/* video details */}
                    <div className="flex flex-col ml-3 overflow-hidden">
                        <span className="text-sm font-bold line-clamp-2">
                            {video?.title}
                        </span>
                        {/* showing channel name and badge if channel is verified */}
                        <span className="text-[12px] font-semibold mt-2 dark:text-white/[0.7] text-black/[0.7] flex items-center">
                            {video?.author?.title}
                            {video?.author?.badges[0]?.type ===
                                "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="dark:text-white/[0.5] text-black/[0.5] text-[12px] ml-1" />
                            )}
                        </span>
                        {/* for views and when uploaded */}
                        <div className="flex text-[12px] font-semibold dark:text-white/[0.7] text-black/[0.7] truncate overflow-hidden">
                            <span>{`${millify(video?.stats?.views, {
                                precision: 2,
                            })} views`}</span>
                            <span className="flex text-[24px] leading-none font-bold dark:text-white/[0.7] text-black/[0.7] relative top-[-10px] mx-1">
                                .
                            </span>
                            <span className="truncate">
                                {video?.publishedTimeText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
