const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyCollection = document.querySelector('#toy-collection')
let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', fetchToys);
  document.addEventListener('click', likeToy);
})

function fetchToys(){
  fetch ('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => json.forEach(toy => {
      render(toy)
    }))
}

function render(toy){
  toyCollection.innerHTML += `
    <div class="card" >
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} </p>
      <button class='like-btn' data-id="${toy.id}">Like ❤️</button>
    </div>`
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', createToy);
  } else {
    toyForm.style.display = 'none'
  }
})


function createToy(event) {
  event.preventDefault();

  let toyInput = toyForm.querySelectorAll('.input-text')
  let name = toyInput[0].value
  let image = toyInput[1].value
  fetch ('http://localhost:3000/toys', {
    method: 'post',
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    }),
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
    .then(render)
}

function likeToy(event){
  event.preventDefault();
  if (event.target.className === "like-btn") {
    let numOfLikes = event.target.previousElementSibling
    numOfLikes.innerText = parseInt(numOfLikes.innerText) + 1
    updateToy(event.target.dataset.id, parseInt(numOfLikes.innerText))
    }
}

function updateToy(id, num) {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: num})
  }).then(res => res.json())
}
