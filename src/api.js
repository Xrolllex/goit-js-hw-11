import axios from "axios";

const api_key = "40029898-1d411868c635d026eac66d85b"

const photos = (input) => {
    return axios
    .get(`https://pixabay.com/api/?key=${api_key}&q=${input}
    &image_type=photo
    &orientation=horizontal
    &safesearch=true`)
    .then(response =>{
        return response.data
    })
}

export {photos}