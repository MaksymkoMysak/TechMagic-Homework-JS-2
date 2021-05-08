import Pet from './Pet.js';

 class Cat extends Pet{
    constructor(name,age,gender,imgUrl){
        super(name,age,gender);
        this.type = 'Cat';
        this.img = imgUrl;
    }
    description(){
        return super.description() + `<p>Type: ${this.type} </p>`;
    }
}

export default Cat;