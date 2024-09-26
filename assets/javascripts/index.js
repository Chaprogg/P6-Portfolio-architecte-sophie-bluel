// Access DOM HTML
const PortfolioH2 = document.querySelector("#portfolio h2");
const portfolioNav = document.querySelector("#portfolio nav");
const divGallery = document.querySelector(".gallery");
const divModal = document.querySelector(".modalGallery");

// Import objects of json format
async function getWorks() {
    const arrayWorksRequest = await fetch("http://localhost:5678/api/works");
    return await arrayWorksRequest.json();   
}
 
//Creat button-nav for all Categories
const buttonAll = document.createElement("button");
buttonAll.innerText = "Tous"
buttonAll.id = 0;
buttonAll.classList.add("buttonSelectedCategories");
portfolioNav.appendChild(buttonAll);
portfolioNav.classList.add("portfolioNav");
buttonAll.classList.add("buttonCategories");

// Import category object from table in json format
async function getCategories () {
    const arrayCategoriesResponse = await fetch("http://localhost:5678/api/categories");
    return await arrayCategoriesResponse.json();   
}

// Create a button for each category
async function displayPortfolioCategory () {
    const arrayCategoriesDisplay = await getCategories();
    arrayCategoriesDisplay.forEach(elementCategories => {
        const buttonCategories = document.createElement("button");
        buttonCategories.textContent = elementCategories.name
        buttonCategories.id = elementCategories.id
        buttonCategories.classList.add("buttonCategories");
        portfolioNav.appendChild(buttonCategories);
    });
}
displayPortfolioCategory();

// Showing unfiltered array objects in HTML DOM (Affichage des objets non filtrés)
async function displayWorksList (arrayWorksResponse) {
    divGallery.innerHTML =""
    arrayWorksResponse.forEach((elementWorks) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = elementWorks.imageUrl;
        figcaption.textContent = elementWorks.title;
        figure.classList.add("galleryStyle");
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        divGallery.appendChild(figure);
    });
};
//
const arrayWorksResponse = await getWorks(); // peut etre mal placer?
displayWorksList(arrayWorksResponse);

// Categories Filtered by Buttons 
async function filterCategories() {
    const arrayfilterCategories = await getWorks();
    const buttonSelected = document.querySelectorAll("#portfolio nav button");
// For each button display its category (pour chaque categorie afficher un bouton)
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
};
filterCategories();

// Modal Display Gallery
async function modalDisplayWorksList (modalArrayWorksResponse) {
    divModal.innerHTML =""
    modalArrayWorksResponse.forEach((elementWorks) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const spanTrash = document.createElement("span");
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");
        icon.id = elementWorks.id;
        spanTrash.style.position = "absolute"
        img.src = elementWorks.imageUrl;
        figure.classList.add("galleryStyle");
        figure.appendChild(img);
        spanTrash.appendChild(icon);
        figure.appendChild(spanTrash);
        divModal.appendChild(figure);
    });
    console.log(modalArrayWorksResponse);
    removePicture(); 
}

const modalArrayWorksResponse = await getWorks();
modalDisplayWorksList(modalArrayWorksResponse);

// Session login and Logout buttons Modal
const log = window.sessionStorage.token
const login = document.querySelector("header .login");
const headBandeau = document.querySelector(".headbandeau");
const logout = document.querySelector("header nav .logout");
const modifierAccess = document.querySelector(".modifier");
const mainModal = document.getElementById("mainModal");
const modal2 = document.getElementById("addPictureModal");
const faXmark = document.querySelector(".fa-xmark");
const faXmark2 = document.querySelector("#addPictureModal .fa-xmark");
const faArrowLeft = document.querySelector(".fa-arrow-left");
const accessAddPictureModal =document.querySelector(".buttonAddPictureAccessModal");

if (log !== undefined) {
    login.textContent ="logout";
    headBandeau.style.display = "flex";
    modifierAccess.style.display = "flex";
    portfolioNav.style.display = "none";
    login.addEventListener("click", () => {
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("userId");
    });
};

// Modal One Access
 modifierAccess.addEventListener("click", (event) => {
    event.preventDefault();
    mainModal.style.display = "flex";
});
// Close Main modal
mainModal.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event.target.className);
    if (event.target.className == "modalBackgroundTransparency") {
       mainModal.style.display = "none";
    };
});

faXmark.addEventListener("click", (event) => {
    mainModal.style.display = "none";
});

accessAddPictureModal.addEventListener("click", (event) => {
    event.preventDefault();
    mainModal.style.display ="none";
    modal2.style.display = "flex";
});

// Modal Two Access
faXmark2.addEventListener("click", (event) => {
    modal2.style.display = "none";
});

faArrowLeft.addEventListener("click", (event) => {
    event.preventDefault()
    mainModal.style.display = "flex"
    modal2.style.display = "none"    
});

modal2.addEventListener("click", (event) => {
     if (event.target.className == "modalBackgroundTransparency") {
        modal2.style.display = "none"
     };
});

// Modal Delete Picture
function removePicture() {
    const trash = document.querySelectorAll(".fa-trash-can")
    trash.forEach(remove => {
        remove.addEventListener("click", () => {
            location.reload();
            const idRemoved = remove.id;
            const removeUpdate ={
                method:'DELETE',
                headers:{"content-Type": "application/json", "Authorization": `Bearer ${log}` },
            };

            fetch("http://localhost:5678/api/works/" +idRemoved,removeUpdate,)
            .then((noDelet) => {
                //if (!noDelet.ok) {
                 //   console.log("Pas de suppression");
               // }
                // Cela veut dire retourner les Id(s) (Les Filtrer les Afficher) des Objet qui son differente des Id(s) supprimer
                const filteredWorks = arrayWorksResponse.filter ((selected) => {
                    return selected.id != idRemoved;    
                });
                    console.log("Suppression OK")
                    displayWorksList (filteredWorks)    
            })
            
        })
    })
}

removePicture()

// Modal Add Picture
const preview = document.querySelector(".preview-added-picture")
const faImage = document.querySelector(".fa-image")
const label = document.querySelector(".addPictureButton")
const inputFile = document.querySelector(".hidden-input")
const paragraph = document.querySelector(".text-add-picture")
 
// Input File IMG
inputFile.addEventListener("change", () => {
    const file = inputFile.files[0]
    console.log(file)
    if (file) {
        const reader = new FileReader()
        reader.onload = function (event) {
            preview.src = event.target.result
            preview.style.display = "flex"
            faImage.style.display = "none"
            label.style.display = "none"
            paragraph.style.display = "none"
        }
        reader.readAsDataURL(file)
    }
})

// Function Vérification and validation  type of MIME


//myForm.addEventListener("submit", (event) => {
  //  const imgFile = document.getElementById("file")
    //const myRegex =   new RegExp  \\.(jpg|gif|png)

    //if (imgFile.value.trim() == "") {
      //  const error = document.getElementById("Error")
        //error.innerHTML = "Une image valide est requise."
        //error.style.color ="red"
        //event.preventDefault()
    //} else {
      //  console.log

    //}
//})

// Javascript program to validate
// Image File using Regular Expression
 
// Function to validate the
// Image File

const imgFile = document.getElementById("file")
const picture = document.getElementById("picture")
function imageFile(imgFile) {
    // Regex to check valid
    // Image File
    let regex = new RegExp(/\\.(jpg|jpeg|png|JPG|JPEG|PNG|)$/);
 
    // if str
    // is empty return false
    if (!regex.test (value)) {
        picture.innerHTML = "error"
        picture.style.color ="red"
    }
 
    // Return true if the str
    // matched the ReGex
    if (regex.test(imgFile) == true) {
        return "true";
        console.log(imgFile)
    }
    else {
        return "false";
    }
    
}

//imageFile(imgFile);

//Dynamique Select Options
async function modalSelectCategorie() {
    const selectCategorie = document.querySelector(".categorieSelect select")
    const categories = await getCategories()
    categories.forEach(categorie => {
        const option = document.createElement("option")
        option.value = categorie.id
        option.textContent = categorie.name
        selectCategorie.appendChild(option)
    })    
}
modalSelectCategorie();

//Post Picture
const form = document.querySelector(".modalBackgroundTransparency form")
const title = document.querySelector(".modalBackgroundTransparency #title")
const categorie = document.querySelector(".modalBackgroundTransparency #categorie")

// Adding the image of its title and selecting the category (ajout de l'image de son titre et selection de sa categorie)
form.addEventListener("submit", async (event) => {
    event.preventDefault()
    modal2.style.display = "none"
    const file = inputFile.files[0]
    const formSubmit = new FormData()
    formSubmit.append("image",file)
    formSubmit.append("category",categorie.value)
    formSubmit.append("title",title.value)
   
    fetch("http://localhost:5678/api/works",{
        method:"POST",
        body:formSubmit,
        headers:{"Authorization": `Bearer ${log}`},
    })

    // POST new image 
    .then(result => result.json())
    .then(resultJson => {
        console.log(resultJson)
        arrayWorksResponse.push(resultJson)
        modalArrayWorksResponse.push(resultJson)
        console.log("Formulaire valeur", resultJson)
        displayWorksList(arrayWorksResponse)
        modalDisplayWorksList(modalArrayWorksResponse)
        form.reset()
        preview.style.display = "none"
        faImage.style.display = "flex"
        label.style.display = "flex"
        paragraph.style.display = "flex"
    })
    .catch((error) => console.log("listing error",error))
})

//Formulaire validation conditions
const validatButton = document.querySelector(".formAddPicture button")
const fileReset = document.getElementById("file")
const titleReset =  document.getElementById("title")

function formValidat() {

    form.addEventListener("input", () => {
        if (file.value !=="" && title.value !=="" && categorie.value !=="") {
            validatButton.classList.add("buttonValidatePictureActive")
            validatButton.disabled = false
        }
        else {
            validatButton.classList.remove("buttonValidatePictureActive")
            validatButton.disabled = true
        }
    })
}
formValidat();