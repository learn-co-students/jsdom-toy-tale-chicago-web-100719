let addToy = false
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => addCard(json))
  function addCard(json){
    json.forEach(toy => {
      const card = document.createElement("div")
      card.className = "card"
      card.innerHTML = `<h2>${toy.name}</h2> <img src=${toy.image} class="toy-avatar" /> <p>${toy.likes} Likes</p>`
      const likeButton = document.createElement("button")
      likeButton.setAttribute('class', "like-btn")
      likeButton.setAttribute('id', toy.id)
      likeButton.innerText = "Like ❤️"
      card.appendChild(likeButton)
      const collection = document.getElementById("toy-collection")
      collection.appendChild(card)
    })
  }
function submitData(formData){
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json"
        },
        body : JSON.stringify(formData)
      }
    return fetch("http://localhost:3000/toys",configObj)
        .then(response => response.json())
        .then(object => addCard([object]))
        .catch(error => console.log(error))
  }
  const formEl = document.querySelector("form.add-toy-form")
    formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = grabFormData()
    submitData(formData)
    formEl.reset()
  })
function grabFormData(){
  let name = document.getElementsByName("name")[0].value
  let image = document.getElementsByName("image")[0].value
  return {name, image, "likes": 0}
}
function addLike(){
  let configObj = () => {
    const newLikes = parseInt(event.target.parentElement.children[2].innerText.split(" ")[0]) + 1
    return { 
      method: "PATCH",
      headers: {
          "Content-Type" : "application/json",
          "Accept": "application/json"
      },
      body : JSON.stringify({
        likes: newLikes 
            })
    }
  }
return fetch(`http://localhost:3000/toys/${event.target.id}`,configObj())
    .then(response => response.json())
    .then(object => renderLikes(object))
    .catch(error => console.log(error))
  }
const toyCollection = document.getElementById("toy-collection")
toyCollection.addEventListener("click", addLikeBtn)
function addLikeBtn(event){
  if (event.target.innerText === "Like ❤️"){
    addLike()
  }
}
function renderLikes(object){
const likeTag = document.getElementById(object.id).previousSibling
likeTag.innerHTML = `${object.likes} Likes`
}
})