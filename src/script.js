const cardContainer = document.querySelector('div#card-container')
const createBtn= document.querySelector('button#create-btn')
const createForm= document.querySelector('form#create-form')
const findBtn= document.querySelector('button#find-btn')
const findForm= document.querySelector('form#find-form')
const findInput = document.getElementById('find-input')

const randomBtn= document.querySelector('button#random-btn')

getAllDrinks()
    //     starContainer.innerHTML = "<span class='fa fa-star checked' id='star1'></span> <span class='fa fa-star unchecked'  id='star2'></span> <span class='fa fa-star unchecked'  id='star3'></span> <span class='fa fa-star unchecked'  id='star4'></span> <span class='fa fa-star unchecked' id='star5'></span>"

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
    // const listDiv = document.createElement('div')
    // const ingredientH = document.createElement('h3')
    //     ingredientH.innerText = "Ingredients"
    // listDiv.append(ingredientH)
    //     drink.ingredients.forEach(i => {
    //         const pList = document.createElement('li')
    //         pList.innerText = i.name
    //         listDiv.append(pList)
    //     })

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

findBtn.addEventListener('click', () => {
    createForm.reset()
    document.getElementById("create-form").style.display = "none"
    let x = document.getElementById("find-form")
    x.querySelector('input').value = ""
    searchFor()
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
})

createBtn.addEventListener('click', () => {
    findInput.value = ""
    document.getElementById("find-form").style.display = "none"
    let x = document.getElementById("create-form")
    let inputs = x.querySelectorAll("input")
    inputs.forEach(i => {i.value = ""})
    // for (let i = 0; i < inputs.length - 1; i++){
    //     inputs[i].value = ""
    //   }
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
})

createForm.addEventListener('submit', ()=> {
    event.preventDefault()
    console.log('hi')
    debugger
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
            image: event.target.querySelectorAll('input')[4].value
        })
    }
    fetch('http://localhost:3000/api/drinks', configObj)
    .then(res => res.json())
    .then(drinks => drinks.forEach(addDrink))
})

function clearInput(){
    let x = document.getElementById("find-form")
    x.querySelector('input').value = ""
    searchFor()
}