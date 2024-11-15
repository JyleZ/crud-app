const formular = document.querySelector("form")
const input = document.querySelector("#listInput")
const monsterUl = document.querySelector("#monsterLista")

// Skapar en array som ska spara alla mösnster att sticka
let allaMonster = []

hamtaMonster()
uppdateraLista()

// Lyssnar efter antingen ett klick på knappen eller enter från tangetbordet
formular.addEventListener("submit", laggTill)
//Hanterar klick för Edit och Delete
monsterUl.addEventListener("click", hanteraKlick)

/**
 * Hanterar inmatning, tar in data från inmatningformuläret
 * @param {*} e
 */
function laggTill(e) {
  // Hindrar inputfältet att ladda om ifall något blir fel
  e.preventDefault()
  // Trimmar tomma utrymmen i strängen
  const inputText = input.value.trim()
  // Om inmatningen innehåller något (Felhantering) körs kodblocket
  if (inputText.length > 0) {
    allaMonster.push(inputText)
    uppdateraLista()
    sparaMonster()
    input.value = ""
  }
}

/**
 * Skapar ett li-element av värdena i arrayen, lägger in det i Ul-listan
 */
function uppdateraLista() {
  monsterUl.innerHTML = ""
  allaMonster.forEach((monster, monsterIndex) => {
    const monsterItem = skapaLiElement(monster, monsterIndex)
    monsterUl.append(monsterItem)
  })
}

/**
 * Skapar li-element av alla värden i arrayen
 * @param {string} monster
 * @param {int} monsterIndex
 * @returns
 */
function skapaLiElement(monster, monsterIndex) {
  const id = monsterIndex
  const monsterLi = document.createElement("li")
  monsterLi.className = "list-group-item d-flex"
  monsterLi.id = id
  monsterLi.innerHTML = `
          ${monster}
          <span class="ms-auto"
            ><button
              class="btn btn-link text-primary me-2 p-0"
              aria-label="Edit"
            >
              <i class="bi bi-pencil edit"></i>
            </button>
            <button class="btn btn-link text-danger p-0" aria-label="Delete">
              <i class="bi bi-x-square delete"></i></button
          ></span>
        `
  return monsterLi
}

/**
 * Hanterar klick från li-elementen
 * @param {*} e
 * @returns
 */
function hanteraKlick(e) {
  const knapp = e.target.closest("i")
  if (!knapp) return

  const index = knapp.closest("li").id

  if (knapp.classList.contains("delete")) {
    taBort(index)
  } else if (knapp.classList.contains("edit")) {
    redigera(index)
  }
}

/**
 * Skicka med vilket index li-element har som man har tryckt på.
 *
 * @param {*} index
 */
function taBort(index) {
  allaMonster.splice(index, 1)
  uppdateraLista()
  sparaMonster()
}

/**
 * Skicka med vilket index li-element har som man har tryckt på.
 *
 * @param {*} index
 */
function redigera(index) {
  const nyttNamn = prompt("Redigera namnet på mönstret:", allaMonster[index])
  if (nyttNamn.length > 0) {
    allaMonster[index] = nyttNamn.trim()
    uppdateraLista()
    sparaMonster()
  }
}

/**
 * Sparar till localstorage
 */
function sparaMonster() {
  localStorage.setItem("allaMonster", JSON.stringify(allaMonster))
}

/**
 * Hämtar värdena i localstorage
 */
function hamtaMonster() {
  const sparadeMonster = localStorage.getItem("allaMonster")

  if (sparaMonster) {
    // Gör om det så det passar en array
    allaMonster = JSON.parse(sparadeMonster)
  }
}
