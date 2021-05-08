export default class Pet {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    description() {
        return `<h4><b>${this.name}<b></h4>` +
            `<p>Age: ${this.age} \n  years old</p>` +
            `<p>Gender: ${this.gender} \n</p>`;
    }
    update(newName, newAge) {
        this.name = newName;
        this.age = newAge;
    }
    displayFood(foodUrl) {
        let modal = document.getElementById('foodModal');
        let petFood = document.getElementById('petFood');
        petFood.setAttribute('src', foodUrl);
        modal.style.display = 'block';
    }
}