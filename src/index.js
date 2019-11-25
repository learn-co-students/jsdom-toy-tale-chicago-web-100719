let addToy = false
const url = 'http://localhost:3000/toys'
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')
  
  fetchToys()

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = grabFormData()
    let newToy = postToy(formData);
    toyForm.firstElementChild.reset()
  })

  toyCollection.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.className === 'like-btn') {
      likeToy(event)
    }

  })

  function likeToy(event) {
    more = parseInt(event.target.previousSibling.innerHTML) +1
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        
        "likes":  more
      })
    }
    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, configObj)
    .then(resp => resp.json())
    .then(event.target.previousSibling.innerHTML = more)

  }


})
function fetchToys() {
  fetch(url)
  .then(resp => resp.json())
  .then(function(toys){
    for(const toy of toys){
      createCard(toy)
    }
  })

}
function createCard(toy){
card = document.createElement('div')
card.className = 'card'
card.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes}</p><button data-id=${toy.id} class="like-btn">Like <3</button>`
toyContainer = document.getElementById('toy-collection')
toyContainer.appendChild(card)
}
function postToy(formData) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(toypost => createCard(toypost))
  }
  function grabFormData(){
  const name = document.querySelector('#name').value
  const image = document.querySelector('#image').value  
  return {name, image, "likes": 0}

}
