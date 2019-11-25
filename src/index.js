let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toy_collection = document.querySelector('#toy-collection')
  const form = document.querySelector('.add-toy-form')
  const url = 'http://localhost:3000/toys'

toy_collection.addEventListener('click', () => {
  if(event.target.className === "like-btn") {
    // let updateLikes = addLike(event.target)
    const newLike = parseInt(event.target.parentElement.children[2].innerText.split(' ')[0]) + 1
    reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'likes': newLike
      })
    }
     fetch(`${url}/${event.target.dataset.id}`, reqObj)
     .then(resp => resp.json())
     .then(json => updateToyLikes(json))
  }
})


  fetch(url)
  .then(resp => resp.json())
  .then(json => {
    addToys(json, toy_collection)
    console.log(json)
  })

 

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
//nothing
  form.addEventListener('submit', () => {
    const postObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'name': `${event.target.name.value}`,
        'image': `${event.target.image.value}`,
        'likes': 0
      })
       
    }
    event.preventDefault()
    fetch(url, postObj)
    .then(resp => resp.json())
    // .then(addToys(json, toy_collection))
    .then(json => addNewToy(json, toy_collection))
    // .then(console.log)
    form.reset()
  })

})

 

function addToys(json, toy_collection) {
  json.forEach(toy => addNewToy(toy, toy_collection))
}

function addNewToy(toy, toy_collection) {
  let div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p id=likes-${toy.id}>${toy.likes} Likes</p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
  `
  toy_collection.append(div)

}

function updateToyLikes(toy) {
  let p = document.querySelector(`p#likes-${toy.id}`)
  p.innerText = `${toy.likes} Likes`
}

