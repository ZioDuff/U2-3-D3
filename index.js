//andiamo a creare una nuova funzione che ci serivra per richiamare il nostro http
let bookArray = []
const tryToFetch = () => {
  //
  //
  //
  //tramite il fetch andiamo a fare una richiesta http di tippo get
  //il fetch essendo una promise, dobbiamo aspettare che si risolva, in modo  positivo o negativo
  fetch("https://striveschool-api.herokuapp.com/books")
    //then sara il valore positivo ed ritorna sempre un valaore response
    .then((response) => {
      console.log(response)

      //questa fase è univoca , controlliamo se la risposta sia positiva tramite la lettura della proprieta .ok
      //se va a buon fine gli restiuiamo una nnuva promise con l'operazione svolta dal .json()
      if (response.ok) {
        return response.json()
      } else {
        // qui facciamo in modo che s enon si passa il primo passaggio del then si viene direttamente "lanciati" nel cathc() quindi nell'errore
        throw new Error("generic error")
      }
    })
    //qui ci sincronizziamo con l'arrivo dei dati perche questo then() scattera solamente dopo il json()
    .then((bookData) => {
      console.log(bookData)
      //una volta ricevuto questo dato possiamo eseguire la dom manipulation

      // proviamo a creare una libreria responsive tramite l'uso sia di bootstrap e della nostra chhiamata http

      const row = document.getElementById("row-container")
      //ciclaiamo l'intero array e andiamo a creare un template per le card
      bookData.forEach((books) => {
        //come prima cosa creiamo le colenne dove e il contenitore card
        const col = document.createElement("col")
        col.classList.add("col")
        const card = document.createElement("div")
        card.classList.add("card")
        // inseriamo le immagini conn i vari stili dentro le nostre card
        const cardImage = document.createElement("img")
        cardImage.classList.add("card-img-top")
        cardImage.style = "aspect-ratio: 9/16;object-fit: cover"
        cardImage.src = books.img
        // andiamo poi a creare il nostro card-body contenente il titolo e il prezzo del nostro libro
        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        const h5 = document.createElement("h5")
        h5.classList.add("card-title")
        h5.innerHTML = books.title
        const p = document.createElement("p")
        p.classList.add("card-text")
        p.innerHTML = books.price + "$"
        // e infini creiamo i due bottoni di eliminazione e di salvataggio
        const DeleteBtn = document.createElement("button")
        DeleteBtn.type = "button"
        DeleteBtn.classList.add("btn", "btn-primary", "button-delete")
        DeleteBtn.innerText = "cancella"
        const addBtn = document.createElement("button")
        addBtn.classList.add("btn", "btn-success", "ms-2", "saved-button")
        addBtn.innerText = "salva"
        // qui inseriemo tutti gli oggetti appena creati nell'html
        cardBody.append(h5, p, DeleteBtn, addBtn)
        card.append(cardImage, cardBody)
        col.appendChild(card)
        row.appendChild(col)
      })
      //qui cerchiamo di far funzionare il button di eliminazione
      // selezionando i button con una nodeList e poi ciclano l'array ritornato
      //associando poi un evento al click che andra ad eliminare l'intera colonna dove è presente la card
      const buttons = document.querySelectorAll(".button-delete")
      buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          button.closest(".col").remove()
        })
      })
      //una volta completato il primo esercizio di eliminazione passiamo al secondo esercizio
      //il secondo esercizio consiste nel creare una sezione "carrello" dove al click di un altro buttone andiamo a salvare il titolo della nostra card
      const saveCardContent = () => {
        const savedButtons = document.querySelectorAll(".saved-button")
        savedButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const cardBody = button.closest(".card").querySelector(".card-body")
            const cardTitle = cardBody.querySelector(".card-title").textContent
            const cardPrice = cardBody.querySelector(".card-text").textContent
            const contentCard = cardTitle + " " + cardPrice
            bookArray.push(contentCard)
            console.log(bookArray)
            addToShop(contentCard, bookArray)
            localStorage.setItem("list-shop", JSON.stringify(bookArray))
          })
        })
      }
      saveCardContent()
      const ul = document.querySelector("ul")

      const addToShop = (title, list) => {
        const li = document.createElement("li")
        const btnToRemoveCart = document.createElement("button")
        li.innerText = title
        btnToRemoveCart.innerText = "rimuovi"
        li.appendChild(btnToRemoveCart)
        ul.appendChild(li)

        btnToRemoveCart.addEventListener("click", (event) => {
          const index = list.indexOf(title)
          list.splice(index, 1)
          btnToRemoveCart.closest("li").remove()
        })
      }
    })
    .catch((error) => console.log(error))
}
window.onload = () => {
  tryToFetch()
  const savedCart = JSON.parse(localStorage.getItem("list-shop", bookArray))
  console.log(savedCart)
  if (savedCart.length > 0) {
    savedCart.forEach((element) => {
      savedCart.push(element)
      addToShop(element, bookArray)
    })
  } else {
    bookArray = []
  }
}
