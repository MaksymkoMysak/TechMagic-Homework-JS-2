import Pet from './Pet.js';

class Dog extends Pet{
    constructor(name,age,gender,imgUrl){
        super(name,age,gender);
        this.type = 'Dog';
        this.img = imgUrl;
    }
    description(){
        return super.description() + `<p>Type: ${this.type} </p>`;
    }

}
export default Dog;