// utilisation de searchparams pour récupérer l'id du bon produit pour chaque objet
let params = new URL(document.location).searchParams
let id = params.get('id')
const UrlProduct = 'http://localhost:3000/api/products/' + id

// appel de l'api

fetch(UrlProduct)
  .then((response) => response.json())
  .then((data) => {
      
    //appel des éléments depuis l'API
    const image = document.querySelector('.item__img')
    const titre = document.querySelector('#title')
    const prix = document.querySelector('#price')
    const description = document.querySelector('#description')

    //relié API et HTML
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
    imageURL = data.imageUrl
    imageAlt = data.altTxt
    titre.innerHTML = `${data.name}`
    prix.innerHTML = `${data.price}`
    description.innerHTML = `${data.description}`
    const colors = data.colors
    optionColors(colors)

    function optionColors(colors) {
      const select = document.querySelector('#colors')
      colors.forEach((couleur) => {
        const option = document.createElement('option')
        option.textContent = couleur
        select.appendChild(option)
      })
    }
  })
  .catch(function (err) {
    console.log('Fetch Erreur')
    alert(
      'Veuillez nous excusez les produits ne sont pas disponible pour le moment.',
    )
  })
//boucle pour chercher les couleurs dans l'API

/*Produit API
  "colors": [
    "Blue",
    "White",
    "Black"
    ],
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
    "altTxt": "Photo d'un canapé bleu, deux places"
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."*/
