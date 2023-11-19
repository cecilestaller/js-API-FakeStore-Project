// ===> General Variables
const gallerySection = document.getElementById('product-gallery')
let arrayWithAllObjects = [];

// ===> FETCH ALL PRODUCTS
const requestAllProductsFetch = () => {
    fetch('https://fakestoreapi.com/products')
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error("Etwas ist schief gegnangen")
        }
    })
    .then(data => {
        console.log(data);
        data.forEach((singleProduct) => {
            renderProducts(singleProduct); // ==> gibt die Produkte AUS
            arrayWithAllObjects.push(singleProduct); // ==> "kopiert" einzelne Objects in neues Array 
            
        })
        sortProductsByPrice(data);
    })
    .catch(error => console.log(error));
}
requestAllProductsFetch()


// ===> function um products zu ERSTELLEN
const renderProducts = (product) => {
    // elemente erstellen
    const createdDiv = document.createElement('div');
    const createdFigure = document.createElement('figure');
    const createdImage = document.createElement('img');
    const createdTitel = document.createElement('figcaption');
    const createdPrice = document.createElement('h3');
    const createdButton = document.createElement('button');
    const createdArticle = document.createElement('article')

    // image attribute
    createdImage.setAttribute('src', product.image);
    createdImage.setAttribute('alt', product.description);
    // figcaption titel vergeben
    createdTitel.textContent = product.title;
    // price vergeben
    createdPrice.textContent = `${product.price} $`;
    // button text
    createdButton.textContent = "Add to Cart";

    // child elements an parent elements hängen
    createdFigure.append(createdImage, createdTitel)
    createdArticle.append(createdPrice, createdButton)
    createdDiv.append(createdFigure, createdArticle);
    gallerySection.appendChild(createdDiv)
}

// ===> SORTIEREN
const sortProductsByPrice = (productsToBeSorted) => {
    const selectOptions = document.getElementById('sort-input');
    selectOptions.addEventListener("change", () => {
        const selectedIndexValue = selectOptions.value;
        gallerySection.innerHTML = '';

        if(selectedIndexValue === "asc"){
            productsToBeSorted.sort((productA, productB) => productA.price - productB.price);
            // console.log(arrayWithAllObjects);
        } else if (selectedIndexValue === "desc") {
            productsToBeSorted.sort((productA, productB) => productB.price - productA.price);
        }
        productsToBeSorted.forEach((sortedProduct) => {
            renderProducts(sortedProduct)
        })
    })
}

// ===> SUCHEN
const searchByTitle = () => {
    const userSearchInput = document.getElementById('user-search-input').value.trim();
    gallerySection.innerHTML = '';
    const userSearchMatches = arrayWithAllObjects.filter((filteredProduct) => {
        
        if(filteredProduct.title.toLowerCase().includes(userSearchInput.toLowerCase())){
            return filteredProduct
        }
    })
    userSearchMatches.forEach((productMatch) => {
        renderProducts(productMatch);
    })
    sortProductsByPrice(userSearchMatches);
}

// ==> Filter CATEGORIES
const filterByCategories = (category) => {
    gallerySection.innerHTML = '';

    if(category === 'electronics'){
        const userFilterByCategory = arrayWithAllObjects.filter((productByCategory) => {
            if(productByCategory.category === "electronics"){
                return productByCategory
            }
        }) 
        userFilterByCategory.forEach((categoryMatch) => {
            renderProducts(categoryMatch);
        })
        sortProductsByPrice(userFilterByCategory);
    } else if (category === 'jewelery'){
        const userFilterByCategory = arrayWithAllObjects.filter((productByCategory) => {
            if(productByCategory.category === "jewelery"){
                return productByCategory
            }
        }) 
        userFilterByCategory.forEach((categoryMatch) => {
            renderProducts(categoryMatch);
        })
        sortProductsByPrice(userFilterByCategory);
    } else if (category === `men's clothing`){
        const userFilterByCategory = arrayWithAllObjects.filter((productByCategory) => {
            if(productByCategory.category === "men's clothing"){
                return productByCategory
            }
        }) 
        userFilterByCategory.forEach((categoryMatch) => {
            renderProducts(categoryMatch);
        })
        sortProductsByPrice(userFilterByCategory);
    } else if (category === `women's clothing`){
        const userFilterByCategory = arrayWithAllObjects.filter((productByCategory) => {
            if(productByCategory.category === "women's clothing"){
                return productByCategory
            }
        }) 
        userFilterByCategory.forEach((categoryMatch) => {
            renderProducts(categoryMatch);
        })
        sortProductsByPrice(userFilterByCategory);
    }
}