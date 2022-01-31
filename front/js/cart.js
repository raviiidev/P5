/*//Récupère les données du local storage
let cart = JSON.parse(localStorage.getItem('cart'));
console.log('les canapés', cart);
const cartContainer = document.getElementById('cart__items');

// si le panier est vide :
if (cart === null || cart == 0) {
 cartContainer.innerHTML = `<div class="cart__item__img"> <p> Merci de sélectionner un produit </p></div>`
}
// si le panier contient un produit :
else {

  let affichage = "";

  // boucle forEach pour attribuer les différentes values 
  cart.forEach((item) => {
    const { id, price, color, alt, name, quantity, image } = item;

    affichage += `
    
    <article class="cart__item" data-id="${id}" data-color="${color}">
    <div class="cart__item__img">
      <img src="${image}" alt="${alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${name}</h2>
        <p>${color}</p>
        <p>${price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `

    document.getElementById('cart__items').innerHTML = affichage;
 
    console.table(cart);
    
    // fonction pour afficher les prix dans le html || servira pour raffraichir les prix ensuite 
    function updateQuantityPrice(){

      // je récupère les quantités
    let itemQtt = document.getElementsByClassName('itemQuantity');
    let pdtLength = itemQtt.length; //somme (des qtés)

    // j'initialise ma variable pour le total des quantités
    let totalQtt = 0;

    // je boucle pour savoir le total des quantités
    for (var q = 0; q < pdtLength; q++) {
      totalQtt += itemQtt[q].valueAsNumber;
    };

    // je transmet le résultat à mon html 
    let qttDisplay = document.getElementById('totalQuantity');
    qttDisplay.innerHTML = totalQtt;
    console.log(totalQtt);

    // j'initialise ma variable pour le total des prix
    let totalPrice = 0;

    // je boucle pour avoir le prix des articles en fonction des quantités 
    for (let q = 0; q < pdtLength; q++) {
      totalPrice += (itemQtt[q].valueAsNumber * cart[q].price);
    };

    // je transmet le résultat à mon html 
    let priceDisplay = document.getElementById('totalPrice');
    let fix = Math.round(totalPrice);
    priceDisplay.innerHTML = fix;

    // pour finir je set mon cart (sera surtout utile quand je delete un canapé)
    localStorage.setItem("cart", JSON.stringify(cart));
    
    };//fin function

    updateQuantityPrice();
   

  
    // fonction pour supprimer un produit choisi
    function deleteProduct() {
      let deleteItem = document.querySelectorAll(".deleteItem");

      for (let s = 0; s < deleteItem.length; s++) {
        deleteItem[s].addEventListener("click", (event) => {
          event.preventDefault();

          let idDelete = cart[s].id;
          let colorDelete = cart[s].color;

          // méthode filter pour trouver le bon élément de la boucle 
          cart = cart.filter(el => el.id !== idDelete || el.color !== colorDelete);

          // removeChild pour enlever dynamiquement le html de l'article
          let target = document.getElementById('cart__items');
          target.childNodes[s];
          target.removeChild(target.children[s]);

          // update des prix et quantités de façon dynamique 
          updateQuantityPrice();
        })
        
      }
    }
    deleteProduct();

    
    // fonction pour que l'utilisateur puisse changer la quantité d'un canapé 
    function qttChange() {

      let itemqtt = document.querySelectorAll(".itemQuantity");

      // je boucle la longueur pour chaque quantité 
      for (let k = 0; k < itemqtt.length; k++) {
        itemqtt[k].addEventListener("change", (e) => {
          e.preventDefault();

          //je sélectionne l'élément à modifier 
          const qttSelect = cart[k].quantity;
          const qttValue = itemqtt[k].valueAsNumber;

          // je cherche l'élement que je veux avec la méthode find 
          const qttSearch = cart.find((el) => el.qttValue !== qttSelect);

          qttSearch.quantity = qttValue;
          cart[k].quantity = qttSearch.quantity;

          // je remplace le panier avec les bonnes valeurs 
          updateQuantityPrice();

        });
      };

    };
    qttChange();


  });// fin du for each 


}; // fin de else 
*/
