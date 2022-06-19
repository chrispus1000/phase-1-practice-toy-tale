let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});





//MY CODE

function renderAllToys(toys) {
  toys.forEach(toy => {
    const toyCollection = document.getElementById('toy-collection')
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML =`
      <h4>${toy.name}</h4>
      <img src="${toy.image}" class='toy-avatar'>
      <p>${toy.likes}</p>
      <button class='like-btn' id=${toy.id}>Like <3</button>
      `
    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes += 1
      card.querySelector('p').textContent = toy.likes
      updateToy(toy)
    })
    //card.getElementsByClassName('like-button').addEventListener('click', () => console.log('I was clicked'))
    //console.log(toy)
    //console.log(card.innerHTML)
    //console.log(toys.id)
    toyCollection.appendChild(card)

  })
}

function renderOneToy(toy) {

    const toyCollection = document.getElementById('toy-collection')
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML =`
      <h4>${toy.name}</h4>
      <img src="${toy.image}" class='toy-avatar'>
      <p>${toy.likes}</p>
      <button class='like-btn' id=${toy.id}>Like <3</button>
      `  
    //console.log(card.innerHTML)
    //console.log(toys.id)
    toyCollection.appendChild(card) 
}

document.addEventListener("DOMContentLoaded", fetchingToys)

function fetchingToys() {
  fetch("http://localhost:3000/toys")
  .then(res =>res.json())
  .then(toys => {renderAllToys(toys)});
}

const form = document.querySelector('.add-toy-form')
//console.log(form)
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){ 
  e.preventDefault()
  //console.log('I was clicked')
  let toyObj = {
    id: e.target.id.value,
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  }
  renderOneToy(toyObj)
  //console.log(toyObj)
  postingToy(toyObj)
  }


function postingToy(toyObj){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)  
  })
    .then(res => res.json())
}

function updateToy(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
  
}
//const likeButton = document.getElementsByClassName("like-button")
//console.log(likeButton)
//likeButton.addEventListener('click', function() {console.log('I was clicked')})