const url = 'http://localhost:3000/toys'
let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollect = document.getElementById('toy-collection')

//main
document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch(url)
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => createCard(toy)))

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = grabFormData()
    createToy(formData)
    toyForm.reset
  })

  toyCollect.addEventListener('click', (event) => {
    if (event.target.className === 'like-btn') {
      addLike(event)
    }
  })

})

//fetching toys function
function createCard(toy) {
  toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `<h2>${toy.name}</h2>
                      <img src=${toy.image} class='toy-avatar'/>
                      <p>${toy.likes} Likes</p>
                      <button id=${toy.id} class='like-btn'>Like <3</button>`
  toyCollect.appendChild(toyCard)
}

//adding toys functions
function createToy(formData) {
  const reqObj = { 
    method: "POST",
    headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json" 
              },
    body: JSON.stringify(formData)
  }

  fetch(url, reqObj)
  .then(resp => resp.json())
  .then(toy => createCard(toy))
  }

  function grabFormData() {
    const name = document.getElementsByName('name')[0].value
    const image = document.getElementsByName('image')[0].value
    return {name, image, "likes": 0}
  }

  //liking toys functions
  function addLike(event) {
    newNum = parseInt(event.target.parentElement.children[2].innerText.split(' ')[0]) + 1
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify({"likes": newNum})
    }

    fetch(`${url}/${event.target.id}`, reqObj)
      .then(resp => resp.json())
      .then(toy => updateLikes(toy))
  }

  function updateLikes(toy) {
    let likeBtn = document.getElementById(`${toy.id}`)
    likeBtn.previousSibling.innerText = `${toy.likes} Likes`
  }
