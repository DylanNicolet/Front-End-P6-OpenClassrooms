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

                if(keys.includes("image")){
                    const newImgLink = document.createElement('a');
                    newImgLink.setAttribute("href", "#");
                    const newImg = document.createElement('img');
                    newImg.setAttribute("src", "/images/" + currentPhotographer.name + "/" + mediaArray[x].image);
                    newImg.setAttribute("class", "media-section__media");
                    newMediaCard.appendChild(newImgLink);
                    newImgLink.appendChild(newImg);

                }

                if(keys.includes("video")){
                    const newVideoLink = document.createElement('a');
                    newVideoLink.setAttribute("href", "#");
                    const newVideo = document.createElement('video');
                    newVideo.setAttribute("src", "/images/" + currentPhotographer.name + "/" + mediaArray[x].video);
                    newVideo.setAttribute("type", "video/mp4");
                    newVideo.setAttribute("class", "media-section__media");
                    newMediaCard.appendChild(newVideoLink);
                    newVideoLink.appendChild(newVideo);
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

            loadMedia(orderArray);
        });
    }
}