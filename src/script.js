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

function addDrink(drink){
    const cardContainer = document.querySelector('div#card-container')
   
    const scene = document.createElement('div')
        scene.className = 'scene'
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
    const listDiv = document.createElement('div')
    const ingredientH = document.createElement('h3')
        ingredientH.innerText = "Ingredients"
    listDiv.append(ingredientH)
        drink.ingredients.forEach(i => {
            const pList = document.createElement('li')
            pList.innerText = i.name
            listDiv.append(pList)
        })
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
    back.append(bName, listDiv, directionH, directionD, glassH, glassD, btn)

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

function getBtnOption()