const axios = require("axios");

const options = {
    method: "GET",
    url: "https://youtube138.p.rapidapi.com/video/details/",
    params: { q: "", hl: "en", gl: "US", id: "kJQP7kiw5Fk" },
    headers: {
        "X-RapidAPI-Key": "903218f6f8msh70cc9a0cb8c20f2p138511jsn48ef1ceda893",
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
