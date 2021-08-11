//DOM elements
const title = document.getElementById("title");
const main = document.getElementById("main-content");
const tagButtons = document.getElementsByClassName("profil-navtag");

//access JSON database
let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'database.json');
apiRequest.send();

//main function for dynamic webpage loading
apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(apiRequest.response);

        //loop for accessing photographer's data from JSON + create each profil
        const photographersData = data.photographers;
        
        createProfil(photographersData);

        for (j=0; j<tagButtons.length; j++){
            tagButtons[j].addEventListener("click", ($event) => {
                let rawText = $event.target.text.toLowerCase();
                let text = rawText.slice(1, rawText.length -3);

                let newPhotographersData = photographersData.filter(function(photographers) {
                    if (photographers.tags.includes(text)){
                        return true;
                    }
                })

                createProfil(newPhotographersData);
            });
        }
    }
}



//function to create photographer profil
function createProfil(photographers){
    main.innerHTML = "";
    for (let z=0; z<photographers.length; z++){
        
        let tags = photographers[z].tags;
        let photographerImg = photographers[z].portrait;

        //create DOM elements
        const newSection = document.createElement('section');
        const newLink = document.createElement('a');
        const newImg = document.createElement('img');
        const newH2 = document.createElement('h2');
        const newLocation = document.createElement('p');
        const newTagline = document.createElement('p');
        const newPrice = document.createElement('p');
        const newTagSection = document.createElement('section');

        //add content from JSON file to new DOM elements
        newLink.setAttribute("href", "/profil-pages/" + photographers[z].name + ".html");
        newImg.setAttribute("src", "/images/Photographers/" + photographerImg);
        newImg.setAttribute("alt", "");
        newH2.textContent = photographers[z].name;
        newLocation.textContent = photographers[z].city + ", " + photographers[z].country;
        newTagline.textContent = photographers[z].tagline;
        newPrice.textContent = "$" + photographers[z].price + "/day";


        //add class names to new DOM elements
        newSection.classList.add("photographer-profil");
        newLink.classList.add("photographer-main-link");
        newLocation.classList.add("photographer-location");
        newTagline.classList.add("photographer-tagline");
        newPrice.classList.add("photographer-price");

        //append all new DOM elements
        main.appendChild(newSection);
        newSection.appendChild(newLink);
        newLink.appendChild(newImg);
        newLink.appendChild(newH2);
        newSection.appendChild(newLocation);
        newSection.appendChild(newTagline);
        newSection.appendChild(newPrice);
        newSection.appendChild(newTagSection);

        //loop to create new DOM elements for tags
        for (let i=0; i<tags.length; i++){
            const newTagLink = document.createElement('a');
            newTagLink.textContent = "#" + tags[i];
            newTagLink.classList.add("profil-navtag");
            newTagLink.setAttribute("href", "#");
            newTagSection.appendChild(newTagLink);

            const newSpan = document.createElement('span');
            newSpan.textContent = "Tag";
            newSpan.classList.add("screen-reader-only");
            newTagLink.appendChild(newSpan);
        };

       
    }
}
