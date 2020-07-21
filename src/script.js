
fetch('http://localhost:3000/api/drinks')
.then(res => res.json())
.then(drinks => drinks.forEach(addDrink))

function addDrink(drink){
    const cardContainer = document.querySelector('div#card-container')
    const card = document.createElement('div')
        card.className = 'card'
        card.dataset.id = drink.id
    const h2 = document.createElement('h2')
        h2.innerText = drink.name
    const p1 = document.createElement('p')
        p1.innerText = `Alcoholic? : ${drink.alcoholic ? 'Yes' : 'No'}`
    const p2 = document.createElement('p')
        p2.innerText = `Number of Ingredients: ${drink.ingredients.length}`
    const p3 = document.createElement('p')
        p3.innerText = `Rating : `

    card.append(h2, p1, p2, p3)
    cardContainer.append(card)

}
