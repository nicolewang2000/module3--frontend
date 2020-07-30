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

        function newCreateForm(){
          const br1 = document.createElement("br")
          const br2 = document.createElement("br")
          const br3 = document.createElement("br")
          const br4 = document.createElement("br")
      
          const name= document.createElement("input")
             name.className = "full"
             name.placeholder = "Name"
      
          const direction= document.createElement("input")
             direction.className = "full"
             direction.placeholder = "Direction"
      
          const glass= document.createElement("input")
             glass.className = "full"
             glass.placeholder = "Glass"
      
          const imgUrl= document.createElement("input")
             imgUrl.className = "full"
             imgUrl.placeholder = "Image Url"
      
          const switchField = document.createElement("div")
            switchField.className = "switch-field"
            switchField.innerHTML = "<label> Have Alcohol? </label> <input type='radio' id='radio-one' name='switch-one' class= 'radio' value='true' checked/> <label for='radio-one'>Yes</label><input type='radio' id='radio-two' name='switch-one' class= 'radio' value='false' /> <label for='radio-two'>No</label>"
      
          const imContainer = document.createElement("div")
          const imField = document.createElement("div")
      
          const ingredient = document.createElement("input")
             ingredient.placeholder = "Ingredient"
          const measurement = document.createElement("input")
             measurement.placeholder = "Measurement"
          const addBtn= document.createElement('button')
               addBtn.innerHTML = "<button class='circle-btn' type='submit' onclick='addIngredientField(); return false;'><i class='fa fa-plus'></i></button>"
      
          const backBtn = document.createElement("button")
              backBtn.className = "half-btn"
              backBtn.value = "<i class='fa fa-hand-o-left'></i> Back"
              backBtn.addEventListener(()=> {
                  event.preventDefault()
                  clearForms('create-form')
              })
          const createBtn = document.createElement("button")
              createBtn.className = "half-btn"
              createBtn.value = "Create"
      
         
         imContainer.append(imField)
         createForm.prepend(name, br1, switchField, imContainer, direction, br2, glass, br3, imgUrl, br4)
      
      }

      ingredient.addEventListener('input', () => {
        const options = document.querySelectorAll("option")
        for (let i = 0; i < options.length - 1; i++){
            if (event.target.value == options[i].value){
                event.target.dataset.id = options[i].dataset.id
            }
            else {
                event.target.dataset.id = ""
            }
        }
        console.log(event.target.dataset.id)

})

function addDrinkIngredients(drink){
  const ingredients = document.querySelectorAll('input.ingredient')
  for (let i = 0; i < ingredients.length; i++){
      fetch('http://localhost:3000/api/drink_ingredients', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              ingredient: `${
                  fetch('http://localhost:3000/api/ingredients', {
                      method: "POST",
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          name: ingredients[i].value,
                      })
                  })
                  .then(res=> res.json())
              }`,
              drink_id: drink.id,
              measurement: `${document.querySelectorAll('input.measurement')[i].value}`
          })
      })
      .then(res => res.json())
      .then(drink => {
          addDrink(drink)
          clearInputs('createForm')
      })
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
        addDrink(drink)
        clearForms('create-form')
    })

    // const backBtn = document.createElement("button")
    //     backBtn.innerHTML = "<i class='fa fa-hand-o-left'></i> Back"
    //     backBtn.className = "half-btn"
    //     backBtn.style.display = "block"
    //     cardContainer.append(backBtn)

    //     backBtn.addEventListener('click', () => {
    //     event.preventDefault()
    //     getBtnOptions()
    //     unhideCards()
    // })

    // hideCardsExcept(drink)
    // buttonContainer.style.display = "none"

// const starDiv = document.querySelector(`div.rating[data-id='${drink.id}']`)
    // const inner = starDiv.querySelector('div.stars-inner')
    // const p = starDiv.querySelector('p')
    
    // const avgRating= `${drink.ratings.length ? drink.ratings.reduce((sum,element) => (sum + element.score), 0)/drink.ratings.length : 0}`
    // inner.style.width = avgRating*100/5 + "%"
    // p.innerText = `${Math.round(avgRating*100)/100}/5 stars based on ${drink.ratings.length} review(s)`
