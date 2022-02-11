/*<article class="cart__item" data-id="{panier-ID}" data-color="{panier-color}">
                <div class="cart__item__img">
                  <img src="../images/panier01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> */

// récpurer le tableau dans le localStorage
let arrayItem= JSON.parse(localStorage.getItem('panier'))
console.log(arrayItem)

const article = document.querySelector('cart__item')
const image = document.querySelector('.item__img')


