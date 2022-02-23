let arrayItem = JSON.parse(localStorage.getItem('panier'))
console.table(arrayItem)

const cartContainer = document.querySelector('#cart__items')

const recuperationCanapesAPI = async function () {
  const canapesLocalStorage = JSON.parse(localStorage.getItem('panier'))

  let informationsCanapesUtilisateur = []

  return fetch('http://localhost:3000/api/products/')
    .then((response) => response.json())
    .then((response) => {
      canapesLocalStorage.forEach((canape, index) => {
        // On créé une variable => canapeDansAPI
        // cette variable nous permet de récupérer les informations d'un canapé dans l'API
        // dont l'id correspond à l'id d'un canapé présent dans le localStorage
        const infoFromLocalStorage = {}
        infoFromLocalStorage.color = canape.color
        infoFromLocalStorage.quantity = canape.quantity

        informationsCanapesUtilisateur[index] = Object.assign(
          infoFromLocalStorage,
          response.find((el) => el._id === canape.id),
        )
      })

      console.log(informationsCanapesUtilisateur) // Une fois que la boucle est terminée on renvoie le tableau "informationsCanapesUtilisateur" // et cela afin de pouvoir faire s'en servir pour faire des traitements dessus dans le reste de notre script

      return informationsCanapesUtilisateur
    })
    .catch(function () {
      cartContainer.innerHTML = `<p>Une erreur est survenue. Merci de contacter le support client.</p>`
    })
}

const affichageDesCanapes = async function () {
  const canapesUtilisateur = await recuperationCanapesAPI()

  let affichage = ''

  canapesUtilisateur.forEach((canape) => {
    affichage += `
      <article class="cart__item" data-id="${canape._id}" data-color="${canape.color}">
        <div class="cart__item__img">
          <img src="${canape.imageUrl}" alt="${canape.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${canape.name}</h2>
            <p>${canape.color}</p>
            <p>${canape.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    `
  })

  cartContainer.innerHTML = affichage // On fait appel aux autres fonctions

  miseAJourPrix(canapesUtilisateur)
  miseAJourQuantite(canapesUtilisateur)
  suppressionCanape()
}

const miseAJourPrix = function (canapesUtilisateur) {
  let sommeDesQuantites = 0
  let sommeDesPrix = 0

  canapesUtilisateur.forEach((canape) => {
    sommeDesQuantites += canape.quantity
    sommeDesPrix += canape.quantity * canape.price
  })

  let totalQuantity = document.querySelector('#totalQuantity')
  totalQuantity.innerHTML = sommeDesQuantites

  let priceDisplay = document.querySelector('#totalPrice')
  priceDisplay.innerHTML = Math.round(sommeDesPrix)
}

const miseAJourQuantite = function (canapesUtilisateur) {
  const inputQuantite = document.querySelectorAll('.itemQuantity')
  inputQuantite.forEach((input) => {
    input.addEventListener('change', (event) => {
      event.preventDefault()

      const canapesLocalStorage = JSON.parse(localStorage.getItem('panier'))

      const parent = input.closest('article')
      const canapeId = parent.getAttribute('data-id')
      const canapeColor = parent.getAttribute('data-color')
      const quantite = input.valueAsNumber // On va mettre à jour la quantité dans le tableau du localStorage

      const indexTableauLS = canapesLocalStorage.findIndex(
        (el) => el.id === canapeId && el.color === canapeColor,
      )
      canapesLocalStorage[indexTableauLS].quantity = quantite
      localStorage.setItem('panier', JSON.stringify(canapesLocalStorage)) // On va mettre à jour la quantité dans l'objet canapesUtilisateur

      const indexTableauCanapes = canapesUtilisateur.findIndex(
        (el) => el._id === canapeId && el.color === canapeColor,
      )
      canapesUtilisateur[indexTableauCanapes].quantity = quantite

      miseAJourPrix(canapesUtilisateur)
    })
  })
}

const suppressionCanape = function () {
  const boutonsDeSuppression = document.querySelectorAll('.deleteItem')
  boutonsDeSuppression.forEach((bouton) => {
    bouton.addEventListener('click', (event) => {
      event.preventDefault()

      const parent = bouton.closest('article')
      const canapeId = parent.getAttribute('data-id')
      const canapeCouleur = parent.getAttribute('data-color')

      const nouvelleValeurLocalStorage = arrayItem.filter(
        (el) => el.id !== canapeId || el.color !== canapeCouleur,
      )

      localStorage.setItem('panier', JSON.stringify(nouvelleValeurLocalStorage))

      location.reload()
    })
  })
}

if (arrayItem === null || arrayItem.length === 0) {
  const empty = `<p>Votre panier est vide</p>`
  cartContainer.innerHTML = empty
} else {
  affichageDesCanapes()
}
