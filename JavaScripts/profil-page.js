//DOM elements
const profilId = document.getElementById("profil-id-id");
const profilName = document.getElementById("profil-name-id");
const profilCity = document.getElementById("profil-city-id");
const profilTagline = document.getElementById("profil-tagline-id");
const profilTagsSection = document.getElementById("profil-tags-id");
const profilPicture = document.getElementById("profil-picture-id");
const mediaSection = document.getElementById("media-section-id");


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

        //create media section
        for (x=0; x<currentPhotographerMedia.length; x++){
            let keys = Object.keys(currentPhotographerMedia[x]);
            
            const newMediaCard = document.createElement('section');
            const newMediaTitle = document.createElement('p');
            const newMediaLikeCount = document.createElement('p');
            const newMediaLikeIcon = document.createElement('i');
            mediaSection.appendChild(newMediaCard);
            const newLikeSection = document.createElement('section');

            if(keys.includes("image")){
                const newImg = document.createElement('img');
                newImg.setAttribute("src", "/images/" + currentPhotographer.name + "/" + currentPhotographerMedia[x].image);
                newImg.setAttribute("class", "media-section__media");
                newMediaCard.appendChild(newImg);
            }

            if(keys.includes("video")){
                const newVideo = document.createElement('video');
                newVideo.setAttribute("src", "/images/" + currentPhotographer.name + "/" + currentPhotographerMedia[x].video);
                newVideo.setAttribute("type", "video/mp4");
                newVideo.setAttribute("controls", "");
                newVideo.setAttribute("class", "media-section__media");
                newMediaCard.appendChild(newVideo);
            }
            
            newMediaTitle.textContent = currentPhotographerMedia[x].title;
            newMediaLikeCount.textContent = currentPhotographerMedia[x].likes;
            newMediaLikeIcon.setAttribute("class", "fas fa-heart");

            newMediaTitle.setAttribute("class", "media-section__title");
            newLikeSection.setAttribute("class", "media-section__likesection");
            newMediaLikeCount.setAttribute("class", "media-section__likecount");

            newMediaCard.appendChild(newMediaTitle);
            newMediaCard.appendChild(newLikeSection);
            newLikeSection.appendChild(newMediaLikeCount);
            newLikeSection.appendChild(newMediaLikeIcon);
        }

        
        

    }
}