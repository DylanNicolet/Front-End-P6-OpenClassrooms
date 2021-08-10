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
        for (let j=0; j<data.photographers.length; j++){
            createProfil(data.photographers[j]);
        }
    }
}



//function to create photographer profil
function createProfil(photographerName){

    let tags = photographerName.tags;
    let photographerImg = photographerName.portrait;

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
    newLink.setAttribute("href", "/profil-pages/" + photographerName.name + ".html");
    newImg.setAttribute("src", "/images/Photographers/" + photographerImg);
    newImg.setAttribute("alt", "");
    newH2.textContent = photographerName.name;
    newLocation.textContent = photographerName.city + ", " + photographerName.country;
    newTagline.textContent = photographerName.tagline;
    newPrice.textContent = "$" + photographerName.price + "/day";


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
        newTagSection.appendChild(newTagLink);

        const newSpan = document.createElement('span');
        newSpan.textContent = "Tag";
        newSpan.classList.add("screen-reader-only");
        newTagLink.appendChild(newSpan);
    };    
}
