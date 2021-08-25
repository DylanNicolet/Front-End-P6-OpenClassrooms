//DOM elements
const title = document.getElementById("title");
const main = document.getElementById("main-content");
const tagButtons = document.getElementsByClassName("navbar-navtag");
const profilTagButtons = document.getElementsByClassName("profil-navtag");

//access JSON database
let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'database.json');
apiRequest.send();


//main function for dynamic webpage loading
apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(apiRequest.response);
        const photographersData = data.photographers;
        
        createProfil(photographersData);

        //loop for navigation tags to reload homepage dynamically when clicked
        for (j=0; j<tagButtons.length; j++){
            tagButtons[j].addEventListener("click", ($event) => {
                let rawText = $event.target.text.toLowerCase(); //makes tag name lowercase
                let text = rawText.slice(1, rawText.length -3); //removes "#" and "tag" from tag name

                //filters photographer's profils to match selected navigation tag
                let newPhotographersData = photographersData.filter(photographers => (photographers.tags.includes(text)))

                createProfil(newPhotographersData); //reloads page with new set of profils
            });
        }        

        //loop for profil tags to reload homepage dynamically when clicked
        for (v=0; v<profilTagButtons.length; v++){
            profilTagButtons[v].addEventListener("click", ($event) => {
                let rawText = $event.target.text.toLowerCase();
                let text = rawText.slice(1, rawText.length -3);

                let newPhotographersData = photographersData.filter(photographers => (photographers.tags.includes(text)))

                createProfil(newPhotographersData);
            });
        }
    }
}



//function to create photographer profil
function createProfil(photographers){

    main.innerHTML = ""; //resets main section of HTML

    //create title for main section
    const newH1 = document.createElement('h1');
    newH1.textContent = "Our photographers";
    newH1.id = "title";
    main.appendChild(newH1);

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
        newLink.setAttribute("aria-label", photographers[z].name);
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

            //adds event listener to new tags
            newTagLink.addEventListener("click", ($event) => {
                let rawText = $event.target.text.toLowerCase();
                let text = rawText.slice(1, rawText.length -3);

                if(apiRequest.readyState === XMLHttpRequest.DONE) {
                    const data = JSON.parse(apiRequest.response);
                    const photographersData = data.photographers;

                    let newPhotographersData = photographersData.filter(photographers => (photographers.tags.includes(text)))

                    createProfil(newPhotographersData);
                }
            });
        };
    }
}
