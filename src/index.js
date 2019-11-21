let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const formInputs = document.querySelector(".add-toy-form")
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.getElementById("toy-collection")

  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toysData => makeDivCard(toysData))
    .catch(err => console.log(err))

  function makeDivCard(toysData) {
    for (toy of toysData) {
      const div = document.createElement("div")
      div.className = "card"
      div.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p toyLikeId=${toy.id}>${toy.likes} Likes </p>
        <button toyId=${toy.id} class="like-btn">Like <3</button>
      `
      toyCollection.appendChild(div)
    }
  }

  const toyObj = () => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: formInputs[0].value,
        image: formInputs[1].value,
        likes: 0
      })
    }
  }

  const likeObj = () => {
    const clicked = event.target.attributes;
    const likeElement = event.target.parentElement.children[2]
    const updatedLikes = parseInt(likeElement.innerText.split(" ")[0]) + 1
    return {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: updatedLikes
      })
    }
  }

  function addToy() {
    event.preventDefault();
    fetch("http://localhost:3000/toys", toyObj())
      .then(resp => resp.json())
      .then(toyData => {
        formInputs.reset()
        makeDivCard([toyData])
      }
      )
      .catch(err => console.log(err))
  }

  function increaseLike() {
    const clicked = event.target.attributes;
    if (clicked.toyid) {
      fetch(`http://localhost:3000/toys/${clicked.toyid.value}`, likeObj())
        .then(resp => resp.json())
        .then(toyData => updateLikes(toyData))
        .catch(err => console.log(err))
    }
  }

  function updateLikes(toyData) {
    let toyCard = document.querySelector(`[toylikeid="${toyData.id}"]`)
    if (toyData.likes === 1) {
      toyCard.innerText = `${toyData.likes} Like`
    } else {
      toyCard.innerText = `${toyData.likes} Likes`
    }
  }


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  formInputs.addEventListener("submit", addToy)
  toyCollection.addEventListener("click", increaseLike)

})

//
// Increase Toy's Likes
// When a user clicks on a toy's like button, two things should happen:
//
// Conditional increase to the toy's like count
// A patch request sent to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
// Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)
