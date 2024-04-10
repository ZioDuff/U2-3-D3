//andiamo a creare una nuova funzione che ci serivra per richiamare il nostro http
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
      //ciclaiamo l'intero array e andiamo a creare ogni singolo elemento della nostra card
      bookData.forEach((books) => {
        const col = document.createElement("col")
        col.classList.add("col")
        const card = document.createElement("div")
        card.classList.add("card")
        const cardImage = document.createElement("img")
        cardImage.classList.add("card-img-top")
        cardImage.style = "aspect-ratio: 9/16;object-fit: cover"
        cardImage.src = books.img
        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        const h5 = document.createElement("h5")
        h5.classList.add("card-title")
        h5.innerHTML = books.title
        const p = document.createElement("p")
        p.classList.add("card-text")
        p.innerHTML = books.price + "$"
        const DeleteBtn = document.createElement("button")
        DeleteBtn.type = "button"
        DeleteBtn.classList.add("btn", "btn-primary", "button-delete")
        DeleteBtn.innerText = "cancella"
        const addBtn = document.createElement("button")
        addBtn.classList.add("btn", "btn-success", "ms-2")
        addBtn.innerText = "salva"
        //
        cardBody.append(h5, p, DeleteBtn, addBtn)
        card.append(cardImage, cardBody)
        col.appendChild(card)
        row.appendChild(col)
      })

      const buttons = document.querySelectorAll(".button-delete")
      buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          button.closest(".col").remove()
        })
      })
    })
    .catch((error) => console.log(error))
}
window.onload = () => {
  tryToFetch()
}
