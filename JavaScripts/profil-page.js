//DOM elements
const mainSection = document.getElementById("main");
const profilId = document.getElementById("profil-id-id");
const profilName = document.getElementById("profil-name-id");
const profilCity = document.getElementById("profil-city-id");
const profilTagline = document.getElementById("profil-tagline-id");
const profilTagsSection = document.getElementById("profil-tags-id");
const contactButton = document.getElementsByClassName("contactButton");
const profilPicture = document.getElementById("profil-picture-id");
const filterButton = document.getElementById("select-menu__button");
const filterList = document.getElementById("select-menu__list");
const filterPopularity = document.getElementById("select-menu__popularity");
const filterDate = document.getElementById("select-menu__date");
const filterTitle = document.getElementById("select-menu__title");
const mediaSection = document.getElementById("media-section-id");
const totalLikesSection = document.getElementById("total-likes-id");
const likeAndIcon = document.getElementById("like-and-icon");
const lightBox = document.getElementById("lightbox");
const lightBoxContent = document.getElementById("lightbox__content");
const lightBoxMediaContainer = document.getElementById('lightbox__media-container');
const lightBoxCloseAndNext = document.getElementById("lightbox__close-next-btn");
const lightBoxTitle = document.getElementById('lightbox__title');
const lightBoxCloseBtn = document.getElementById('lightbox__close-btn');
const lightBoxPreviousBtn = document.getElementById('lightbox__previous-btn');
const lightBoxNextBtn = document.getElementById('lightbox__next-btn');
const lightBoxLoadedMedia = document.getElementById('lightbox__media');


///access JSON database
let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', '/database.json');
apiRequest.send();

//main function for dynamic profil-page loading
apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(apiRequest.response);
        const photographersData = data.photographers;
        const media = data.media;
        let currentPhotographer = "";
        let totalNumberOfLikes = 0;
        let clickedMediaId = 0;
        let lightboxMedia = 0;
        
        
        //loop to detect current photographer page & data
        for (i=0; i<photographersData.length; i++){
            if (profilId.textContent == photographersData[i].id){
                currentPhotographer = photographersData[i];
            }
        }

        //add content to profil-banner
        profilName.textContent = currentPhotographer.name;
        profilCity.textContent = currentPhotographer.city+", " + currentPhotographer.country;
        profilTagline.textContent = currentPhotographer.tagline;
        profilPicture.setAttribute("src", "/images/Photographers/" + currentPhotographer.portrait);

        //loop  to create tags for profil-banner
        for (j=0; j<currentPhotographer.tags.length; j++){
            const newTagLink = document.createElement('a');
            newTagLink.textContent = "#" + currentPhotographer.tags[j];
            newTagLink.classList.add("profilpage-tags");
            newTagLink.setAttribute("href", "#");
            profilTagsSection.appendChild(newTagLink);
        }

        //filter media from JSON for current photographer only
        let currentPhotographerMedia = media.filter(function(photographerMedia){
            if (photographerMedia.photographerId == currentPhotographer.id){
                return true;
            }
        })
        let currentMediaOrder = currentPhotographerMedia;

       //function to load media dynamically 
       function loadMedia(mediaArray){
            for (x=0; x<mediaArray.length; x++){
                let keys = Object.keys(mediaArray[x]);
                
                const newMediaCard = document.createElement('section');
                const newMediaTitle = document.createElement('p');
                let newMediaLikeCount = document.createElement('p');
                const newMediaLikeIcon = document.createElement('i');
                mediaSection.appendChild(newMediaCard);
                const newLikeSection = document.createElement('section');

                //load image media
                if(keys.includes("image")){
                    const newImgLink = document.createElement('a');
                    newImgLink.setAttribute("href", "#");
                    const newImg = document.createElement('img');
                    newImg.setAttribute("src", "/images/" + currentPhotographer.name + "/" + mediaArray[x].image);
                    newImg.setAttribute("class", "media-section__media");
                    newImg.setAttribute("id", mediaArray[x].id);
                    newMediaCard.appendChild(newImgLink);
                    newImgLink.appendChild(newImg);
                    
                    //add functionality to open lightbox-modal
                    newImgLink.addEventListener("click", ($event) => {
                        lightBox.classList.remove("lightbox--closed");
                        lightBox.setAttribute("class", "lightbox--openned");
                        lightBoxMediaContainer.innerHTML = "";
                        clickedMediaId = $event.path[0].id;
                        lightboxMedia = document.createElement('img');
                        
                        for(let i=0; i<currentPhotographerMedia.length; i++){
                            if (clickedMediaId == currentPhotographerMedia[i].id){
                                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + currentPhotographerMedia[i].image);
                                lightBoxTitle.textContent = currentPhotographerMedia[i].title;
                            }
                        }
                        lightboxMedia.setAttribute("id", "lightbox__media");
                        lightBoxMediaContainer.appendChild(lightboxMedia);
                    });
                }

                //load Video media
                if(keys.includes("video")){
                    const newVideoLink = document.createElement('a');
                    newVideoLink.setAttribute("href", "#");
                    const newVideo = document.createElement('video');
                    newVideo.setAttribute("src", "/images/" + currentPhotographer.name + "/" + mediaArray[x].video);
                    newVideo.setAttribute("type", "video/mp4");
                    newVideo.setAttribute("class", "media-section__media");
                    newVideo.setAttribute("id", mediaArray[x].id);
                    newMediaCard.appendChild(newVideoLink);
                    newVideoLink.appendChild(newVideo);

                    //add functionality to open lightbox-modal
                    newVideoLink.addEventListener("click", ($event) => {
                        lightBox.classList.remove("lightbox--closed");
                        lightBox.setAttribute("class", "lightbox--openned");
                        lightBoxMediaContainer.innerHTML = "";
                        clickedMediaId = $event.path[0].id;
                        lightboxMedia = document.createElement('video');

                        for(let i=0; i<currentPhotographerMedia.length; i++){
                            if (clickedMediaId == currentPhotographerMedia[i].id){
                                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + currentPhotographerMedia[i].video);
                                lightboxMedia.setAttribute("type", "video/mp4");
                                lightboxMedia.setAttribute("controls", "");
                                lightBoxTitle.textContent = currentPhotographerMedia[i].title;
                            }
                        }
                        lightboxMedia.setAttribute("id", "lightbox__media");
                        lightBoxMediaContainer.appendChild(lightboxMedia);
                    });

                }
                
                newMediaTitle.textContent = mediaArray[x].title;
                newMediaLikeCount.textContent = mediaArray[x].likes;
                newMediaLikeIcon.setAttribute("class", "fas fa-heart");
                newMediaLikeIcon.setAttribute("href", "#");

                newMediaCard.setAttribute("class", "media-section__card");
                newMediaTitle.setAttribute("class", "media-section__title");
                newLikeSection.setAttribute("class", "media-section__likesection");
                newMediaLikeCount.setAttribute("class", "media-section__likecount");

                newMediaCard.appendChild(newMediaTitle);
                newMediaCard.appendChild(newLikeSection);
                newLikeSection.appendChild(newMediaLikeCount);
                newLikeSection.appendChild(newMediaLikeIcon);

                //generate a total number of likes of all media items
                totalNumberOfLikes += mediaArray[x].likes;

                //Add functionality to Like button for each media item
                newMediaLikeIcon.addEventListener("click", () => {
                    totalNumberOfLikes++
                    newTotalLikes.textContent = totalNumberOfLikes;
                    newMediaLikeCount.textContent++
                });

                
            }  
       }

       //function call to load initial media
       loadMedia(currentPhotographerMedia);

        //create total-likes section
        const newTotalLikes = document.createElement('p');
        const newLikesIcon = document.createElement('i');
        const newPhotographersPrice = document.createElement('p');

        newLikesIcon.setAttribute("class", "fas fa-heart");
        newPhotographersPrice.textContent = currentPhotographer.price + "$" + " " + "/" + " " + "Day";
        newTotalLikes.textContent = totalNumberOfLikes;

        newPhotographersPrice.setAttribute("class", "profil-page-price");

        likeAndIcon.appendChild(newTotalLikes);
        likeAndIcon.appendChild(newLikesIcon);
        totalLikesSection.appendChild(newPhotographersPrice);


        //add functionality to filter-btn
        filterButton.addEventListener("click",() =>{
            filterList.classList.remove("hidden");
        });

        //order by popularity
        filterPopularity.addEventListener("click", () => {
            filterList.classList.add("hidden");
            mediaSection.innerHTML = "";
            filterButton.textContent = "Popularity";

            let orderArray = currentPhotographerMedia;

            orderArray.sort((a,b) => {
                return b.likes - a.likes;
            });

            currentMediaOrder = orderArray;
            loadMedia(orderArray);
        });

        //order by date
        filterDate.addEventListener("click", () => {
            filterList.classList.add("hidden");
            mediaSection.innerHTML = "";
            filterButton.textContent = "Date";

            let orderArray = currentPhotographerMedia;

            orderArray.sort((a,b) =>{
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            currentMediaOrder = orderArray;
            loadMedia(orderArray);
        });

        //order by title
        filterTitle.addEventListener("click", () => {
            filterList.classList.add("hidden");
            mediaSection.innerHTML = "";
            filterButton.textContent = "Title";

            let orderArray = currentPhotographerMedia;

            orderArray.sort(function(a,b){
                if (a.title < b.title){
                    return -1;
                }
                if (a.title > b.title){
                    return 1;
                }
            })

            currentMediaOrder = orderArray;
            loadMedia(orderArray);
        });

        //lightbox close-btn
        lightBoxCloseBtn.addEventListener("click", () => {
            lightBox.classList.remove("lightbox--openned");
            lightBox.classList.add("lightbox--closed");
        });

        //lightbox backward arrow functionality
        lightBoxPreviousBtn.addEventListener("click", () => {
            let previousMedia = 0;
            let previousMediaKeys = 0;
            for(let i=0; i<currentMediaOrder.length; i++){
                if(lightBoxTitle.textContent === currentMediaOrder[i].title){
                    previousMedia = currentMediaOrder[i-1];
                    previousMediaKeys = Object.keys(currentMediaOrder[i-1]);
                }
            }
            if(previousMediaKeys.includes("image")){
                lightBoxMediaContainer.innerHTML = "";
                lightboxMedia = document.createElement('img');
                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + previousMedia.image);
                lightBoxTitle.textContent = previousMedia.title;
                lightboxMedia.setAttribute("id", "lightbox__media");
                lightBoxMediaContainer.appendChild(lightboxMedia);
            }
            if(previousMediaKeys.includes("video")){
                lightBoxMediaContainer.innerHTML = "";
                lightboxMedia = document.createElement('video');
                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + previousMedia.video);
                lightboxMedia.setAttribute("type", "video/mp4");
                lightboxMedia.setAttribute("controls", "");
                lightBoxTitle.textContent = previousMedia.title;
                lightboxMedia.setAttribute("id", "lightbox__media");
                lightBoxMediaContainer.appendChild(lightboxMedia);
            }
        });

        //lightbox forward arrow functionality
        lightBoxNextBtn.addEventListener("click", () => {
            let nextMedia = 0;
            let nextMediaKeys = 0;
            for(let i=0; i<currentMediaOrder.length; i++){
                if(lightBoxTitle.textContent === currentMediaOrder[i].title){
                    nextMedia = currentMediaOrder[i+1];
                    nextMediaKeys = Object.keys(currentMediaOrder[i+1]);
                }
            }
            if(nextMediaKeys.includes("image")){
                lightBoxMediaContainer.innerHTML = "";
                lightboxMedia = document.createElement('img');
                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + nextMedia.image);
                lightBoxTitle.textContent = nextMedia.title;
                lightboxMedia.setAttribute("id", "lightbox__media");
                lightBoxMediaContainer.appendChild(lightboxMedia);
            }
            if(nextMediaKeys.includes("video")){
                lightBoxMediaContainer.innerHTML = "";
                lightboxMedia = document.createElement('video');
                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + nextMedia.video);
                lightboxMedia.setAttribute("type", "video/mp4");
                lightboxMedia.setAttribute("controls", "");
                lightBoxTitle.textContent = nextMedia.title;
                lightboxMedia.setAttribute("id", "lightbox__media");
                lightBoxMediaContainer.appendChild(lightboxMedia);
            }
        });
    }
}