// ===> General Variables
const gallerySection = document.getElementById('product-gallery')
let arrayWithAllObjects = [];

const requestAllProductsFetch = () => {
    fetch('https://fakestoreapi.com/products')
    .then(response => {
        // console.log(response);
        if(response.ok){
            return response.json();
        } else {
            throw new Error("Etwas ist schief gegnangen")
        }
    })
    .then(data => {
        // console.log(data);
        data.forEach((singleProduct) => {
            // console.log(singleProduct);
            renderProducts(singleProduct); // ==> gibt die Produkte AUS
            arrayWithAllObjects.push(singleProduct); // ==> "kopiert" einzelne Objects in neues Array 
        })
    })
    .catch(error => console.log(error));
}
requestAllProductsFetch()


// ===> function um products zu ERSTELLEN
const renderProducts = (product) => {
    // console.log(product);
    // elemente erstellen
    const createdDiv = document.createElement('div');
    const createdFigure = document.createElement('figure');
    const createdImage = document.createElement('img');
    const createdTitel = document.createElement('figcaption');
    const createdPrice = document.createElement('h3');
    const createdButton = document.createElement('button');

    // image attribute
    createdImage.setAttribute('src', product.image);
    createdImage.setAttribute('alt', product.description);
    // figcaption titel vergeben
    createdTitel.textContent = product.title;
    // price vergeben
    createdPrice.textContent = product.price;
    // button text
    createdButton.textContent = "Add to Cart";

    // child elements an parent elements hängen
    createdFigure.append(createdImage, createdTitel)
    createdDiv.append(createdFigure, createdPrice, createdButton);
    gallerySection.appendChild(createdDiv)
}

// ===> SORTIEREN
const sortProductsByPrice = () => {
    // console.log(arrayWithAllObjects);
    const selectOptions = document.getElementById('sort-input');
    const selectedIndexValue = selectOptions.value;
    // console.log(selectedIndexValue);
    gallerySection.innerHTML = '';

    if(selectedIndexValue === "asc"){
        arrayWithAllObjects.sort((productA, productB) => productA.price - productB.price);
        // console.log(arrayWithAllObjects);
    } else if (selectedIndexValue === "desc") {
        arrayWithAllObjects.sort((productA, productB) => productB.price - productA.price);
    }
    arrayWithAllObjects.forEach((sortedProduct) => {
    renderProducts(sortedProduct)
    })
}

// ===> SUCHEN
// !! TO DO: mit sort function verknüpfen
const searchByTitle = () => {
    const userSearchInput = document.getElementById('user-search-input').value.trim();
    console.log(userSearchInput);
    gallerySection.innerHTML = '';

    const userSearchMatches = arrayWithAllObjects.filter((filteredProduct) => {
        console.log(filteredProduct);
        if(filteredProduct.title.toLowerCase().includes(userSearchInput.toLowerCase())){
            return filteredProduct
        }
        // sortProductsByPrice(filteredProduct);
    })
    userSearchMatches.forEach((productMatch) => {
        renderProducts(productMatch);
        
    })
}

// ==> Filter CATEGORIES
console.log(arrayWithAllObjects);