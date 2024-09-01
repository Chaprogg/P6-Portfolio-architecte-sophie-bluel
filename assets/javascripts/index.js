// Access DOM HTML
const PortfolioH2 = document.querySelector("#portfolio h2")
const portfolioNav = document.querySelector("#portfolio nav")
const divGallery = document.querySelector(".gallery")
const divModal = document.querySelector(".modalGallery")
// Function Import works objects of array at Json format
async function getWorks() {
    const arrayWorksRequest = await fetch("http://localhost:5678/api/works");
    return await arrayWorksRequest.json();   
}
 
// Creat nav balise
//const navBalise = document.createElement("nav")
//introduction.appendChild(navBalise)
//console.log(navBalise)

//Creat button-nav for all Categories
const buttonAll = document.createElement("button");
buttonAll.innerText = "Tous"
buttonAll.id = 0
buttonAll.classList.add("buttonSelectedCategories")
portfolioNav.appendChild(buttonAll);
portfolioNav.classList.add("portfolioNav");
buttonAll.classList.add("buttonCategories");

// Function import objectsof a category of array at json format
async function getCategories () {
    const arrayCategoriesResponse = await fetch("http://localhost:5678/api/categories");
    return await arrayCategoriesResponse.json();   
}

// Display button category of array-categories
async function displayPortfolioCategory () {
    const arrayCategoriesDisplay = await getCategories();
    arrayCategoriesDisplay.forEach(elementCategories => {
        const buttonCategories = document.createElement("button");
        buttonCategories.textContent = elementCategories.name
        buttonCategories.id = elementCategories.id
        buttonCategories.classList.add("buttonCategories")
        portfolioNav.appendChild(buttonCategories)
    });
}
displayPortfolioCategory()

// Display of Array at Objects non Filtered in DOM HTML
async function displayWorksList (arrayWorksResponse) {
    
    arrayWorksResponse.forEach((elementWorks) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = elementWorks.imageUrl
        figcaption.textContent = elementWorks.title
        figure.classList.add("galleryStyle")
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        divGallery.appendChild(figure)
        
    });
    console.log(arrayWorksResponse)
}
const arrayWorksResponse = await getWorks();
displayWorksList(arrayWorksResponse);

// AddEventListener Display Filtered by Buttons of Categories
async function filterCategories() {
    const arrayfilterCategories = await getWorks();
    const buttonSelected = document.querySelectorAll("#portfolio nav button");
        console.log(buttonSelected)
// Considered All buttons for this fonction
    buttonSelected.forEach(elementSelected => {
        elementSelected.addEventListener("click",(event) =>{
            buttonSelected.forEach((button) => {
                button.classList.remove("buttonSelectedCategories");
              });
              elementSelected.classList.add("buttonSelectedCategories");
            const selectedCategorie = event.target.id;
            divGallery.innerHTML = "";
            if (selectedCategorie !== "0") {
                const filteredWorks = arrayfilterCategories.filter ((selected) => {
                    return selected.categoryId == selectedCategorie;    
                });
    
                displayWorksList(filteredWorks);
            } else {
                displayWorksList (arrayWorksResponse);   
            }
        });
    });
}
filterCategories()

// Modal Display Gallery
async function modalDisplayWorksList (modalArrayWorksResponse) {
    
    modalArrayWorksResponse.forEach((elementWorks) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const spanTrash = document.createElement("span")
        const icon = document.createElement("i")
        icon.classList.add("fa-solid", "fa-trash-can")
        spanTrash.style.position = "absolute"
        img.src = elementWorks.imageUrl
        figure.classList.add("galleryStyle")
        
        spanTrash.addEventListener("click",() =>{

        })

        figure.appendChild(img);
        spanTrash.appendChild(icon)
        figure.appendChild(spanTrash)
        divModal.appendChild(figure)        
    console.log(spanTrash)
    });
    console.log(modalArrayWorksResponse);
    
}
const modalArrayWorksResponse = await getWorks();
modalDisplayWorksList(modalArrayWorksResponse);

// Session loged and Logout buttons Modal

const log = window.sessionStorage.token
const login = document.querySelector("header .login")
const headBandeau = document.querySelector(".headbandeau")
const logout = document.querySelector("header nav .logout")
const modifierAccess = document.querySelector(".modifier")
const mainModal = document.querySelector("#mainModal")
const modal2 = document.querySelector(".addPictureModal")
const faXmark = document.querySelector(".fa-xmark")
const faXmark2 = document.querySelector("#addPictureModal .fa-xmark")
const faArrowLeft = document.querySelector(".fa-arrow-left")
const addPictureModal =document.querySelector(".buttonAddPictureAccessModal")

if (log !== undefined) {
    login.textContent ="logout"
    headBandeau.style.display = "flex"
    modifierAccess.style.display = "flex"
    portfolioNav.style.display = "none"
    login.addEventListener("click", () => {
        window.sessionStorage.removeItem("token")
        window.sessionStorage.removeItem("userId")
    });
}

console.log(log)
// Modal One
 modifierAccess.addEventListener("click", (event) => {
    event.preventDefault();
    mainModal.style.display = "flex"
})

mainModal.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event.target.className)
    if (event.target.className == "modal") {
       mainModal.style.display = "none"
    }
})

faXmark.addEventListener("click", (event) => {
    mainModal.style.display = "none"
})

// Modal Two
addPictureModal.addEventListener("click", (event) => {
    event.preventDefault();
    mainModal.style.display ="none"
    modal2.style.display = "flex"
})

faXmark2.addEventListener("click", (event) => {
    modal2.style.display = "none"
}) 

faArrowLeft.addEventListener("click", (event) => {
    event.preventDefault()
    mainModal.style.display = "flex"
    modal2.style.display = "none"    
})

modal2.addEventListener("click", (event) => {
     if (event.target.className == "addPictureModal") {
        modal2.style.display = "none"
     }
})

// Modal Delete Picture
const 