const nav = document.querySelector('ul.nav')
const cardContainer = document.querySelector('div#card-container')
const scenes = cardContainer.children
const buttonContainer = document.querySelector('div#button-options')
const createBtn= document.querySelector('button#create-btn')
const createForm= document.querySelector('form#create-form')
const findBtn= document.querySelector('button#find-btn')
const findForm= document.querySelector('form#find-form')
const findInput = document.getElementById('find-input')
const randomBtn= document.querySelector('button#random-btn')
const randomForm= document.querySelector('form#random-form')


getAllDrinks()

function getAllDrinks(){
    fetch('http://localhost:3000/api/drinks')
    .then(res => res.json())
    .then(drinks => drinks.forEach(addDrink))
}

function getDrink(id){
    fetch('http://localhost:3000/api/drinks/' + id)
    .then(res => res.json())
    .then(console.log)
}

function addDrink(drink){
   
    const scene = document.createElement('div')
        scene.className = 'scene'
        scene.dataset.id = drink.id
        scene.dataset.name = drink.name

    const card = document.createElement('div')
        card.className = 'card'
        card.dataset.id = drink.id
    
    const front = document.createElement('div')
        front.classList = "card__face card__face--front"
    const fName = document.createElement('h2')
        fName.innerText = drink.name
    const img = document.createElement('img')
        img.className = "card-image"
        img.src = drink.image
    const p1 = document.createElement('p')
        p1.innerText = `${drink.alcoholic ? 'Contains Alcohol' : 'Non-Alcoholic'}`
    const p2 = document.createElement('p')
        p2.innerText = `Number of Ingredients: ${drink.ingredients.length}`
    const starsContainer = document.createElement('div')
    starsContainer.dataset.id = drink.id
    starsContainer.className = "rating"
        const starsOuter = document.createElement('div')
        starsOuter.className = "stars-outer"
        const starsInner= document.createElement('div')
        starsInner.className = "stars-inner"
        starsOuter.append(starsInner)
        const avgRating= `${drink.ratings.length ? drink.ratings.reduce((sum,element) => (sum + element.score), 0)/drink.ratings.length : 0}`
        starsInner.style.width = avgRating*100/5 + "%"
    const totalRatings = document.createElement('p')
    totalRatings.innerText = `${Math.round(avgRating*100)/100}/5 stars based on ${drink.ratings.length} review(s)`
        
    starsContainer.append(starsOuter, totalRatings)
    front.append(fName, starsContainer, img, p1, p2)

    const back = document.createElement('div')
        back.classList = "card__face card__face--back"
    const bName = document.createElement('h2')
        bName.innerText = drink.name
    

    const table = document.createElement('table')
    const tableHead= document.createElement('tr')
    tableHead.innerHTML = "<th><h3>Ingredient</h3></th><th><h3>Amount</h3></th>"

    for (let i = 0; i < drink.ingredients.length; i++){
        const tr= document.createElement('tr')
        const tdIngre =  document.createElement('td')
            tdIngre.innerText = drink.ingredients[i].name
        const tdMeasurement =  document.createElement('td')
            tdMeasurement.innerText = drink.drink_ingredients[i].measurement ? drink.drink_ingredients[i].measurement : "N/A"
        tr.append(tdIngre, tdMeasurement)
        table.append(tr)
    }
    table.prepend(tableHead)

    const directionH = document.createElement('h3')
        directionH.innerText = 'Direction:'
    const directionD = document.createElement('p')   
        directionD.innerText = drink.direction
    const glassH = document.createElement('h3')
        glassH.innerText = 'Glass:'
    const glassD = document.createElement('p')
        glassD.innerText = drink.glass
    const btn = document.createElement('button')
        btn.innerText = "click"
        btn.className = 'save'
    back.append(bName, table, directionH, directionD, glassH, glassD, btn)

    card.append(front, back)
    scene.append(card)
    cardContainer.append(scene)

    card.addEventListener('click', function() {
        if (event.target.className !== 'save'){
            card.classList.toggle('is-flipped')
        }
    })

    btn.addEventListener('click', () => {
        event.preventDefault()
        console.log('click')
    })
}

nav.addEventListener('click', ()=> {
    let directoryPage = document.querySelector('div#directory')
    let homePage = document.querySelector('div#home')
    let loginPage = document.querySelector('div#login')
    if (event.target.innerText == "DIRECTORY"){
        homePage.style.display = "none"
        loginPage.style.display = "none"
        directoryPage.style.display = "block" 
        clearInputs("find-form")  
        clearInputs("create-form")
        getBtnOptions()
        unhideCards()
    }
    else if (event.target.innerText == "HOME"){
        loginPage.style.display = "none"
        directoryPage.style.display = "none"
        homePage.style.display = "block"
    }
    else if (event.target.innerText == "LOGIN"){
        directoryPage.style.display = "none"
        homePage.style.display = "none"
        loginPage.style.display = "block"
    }
})

buttonContainer.addEventListener('click', ()=> {
    if (event.target.id == "find-btn"){
        buttonContainer.style.display = "none"
        findForm.style.display = "block"
    }
    else if (event.target.id == "create-btn"){
        buttonContainer.style.display = "none"
        createForm.style.display = "block"
    }
    else if (event.target.id == "random-btn"){
        changeIcon()
        getRandomDrink()
        // buttonContainer.style.display = "none"
        // randomForm.style.display = "block" 
    }
})

function getBtnOptions(){
    findForm.style.display = "none"
    createForm.style.display = "none"
    randomForm.style.display = "none"
    buttonContainer.style.display = "flex"
    randomBtn.querySelector("i").className = "fa fa-paper-plane"

}

function clearInputs(formId){
    let x = document.getElementById(formId)
    let inputs = x.querySelectorAll("input")
    inputs.forEach(i => {i.value = ""})
}

function searchFor() {
    let filter = findInput.value.toUpperCase();
    let scene = cardContainer.getElementsByClassName("scene")
    for (let i = 0; i < scene.length; i++) {
        let name = scene[i].dataset.name;
        if (name.toUpperCase().indexOf(filter) > -1) {
            scene[i].style.display = "";
        } else {
            scene[i].style.display = "none";
        }
    }
}

function clearForms(formId){
    getBtnOptions() 
    clearInputs(formId)
    searchFor()
}

function getRandomDrink(){
    fetch('http://localhost:3000/api/drinks')
        .then(res=> res.json())
        .then(drinks => hideCardsExcept(randomElement(drinks)))
        .then(() => {
            buttonContainer.style.display = "none"
            randomForm.style.display = "block"
        })
}

function randomElement(arr){
    return arr[Math.floor(Math.random() * arr.length)]
} 

function hideCardsExcept(card){
    for (let i = 0; i < scenes.length ; i++){
        if (card.id != scenes[i].dataset.id){
            scenes[i].style.display = "none"
        }
        else if (card.id == scenes[i].dataset.id){
            scenes[i].style.display = ""
        }
    }
}

function unhideCards(){
    for (let i = 0; i < scenes.length ; i++){
        scenes[i].style.display = ""
    }
}

function changeIcon(){
    if (randomBtn.querySelector("i").className == "fas fa-spinner fa-pulse"){
        randomBtn.querySelector("i").className = "fa fa-paper-plane"
    }
    else if (randomBtn.querySelector("i").className == "fa fa-paper-plane"){
        randomBtn.querySelector("i").className = "fas fa-spinner fa-pulse"
    }
    // else if (randomBtn.querySelector("i").className == "fa fa-refresh"){
    //     randomBtn.querySelector("i").className = "fas fa-sync fa-spin"
    // }
    // else if (randomBtn.querySelector("i").className == "fas fa-sync fa-spin"){
    //     randomBtn.querySelector("i").className = "fa fa-refresh"
    // }
}

createForm.addEventListener('submit', () => {
    event.preventDefault()
    console.log('hi')
    debugger
    
    const radioBtns = document.querySelectorAll('input.radio')
    function containsAlcohol(){
        if (radioBtns[0].checked === true){
            return true
        }
        else {
            return false
        }
    }
    
    const configObj= {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            name: event.target.querySelectorAll('input')[0].value,
            ingredients: event.target.querySelectorAll('input')[1].value,
            // direction: event.target.querySelectorAll('input')[2].value,
            glass: event.target.querySelectorAll('input')[3].value,
            image: event.target.querySelectorAll('input')[4].value,
            alcoholic: containsAlcohol()
        })
    }
    fetch('http://localhost:3000/api/drinks', configObj)
    .then(res => res.json())
    .then(drinks => drinks.forEach(addDrink))
})