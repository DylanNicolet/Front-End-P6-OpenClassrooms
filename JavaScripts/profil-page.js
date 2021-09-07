//DOM elements
const body = document.querySelector('body');
const header = document.querySelector('header');
const mainSection = document.getElementById("main");
const profilId = document.getElementById("profil-id-id");
const profilName = document.getElementById("profil-name-id");
const profilCity = document.getElementById("profil-city-id");
const profilTagline = document.getElementById("profil-tagline-id");
const profilTagsSection = document.getElementById("profil-tags-id");
const contactButton = document.getElementById("contact-button-id");
const profilPicture = document.getElementById("profil-picture-id");
const filterButton = document.getElementById("select-menu__button");
const filterList = document.getElementById("select-menu__list");
const filterPopularity = document.getElementById("select-menu__popularity");
const filterDate = document.getElementById("select-menu__date");
const filterTitle = document.getElementById("select-menu__title");
const mediaSection = document.getElementById("media-section-id");
const totalLikesSection = document.getElementById("total-likes-id");
const likeAndIcon = document.getElementById("like-and-icon");
const lightboxBg = document.getElementById("lightbox-bg");
const lightBox = document.getElementById("lightbox");
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
        let currentPhotographer = 0;
        let totalNumberOfLikes = 0;
        let lightboxMedia = 0;
        
        //loop to detect current photographer page & data
        for (i=0; i<photographersData.length; i++){
            if (profilId.textContent == photographersData[i].id){
                currentPhotographer = photographersData[i];
            }
        }
        
        //filter media from JSON for current photographer only
        let currentPhotographerMedia = media.filter(function(photographerMedia){
            if (photographerMedia.photographerId == currentPhotographer.id){
                return true;
            }
        })
        let filteredMediaArray = currentPhotographerMedia;//defines initial media order for later filter use


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
            newTagLink.setAttribute("role", "Links");
            profilTagsSection.appendChild(newTagLink);
            const newSpan = document.createElement('span');
            newSpan.textContent = "Tag";
            newSpan.classList.add("screen-reader-only");
            newTagLink.appendChild(newSpan);

            //add functionality to profil-tag filters
            newTagLink.addEventListener("click", ($event) => {
                let rawText = $event.target.text.toLowerCase(); //makes tag name lowercase
                let filterText = rawText.slice(1, rawText.length -3); //removes "#" and "tag" from tag name
                
                //filters current media order to match selected profil tag
                filteredMediaArray = currentPhotographerMedia.filter(media => (media.tags.includes(filterText)));

                //reloads media section with filtered media list
                mediaSection.innerHTML = "";
                loadMedia(filteredMediaArray);
            })
        }

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
                    newImg.setAttribute("alt", mediaArray[x].description + ", closeup view");
                    newImg.setAttribute("class", "media-section__media");
                    newImg.setAttribute("id", mediaArray[x].id);
                    newMediaCard.appendChild(newImgLink);
                    newImgLink.appendChild(newImg);
                    let mediaId = mediaArray[x].id; //to use for lightbox openning
                    
                    //add functionality to open lightbox-modal
                    newImgLink.addEventListener("click", ($event) => {
                        mainSection.setAttribute("aria-hidden", "true");
                        lightboxBg.setAttribute("aria-hidden", "false");
                        lightboxBg.classList.remove("lightbox--closed");
                        lightboxBg.setAttribute("class", "lightbox--openned");
                        lightBox.setAttribute("open", "");
                        lightBox.setAttribute("aria-modal", "true");
                        body.style.overflow = "hidden";
                        lightBoxCloseBtn.focus();
                        lightBoxMediaContainer.innerHTML = "";
                        lightboxMedia = document.createElement('img');

                        for(let i=0; i<currentPhotographerMedia.length; i++){
                            if (mediaId == currentPhotographerMedia[i].id){
                                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + currentPhotographerMedia[i].image);
                                lightBoxTitle.textContent = currentPhotographerMedia[i].title;
                                lightboxMedia.setAttribute("alt", currentPhotographerMedia[i].description);
                                lightboxMedia.setAttribute("tabindex", "3");
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
                    let mediaId = mediaArray[x].id; //to use for lightbox openning

                    //add functionality to open lightbox-modal
                    newVideoLink.addEventListener("click", ($event) => {
                        mainSection.setAttribute("aria-hidden", "true");
                        lightboxBg.setAttribute("aria-hidden", "false");
                        lightboxBg.classList.remove("lightbox--closed");
                        lightboxBg.setAttribute("class", "lightbox--openned");
                        lightBox.setAttribute("open", "");
                        lightBox.setAttribute("aria-modal", "true");
                        body.style.overflow = "hidden";
                        lightBoxMediaContainer.innerHTML = "";
                        lightboxMedia = document.createElement('video');

                        for(let i=0; i<currentPhotographerMedia.length; i++){
                            if (mediaId == currentPhotographerMedia[i].id){
                                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + currentPhotographerMedia[i].video);
                                lightboxMedia.setAttribute("type", "video/mp4");
                                lightboxMedia.setAttribute("controls", "");
                                lightboxMedia.setAttribute("tabindex", "3");
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
                newMediaLikeIcon.setAttribute("tabindex", "0");             

                newMediaCard.setAttribute("class", "media-section__card");
                newMediaTitle.setAttribute("class", "media-section__title");
                newLikeSection.setAttribute("class", "media-section__likesection");
                newMediaLikeCount.setAttribute("class", "media-section__likecount");

                newMediaCard.appendChild(newMediaTitle);
                newMediaCard.appendChild(newLikeSection);
                newLikeSection.appendChild(newMediaLikeCount);
                newLikeSection.appendChild(newMediaLikeIcon);

                

                //Add functionality to Like button for each media item
                newMediaLikeIcon.addEventListener("click", () => {
                    totalNumberOfLikes++;
                    newTotalLikes.textContent = totalNumberOfLikes;
                    newMediaLikeCount.textContent++;
                });

                newMediaLikeIcon.addEventListener("keydown", (e) => {
                    const keyCode = e.keyCode ? e.keyCode : e.which
                    if (keyCode == 13) {
                        totalNumberOfLikes++;
                        newTotalLikes.textContent = totalNumberOfLikes;
                        newMediaLikeCount.textContent++;
                    }
                });
            }  
       }

       //generate a total number of likes of all media items
       for (i=0; i<currentPhotographerMedia.length; i++){
           totalNumberOfLikes += currentPhotographerMedia[i].likes;
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


        //add functionality to order-by btn
        filterButton.addEventListener("click",() =>{
            filterList.classList.remove("hidden");
            filterButton.setAttribute("aria-expanded", "true");
        });

        //order by popularity
        filterPopularity.addEventListener("click", () => {
            filterList.classList.add("hidden");
            filterButton.setAttribute("aria-expanded", "false");
            mediaSection.innerHTML = "";
            filterButton.textContent = "Popularity";

            filteredMediaArray.sort((a,b) => {
                return b.likes - a.likes;
            });

            loadMedia(filteredMediaArray);
        });

        //order by date
        filterDate.addEventListener("click", () => {
            filterList.classList.add("hidden");
            filterButton.setAttribute("aria-expanded", "false");
            mediaSection.innerHTML = "";
            filterButton.textContent = "Date";

            filteredMediaArray.sort((a,b) =>{
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            loadMedia(filteredMediaArray);
        });

        //order by title
        filterTitle.addEventListener("click", () => {
            filterList.classList.add("hidden");
            filterButton.setAttribute("aria-expanded", "false");
            mediaSection.innerHTML = "";
            filterButton.textContent = "Title";

            filteredMediaArray.sort(function(a,b){
                if (a.title < b.title){
                    return -1;
                }
                if (a.title > b.title){
                    return 1;
                }
            })

            loadMedia(filteredMediaArray);
        });

        //function to close ligthbox
        function closeLightBox(){
            mainSection.setAttribute("aria-hidden", "false");
            lightboxBg.setAttribute("aria-hidden", "true");
            lightboxBg.classList.remove("lightbox--openned");
            lightboxBg.classList.add("lightbox--closed");
            lightBox.removeAttribute("open");
            lightBox.setAttribute("aria-modal", "false");
            body.style.overflow = "visible";
        }


        //lightbox close-btn
        lightBoxCloseBtn.addEventListener("click", () => {
            closeLightBox();
        });

        // Close lightBox when escape key is pressed
        window.addEventListener("keydown", (e) => {
            if (lightboxBg.getAttribute("aria-hidden") == 'false' && e.key == "Escape") {
                closeLightBox();
            }
        });

        //close lightbox with enter key
        lightBoxCloseBtn.addEventListener("keydown", (e) => {
            if (lightboxBg.getAttribute("aria-hidden") == 'false' && e.key == "Enter") {
                closeLightBox();
            }
        });

        //function for previous lightbox image
        function previousLightBoxImage(){
            let previousMedia = 0;
            let previousMediaKeys = 0;
            for(let i=0; i<filteredMediaArray.length; i++){
                if(lightBoxTitle.textContent === filteredMediaArray[i].title){
                    previousMedia = filteredMediaArray[i-1];
                    previousMediaKeys = Object.keys(filteredMediaArray[i-1]);
                }
            }
            if(previousMediaKeys.includes("image")){
                lightBoxMediaContainer.innerHTML = "";
                lightboxMedia = document.createElement('img');
                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + previousMedia.image);
                lightboxMedia.setAttribute("alt", previousMedia.description);
                lightBoxTitle.textContent = previousMedia.title;
                lightboxMedia.setAttribute("id", "lightbox__media");
                lightboxMedia.setAttribute("tabindex", "3");
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
                lightboxMedia.setAttribute("tabindex", "3");
                lightBoxMediaContainer.appendChild(lightboxMedia);
            }
        }

        //lightbox backward arrow functionality
        lightBoxPreviousBtn.addEventListener("click", () => {
            previousLightBoxImage();
        });

        //navigate light box with left-arrow on keyboard
        window.addEventListener("keydown", (e) => {
            if (lightboxBg.getAttribute("aria-hidden") == 'false' && e.key == "ArrowLeft") {
                previousLightBoxImage();
            }
        });

        //navigate lightbox with enter on backward arrow
        lightBoxPreviousBtn.addEventListener("keydown", (e) => {
            if (lightboxBg.getAttribute("aria-hidden") == 'false' && e.key == "Enter") {
                previousLightBoxImage();
            }
        });

        //function for next lightbox image
        function nextLightBoxImage(){
            let nextMedia = 0;
            let nextMediaKeys = 0;
            for(let i=0; i<filteredMediaArray.length; i++){
                if(lightBoxTitle.textContent === filteredMediaArray[i].title){
                    nextMedia = filteredMediaArray[i+1];
                    nextMediaKeys = Object.keys(filteredMediaArray[i+1]);
                }
            }
            if(nextMediaKeys.includes("image")){
                lightBoxMediaContainer.innerHTML = "";
                lightboxMedia = document.createElement('img');
                lightboxMedia.setAttribute("src", "/images/" + currentPhotographer.name + "/" + nextMedia.image);
                lightboxMedia.setAttribute("alt", nextMedia.description);
                lightBoxTitle.textContent = nextMedia.title;
                lightboxMedia.setAttribute("id", "lightbox__media");
                lightboxMedia.setAttribute("tabindex", "3");
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
                lightboxMedia.setAttribute("tabindex", "3");
                lightBoxMediaContainer.appendChild(lightboxMedia);
            }
        }

        //lightbox forward arrow functionality
        lightBoxNextBtn.addEventListener("click", () => {
            nextLightBoxImage();
        }); 

        //navigate lightbox with right-arrow keyboard
        window.addEventListener("keydown", (e) => {
            if (lightboxBg.getAttribute("aria-hidden") == 'false' && e.key == "ArrowRight") {
                nextLightBoxImage();
            }
        });

        //navigate lightbox with enter on forward arrow
        lightBoxNextBtn.addEventListener("keydown", (e) => {
            if (lightboxBg.getAttribute("aria-hidden") == 'false' && e.key == "Enter") {
                nextLightBoxImage();
            }
        });

        //constrain focus inside of light box
        document.addEventListener("keydown", (e) => {
            let isTabPressed = e.key === "Tab";
        
            if(!isTabPressed){
                return;
            }
        
            if(e.shiftKey){
                if(document.activeElement === lightBoxCloseBtn){
                    lightBoxNextBtn.focus();
                    e.preventDefault();
                }
            } else {
                if(document.activeElement === lightBoxNextBtn){
                    lightBoxCloseBtn.focus();
                    e.preventDefault();
                }
            }
        });

    }
}