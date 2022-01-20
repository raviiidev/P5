// utilisation de searchparams pour récupérer l'id du bon produit pour chaque objet 
let params = new URL(document.location).searchParams;
let id = params.get("id");
const newUrl = "http://localhost:3000/api/products/" + id;


const colors = document.getElementById("colors");
const itemQty = document.getElementById("quantity");
const imageURL ="";

// appel de l'api 

fetch(newUrl)
  .then(response => response.json())
  .then((data) => {
    console.log(data);

    resultApi = data;

    // const pour afficher les produits de l'Api 
    const image = document.querySelector('.item__img');
    const titre = document.querySelector('#title');
    const prix = document.querySelector('#price');
    const description = document.querySelector('#description');
    const colors = document.querySelector('#colors');
    let imageURL = "";
    let imageAlt = "";

    // mise en page de l'api avec le DOM
    image.innerHTML = `<img src="${resultApi.imageUrl}" alt="${resultApi.altTxt}">`;
    imageURL = resultApi.imageUrl;
    imageAlt = resultApi.altTxt;
    titre.innerHTML = `${resultApi.name}`;
    prix.innerText = `${resultApi.price }`;
    description.innerText = `${resultApi.description}`;

    // boucle pour mettre en place les options de couleurs 
    for(let i in resultApi.colors){
      colors.innerHTML += `<option value="${resultApi.colors[i]}">${resultApi.colors[i]}</option>`
    }
    
    // création du formulaire d'envoi du bouton 
    let sendToCart = document.getElementById("addToCart");
    sendToCart.addEventListener("click", (event) => {
      window.location.href="cart.html"
      event.preventDefault();

    // recupération des données dans le local storage
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);

     //ajout au panier et enregistre dans le localstorage
      const addItemInLocal = () => {
        cart.push(arrayItem); 
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(addItemInLocal);
      }

      const addConfirm = () => {
        alert('Le produit a été ajouté au panier');
      }

      // création du tableau d'informations que je vais retourner au localStorage
    const arrayItem = {

      id: id,
      alt: imageAlt,
      image: imageURL,
      name: titre.innerHTML,
      price: prix.innerHTML,
      color: colors.value,
      quantity: itemQty.value,
    };
    console.log(arrayItem);

      let update = false;

      // s'il y a des produits enregistrés dans le localStorage
      if (cart) {
        const resultFind = cart.find(
          (e) => e.id === id && e.color === colors.value);
        

        // s'il y a déjà un produit enregistré dans le storage
        if (!update) {
          addItemInLocal();
          addConfirm();
          console.log(cart);
        }
      }

      // s'il n'y a aucun produit enregistré dans le localStorage 
      else {
        cart = [];
        addItemInLocal();
        addConfirm();
        console.log(cart);
      }

    });
  });
