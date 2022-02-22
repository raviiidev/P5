//récupère les données du local storage
let arrayItem = JSON.parse(localStorage.getItem('panier'))
console.log('les canapés', arrayItem)
const cartContainer = document.getElementById('cart__items')

// si le panier est vide :
if (arrayItem === null || arrayItem == 0) {
  const empty = `<p>Votre panier est vide</p>`
  cartContainer.innerHTML = empty
}

// si pas vide
else {
  let affichage = ''

  fetch('http://localhost:3000/api/products/')
    .then((response) => response.json())
    .then((response) => {
      // boucle forEach pour attribuer les différente values
      arrayItem.forEach((product) => {
        const { id, color, alt, name, quantity, img } = product
        const data = response
        //cherche dans le tableau l'ID correspondant
        const search = data.find((el) => el._id === id)
        const price = search.price

        //relie et affiche les produits selectionnés entre le HTML et le DOM
        affichage += ` 
    
    <article class="cart__item" data-id="${id}" data-color="${color}">
    <div class="cart__item__img">
      <img src="${img}" alt="${alt}">
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}" onFocus="this.blur()"> 
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `

        document.getElementById('cart__items').innerHTML = affichage

        console.table(arrayItem)

        // fonction pour afficher les prix || servira pour raffraichir les prix ensuite
        function updateQuantityPrice() {
          // je récupère les quantités
          let itemQtt = document.getElementsByClassName('itemQuantity')
          let pdtLength = itemQtt.length

          // j'initialise le compteur de ma variable à 0 (pour le total des quantités)
          let totalQtt = 0

          // je boucle pour savoir le total
          for (let q = 0; q < pdtLength; q++) {
            totalQtt += itemQtt[q].valueAsNumber //change la valeur chaine de caractère en nb
          }

          // je transmet le résultat
          let qttDisplay = document.getElementById('totalQuantity')
          qttDisplay.innerHTML = totalQtt
          console.log(totalQtt)

          // j'initialise ma variable pour le total des prix
          let totalPrice = 0

          // je boucle pour avoir le prix des articles en fonction des quantités
          for (let q = 0; q < pdtLength; q++) {
            totalPrice += itemQtt[q].valueAsNumber * price
          }

          // je transmet le résultat 
          let priceDisplay = document.getElementById('totalPrice')
          let fix = Math.round(totalPrice) //arrondi à l'entier le plus proche
          priceDisplay.innerHTML = fix

          // pour finir je set mon panier (sera surtout utile quand je delete un canapé)
          localStorage.setItem('panier', JSON.stringify(arrayItem))
        }
        updateQuantityPrice()

        // fonction pour supprimer un produit choisi
        function deleteProduct() {
          let deleteItem = document.querySelectorAll('.deleteItem')

          for (let s = 0; s < deleteItem.length; s++) {
            deleteItem[s].addEventListener('click', (event) => {
              event.preventDefault()

              let idDelete = arrayItem[s].id
              let colorDelete = arrayItem[s].color

              // méthode filter pour trouver le bon élément de la boucle
              arrayItem = arrayItem.filter(
                (el) => el.id !== idDelete || el.color !== colorDelete,
              )
              arrayItem.splice(s, 0) //modifie dans le tableau
              localStorage.setItem('panier', JSON.stringify(arrayItem))
              location.reload() //recharge la ressource depuis l'URL actuelle.
              alert ("Article supprimé du panier")

              // update des prix et quantités de façon dynamique
              updateQuantityPrice()
            })
          }
        }
        deleteProduct()

        // fonction pour que l'utilisateur puisse modifier la quantité d'un canapé
        function qttChange() {
          let itemqtt = document.querySelectorAll('.itemQuantity')

          // je boucle la longueur pour chaque quantité
          for (let k = 0; k < itemqtt.length; k++) {
            itemqtt[k].addEventListener('change', (e) => {
              e.preventDefault()
 
              //je sélectionne l'élément à modifier
              const qttSelect = arrayItem[k].quantity
              const qttValue = itemqtt[k].valueAsNumber

              // je cherche l'élement que je veux avec la méthode find
              const qttSearch = arrayItem.find(
                (el) => el.qttValue !== qttSelect,
              )

              qttSearch.quantity = qttValue
              arrayItem[k].quantity = qttSearch.quantity
             

              // je remplace le panier avec les bonnes valeurs
              updateQuantityPrice()
            })
          }
        }
        qttChange()
      })
    })
}

// partie formulaire

let form = document.querySelector('.cart__order__form')

// Ajout des Regex
let emailCheck = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
)
let nameCheck = new RegExp("^[a-zA-Zéè-]+$")
let cityCheck = new RegExp('^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$')
let addressCheck = new RegExp(
  '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+',
)

// Ecoute de la modification du nom
form.firstName.addEventListener('change', function () {
  validFirstName(this)
})

// Ecoute de la modification du prénom
form.lastName.addEventListener('change', function () {
  validLastName(this)
})

// Ecoute de la modification de l'adresse
form.address.addEventListener('change', function () {
  validAddress(this)
})

// Ecoute de la modification de la ville
form.city.addEventListener('change', function () {
  validCity(this)
})

// Ecoute de la modification du mail
form.email.addEventListener('change', function () {
  validEmail(this)
})

//validation du prénom
const validFirstName = function (inputFirstName) {
  let firstNameErrorMsg = inputFirstName.nextElementSibling //donne la balise suivante

  if (nameCheck.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = ''
    return true
  } else {
    firstNameErrorMsg.innerHTML = "Le champ n'est pas valide !"
    return false
  }
}

//validation du nom
const validLastName = function (inputLastName) {
  let lastNameErrorMsg = inputLastName.nextElementSibling

  if (nameCheck.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = ''
    return true
  } else {
    lastNameErrorMsg.innerHTML = "Le champ n'est pas valide !"
    return false
  }
}

//validation de l'adresse
const validAddress = function (inputAddress) {
  let addressErrorMsg = inputAddress.nextElementSibling

  if (addressCheck.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = ''
    return true
  } else {
    addressErrorMsg.innerHTML = "Le champ n'est pas valide !"
    return false
  }
}

//validation de la ville
const validCity = function (inputCity) {
  let cityErrorMsg = inputCity.nextElementSibling

  if (cityCheck.test(inputCity.value)) {
    cityErrorMsg.innerHTML = ''
    return true
  } else {
    cityErrorMsg.innerHTML = "Le champ n'est pas valide !"
    return false
  }
}

//validation de l'email
const validEmail = function (inputEmail) {
  let emailErrorMsg = inputEmail.nextElementSibling

  if (emailCheck.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = ''
    return true
  } else {
    emailErrorMsg.innerHTML = "Le champ n'est pas valide !"
    return false
  }
}

// bouton commander
function checkFinal() {
  const btn_commander = document.getElementById('order')

  btn_commander.addEventListener('click', (e) => {
    e.preventDefault()

    const inputName = document.getElementById('firstName')
    const inputLastName = document.getElementById('lastName')
    const inputAdress = document.getElementById('address')
    const inputCity = document.getElementById('city')
    const inputMail = document.getElementById('email')

    if (
      validLastName(inputLastName) &&
      validFirstName(inputName) &&
      validAddress(inputAdress) &&
      validCity(inputCity) &&
      validEmail(inputMail)
    ) {
      // le tableau pour les id
      let itemId = []
      for (let z = 0; z < arrayItem.length; z++) {
        itemId.push(arrayItem[z].id)
      }
      console.log(itemId)

      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAdress.value,
          city: inputCity.value,
          email: inputMail.value,
        },
        products: itemId,
      }

      //envoi les données au serveur
      const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }

      fetch('http://localhost:3000/api/products/order', options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          localStorage.clear()
          localStorage.setItem('orderId', data.orderId)

          document.location.href = `confirmation.html?orderId=${data.orderId}`
        })
    }
  })
}
checkFinal()
