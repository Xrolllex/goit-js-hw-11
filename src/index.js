import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import { photos } from "./api";

const searchBtn = document.querySelector("submit")
const loadMore = document.querySelector(".btn-more")
let input = document.querySelector("input")
const limit = document.querySelector(".limit")
const photoBlock = document.querySelector(".gallery")

let photoArray = []
let checkInput

const searchOn = () => {
    if (input.value !== "" & input.value!== checkInput) {
        searchBtn.removeAttribute(disabled, "")

    } 
    searchBtn.setAttribute("disabled","")
}


const createGallery = (event) => {
    event.preventDefault()
    searchBtn.setAttribute("disabled", "")
   
    photos(input.value)
    .then (data => {
        data.hits.map(element => {
            let newPhoto =`
            <div class="photo-card">
                <a href="${element.largeImageURL}">
                    <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy"/>
                </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes </b>${element.likes}
                    </p>
                    <p class="info-item">
                    <b>Views </b>${element.views}
                    </p>
                    <p class="info-item">
                    <b>Comments </b>${element.comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads </b>${element.downloads}
                    </p>
                </div>
            </div>`
            photoArray.push(newPhoto)
        })

        if(photoArray.length===0) {
            photoBlock.style.display = "block"
            photoBlock.innerHTML = `<p style="text-align:center;">
            Sorry, there are no images matching your search query. Please try again.
            </p>`
            loadMore.style.display = "none"
            Notiflix.Notify.failure(`Sorry, We found ${data.totalHits} images.. Please try again.`)
            
        }
        else {
            photoBlock.style.display = "flex"
            photoBlock.innerHTML = photoArray.join("")
            checkInput = input.value
            loadMore.style.display = "block"
            const photoShow = new SimpleLightbox("a")


            if (photoArray.length === data.totalHits) {
                limit.style.display = "block"
                loadMore.style.display = "none"
            }

        }

    })
    .catch (error => {
        console.log(error);
    })
   
}

input.addEventListener("input", "")
searchBtn.addEventListener("click", createGallery)
loadMore.addEventListener("click", createGallery)