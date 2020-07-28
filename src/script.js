const nav = document.querySelector('ul.nav')
const cardContainer = document.querySelector('div#card-container')
const formContainer = document.querySelector('div#form-container')
const scenes = cardContainer.children
const buttonContainer = document.querySelector('div#button-options')
const createBtn= document.querySelector('button#create-btn')
const createForm= document.querySelector('form#create-form')
const findBtn= document.querySelector('button#find-btn')
const findForm= document.querySelector('form#find-form')
const findInput = document.getElementById('find-input')
const randomBtn= document.querySelector('button#random-btn')
const randomForm= document.querySelector('form#random-form')
const signupBtn = document.querySelector('button#signup')
const signupBackBtn = document.querySelector('button#su-back')


getAllDrinks()

signupBtn.addEventListener('click', () => {
    document.querySelector('div.intro-container').style.display ='none'
    document.querySelector('div.signup').style.display ='block'
})

signupBackBtn.addEventListener('click', () => {
    document.querySelector('div.intro-container').style.display ='block'
    document.querySelector('div.signup').style.display ='none'
    clearForms('signup-form')
})


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
        table.dataset.id = drink.id
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
    cardContainer.prepend(scene)

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
        document.querySelector('div.intro-container').style.display ='block'
        document.querySelector('div.signup').style.display ='none'
        clearForms('signup-form')
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
        newImField()
        createForm.style.display = "block"
    }
    else if (event.target.id == "random-btn"){
        changeIcon()
        getRandomDrink() 
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
}

function createDatalist(){
    const datalist = document.createElement("datalist")
    datalist.id = "ingredientList" 
    fetch('http://localhost:3000/api/ingredients')
    .then(res => res.json())
    .then(ingredients => ingredients.forEach(ingredient => {
        const option = document.createElement('option')
        option.value = ingredient.name
        option.dataset.id = ingredient.id
        datalist.append(option)
    }))
    return datalist
}

 function newImField(){
    createDatalist()
    document.querySelector('div.im-container').innerHTML = ""
    const br1 = document.createElement("br")
    const br2 = document.createElement("br")
    const div = document.createElement('div')
        div.className = "im-field"
    const ingredient = document.createElement("input")
        ingredient.placeholder = "Ingredient"
        ingredient.className = "ingredient"
        ingredient.type = 'text'
        ingredient.setAttribute('list', createDatalist().id)
        ingredient.append(createDatalist())
        ingredient.dataset.id = ""
        ingredient.addEventListener('change', () => {
            ingredient.dataset.id = ""
            const options = document.querySelectorAll('option')
            for (let i = 0; i < options.length; i++){
                if (options[i].value == ingredient.value){
                    ingredient.dataset.id = options[i].dataset.id
                }
            }
        })
    const measurement = document.createElement("input")
        measurement.placeholder = "Measurement"
        measurement.className = "measurement"
    const btn = document.createElement('button')
    btn.className = 'circle-btn'
    btn.innerHTML = "<i class='fa fa-plus'></i>"
    btn.addEventListener("click", () => {
        event.preventDefault()
        addIngredientField()
    })
    div.append(ingredient, br1, measurement, br2, btn,)
    document.querySelector('div.im-container').append(div)
}

 function addIngredientField(){
    createDatalist()
    const imContainer = document.querySelector("div.im-container")
    const div = document.createElement("div")
        div.className = "im-field"
    const ingredient = document.createElement("input")
        ingredient.placeholder = "Ingredient"
        ingredient.className = "ingredient"
        ingredient.type = 'text'
        ingredient.setAttribute('list', createDatalist().id)
        ingredient.append(createDatalist())
        ingredient.dataset.id = ""
        ingredient.addEventListener('change', () => {
            ingredient.dataset.id = ""
            const options = document.querySelectorAll('option')
            for (let i = 0; i < options.length; i++){
                if (options[i].value == ingredient.value){
                    ingredient.dataset.id = options[i].dataset.id
                }
            }
        })
    const measurement = document.createElement("input")
        measurement.placeholder = "Measurement"
        measurement.className = "measurement"
    const trashBtn= document.createElement("button")
        trashBtn.className = "circle-btn"
        trashBtn.innerHTML = "<i class='fa fa-trash'>"
    trashBtn.addEventListener('click', ()=> {
        event.preventDefault()
        imContainer.removeChild(event.currentTarget.parentElement)
    })

    div.append(ingredient, measurement, trashBtn)
    imContainer.append(div)
}
 
createForm.addEventListener('submit', () => {
    event.preventDefault()
    const ingredients = document.querySelectorAll('input.ingredient')
    const measurement = document.querySelectorAll('input.measurement') 
    
    function containsAlcohol(){
        const radioBtns = document.querySelectorAll('input.radio')
        if (radioBtns[0].checked === true){
            return true
        }
        else {
            return false
        }
    }
    
    fetch('http://localhost:3000/api/drinks', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: event.target.querySelector('input#ci-name').value,
            direction: event.target.querySelector('input#ci-direction').value,
            image: event.target.querySelector('input#ci-image').value,
            glass: event.target.querySelector('input#ci-glass').value,
            alcoholic: containsAlcohol()
        })
     })
    .then(res => res.json())
    .then(drink => {
        findOrAddIngre(drink)
        addDrink(drink)  
        clearForms(createForm)
    })

    function findOrAddIngre(drink){
        for (let i = 0; i < ingredients.length; i++){
            if(ingredients[i].dataset.id == ""){
                createI(ingredients[i].value, measurement[i].value, drink)
            }
            else {
                fetch('http://localhost:3000/api/ingredients/' + ingredients[i].dataset.id)
                .then(res => res.json())
                .then(ingredient => createDI(ingredient, measurement[i].value, drink))
            }
        }
    }

    function createI(ingredientName, measurement, drink){
        fetch('http://localhost:3000/api/ingredients', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: ingredientName
            })
         })
         .then(res => res.json())
         .then(ingre => createDI(ingre, measurement, drink))
    }

    function createDI(ingredient, measurement, drink){
        fetch('http://localhost:3000/api/drink_ingredients', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                drink_id: drink.id,
                measurement: measurement,
                ingredient_id: ingredient.id
            })
         })
         .then(res => res.json())
         .then(di => {
             let foundDrink = document.querySelector(`table[data-id='${drink.id}']`)
             const tr = document.createElement('tr')
             const item = document.createElement('td')
                item.innerText = ingredient.name
             const amount = document.createElement('td')
                amount.innerText = measurement
            tr.append(item, amount)
            foundDrink.append(tr)

         })
    }
    
})
