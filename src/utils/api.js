// step 2
import axios from "axios";

// step 4
const BASE_URL = "https://youtube138.p.rapidapi.com";

// step 5 change key and params if required
// options required for makind a request.
let options = {
    method: "GET",
    params: { q: "", hl: "en", gl: "US" },
    headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_YOUTUBE_API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

// step 6
// method to fetch data from the requested url
export const fetchDataFromApi = async ({ typeOfProcess, query }) => {
    // updating options because api is changed
    if (typeOfProcess === "video/details/") {
        options = {
            ...options,
            params: {
                ...options.params,
                id: query,
            },
        };
    } else {
        options = {
            ...options,
            params: {
                ...options.params,
                q: query,
            },
        };
    }
    const urlToHit = `${BASE_URL}/${typeOfProcess}`;
    const { data } = await axios.get(urlToHit, options);
    return data;
};
