import Dog from './Dog.js';
import Cat from './Cat.js';
import errorHandler from './Error.js';

async function fetchImg(url) {
    const response = await fetch(url);
    const urlData = await response.json();
    return urlData;
}

const createImageGetter = () => {
    /*              CLOSURE
        createImageGetter - outer function
        Lexical Environment - {urlCat, urlDog, func}
     */
    const urlCat = 'https://thatcopy.pw/catapi/rest/';
    const urlDog = 'https://dog.ceo/api/breeds/image/random';
    /* 
        function, that is returned -  inner function
        Lexical Environment - {pet}
    */
    return async (pet) => {
        /*
            Here code start searching urlCat/urlDog variable in Lexical Environment of inner function
            and then goes upper - in Lexical Environment of outer(createImageGetter) function.
        */
        if (pet === 'cat') {
            return (await fetchImg(urlCat)).url;
        }
        if (pet === 'dog') {
            return (await fetchImg(urlDog)).message;
        }
        return '';
    }
}

const createFoodGetter = () => {
    /*              CLOSURE
        createFoodGetter - outer function
        Lexical Environment - {urlFood,func}
     */
    const urlFood = ' https://foodish-api.herokuapp.com/api';
    /* 
        function, that is returned -  inner function
        Lexical Environment - {}
    */
    return async () => {
        /*
            Here code start searching urlFood variable in Lexical Environment of inner function
            and then goes upper - in Lexical Environment of outer(createFoodGetter) function.
        */
        return (await fetchImg(urlFood)).image;
    }
}

const createGetter = (id) => {
    /*              CLOSURE
        createGetter - outer function
        Lexical Environment - {id, el, func}
     */
    const el = document.getElementById(id);
    /* 
        function, that is returned -  inner function
        Lexical Environment - {}
    */
    return () => {
        /*
            Here code start searching el variable in Lexical Environment of inner function
            and then goes upper - in Lexical Environment of outer(createGetter) function.
        */
        return el.value;
    }

}

const editPet = (id) => {
    let newName = prompt('Edit name:', allPets[id].name);
    let newAge = prompt('Edit age:', allPets[id].age);
    if (newName !== null && newName.length > 0 && Number(newAge) > 0) {
        allPets[id].update(newName, newAge);
    } else {
        errorHandler(new Error('Invalid input.'));
    }
    redisplayPets();
}

const redisplayPets = async () => {
    let petsContainer = document.getElementById('allPetsContainer');
    while (petsContainer.lastChild.id !== 'allPetsTitle') {
        petsContainer.removeChild(petsContainer.lastChild);
    }
    for (let i = 0; i < allPets.length; i++) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let petImg = document.createElement('img');
        petImg.setAttribute('src', allPets[i].img);
        petImg.setAttribute('alt', 'pet-photo');

        let container = document.createElement('div');
        container.setAttribute('class', 'container');

        let petDescription = document.createElement('p');
        petDescription.innerHTML = allPets[i].description();

        let editBtn = document.createElement('button');
        editBtn.setAttribute('id', i);
        editBtn.innerHTML = 'Edit';
        editBtn.addEventListener('click', (e) => { editPet(e.target.id); });

        let favFood = document.createElement('button');
        favFood.innerHTML = 'Favorite food';
        favFood.style.height = '50px';
        favFood.style.margin = '10px 10px 10px 20px';
        favFood.addEventListener('click', async () => {
            let foodUrl;
            try {
                foodUrl = await foodGetter();
            } catch (e) {
                errorHandler(e);
            }
            allPets[i].displayFood(foodUrl);
        });

        container.appendChild(petDescription);
        card.appendChild(petImg);
        card.appendChild(container);
        card.appendChild(editBtn);
        card.appendChild(favFood);
        petsContainer.appendChild(card);
    }
}

const getPetName = createGetter('petName');
const getPetAge = createGetter('petAge');
const getPetGender = createGetter('petGender');


const imgGetter = createImageGetter();
const foodGetter = createFoodGetter();

const createPet = async (e) => {
    e.preventDefault();
    let petName = getPetName();
    let petAge = getPetAge();
    let petGender = getPetGender();
    if (petName === '' || petAge === '') {
        errorHandler(new Error('Fill in all fields.'));
    }
    else {
        let newPet;
        let imgUrl;
        if (document.getElementById('chooseCat').checked) {
            try {
                imgUrl = await imgGetter('cat');
                newPet = new Cat(petName, petAge, petGender, imgUrl);
            } catch (e) {
                errorHandler(e);
            }
        } else {
            try {
                imgUrl = await imgGetter('dog');
                newPet = new Dog(petName, petAge, petGender, imgUrl);
            } catch (e) {
                errorHandler(e);
            }
        }
        allPets.push(newPet);
        redisplayPets();
    }
    let form = document.getElementsByClassName('createForm')[0];
    form.reset();
}

let createBtn = document.getElementById('createPet');
createBtn.addEventListener('click', createPet);

let modals = document.getElementsByClassName('modal');
let spans = document.getElementsByClassName("close");

for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', () => { modals[i].style.display = "none"; });
}

let allPets = [];
