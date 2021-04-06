export default class Province {

    constructor(province) {
        this._province = province;
    }

    test() {
        console.log('hello from province class');
    }




    // setters

    
    // getters
    getProvinceCode = () => {
        return 'area code of '+this._province+' is blah';
    }




};