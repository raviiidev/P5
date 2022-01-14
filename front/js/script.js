//connexion à l'API
fetch("http://localhost:3000/api/products")
.then((resp) => resp.json())
.then((data) => {
    console.log (data)

//affiche les produits sur la page d'accueil 
let items = document.getElementById('items');
let htmlitems ="";


for (let i in data){
    htmlitems += `<a href="./product.html?id=${data[i]._id}"> 
<article>
  <img src="${data [i].imageUrl}" alt="${data [i].altTxt}">
  <h3 class="productName">${data [i].name}</h3>
  <p class="productDescription">${data [i].description}</p> 
</article>
</a>`}
// string interpolation ` ${mavariable}`
items.innerHTML = htmlitems; 
})

