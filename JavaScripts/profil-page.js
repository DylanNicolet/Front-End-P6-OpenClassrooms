//DOM elements
const profilId = document.getElementById("profil-id-id");
const profilName = document.getElementById("profil-name-id");
const profilCity = document.getElementById("profil-city-id");
const profilTagline = document.getElementById("profil-tagline-id");
const profilTagsSection = document.getElementById("profil-tags-id");
const profilPicture = document.getElementById("profil-picture-id");


///access JSON database
let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', '/database.json');
apiRequest.send();

//main function for dynamic profil-page loading
apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(apiRequest.response);
        const photographersData = data.photographers;
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

        //loop  to create tags for profil-banner
        for (j=0; j<currentPhotographer.tags.length; j++){
            const newTagLink = document.createElement('a');
            newTagLink.textContent = "#" + currentPhotographer.tags[j];
            newTagLink.classList.add("profilpage-tags");
            newTagLink.setAttribute("href", "#");
            profilTagsSection.appendChild(newTagLink);
        }
        
        profilPicture.setAttribute("src", "/images/Photographers/" + currentPhotographer.portrait);
    }
}