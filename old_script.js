starContainer.innerHTML = "<span class='fa fa-star checked' id='star1'></span> <span class='fa fa-star unchecked'  id='star2'></span> <span class='fa fa-star unchecked'  id='star3'></span> <span class='fa fa-star unchecked'  id='star4'></span> <span class='fa fa-star unchecked' id='star5'></span>"

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

cardContainer.innerHTML = ""
fetch('http://localhost:3000/api/drinks')
    .then(res => res.json())
    .then(drinks => {addDrink(randomElement(drinks))})

    const listDiv = document.createElement('div')
    const ingredientH = document.createElement('h3')
        ingredientH.innerText = "Ingredients"
    listDiv.append(ingredientH)
        drink.ingredients.forEach(i => {
            const pList = document.createElement('li')
            pList.innerText = i.name
            listDiv.append(pList)
        })