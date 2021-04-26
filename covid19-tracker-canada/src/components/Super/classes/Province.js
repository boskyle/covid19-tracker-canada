import ProvinceInformation from './ProvinceInformation';
import ProvinceView from './ProvinceView';

// Controller
export default class Province extends ProvinceInformation
{
    constructor(province,date) {
        super(province,date);
    }

   findData = (province,date) => {
        let provinceViewObj = new ProvinceView();
        this.getData(province,date).then((data) => provinceViewObj.displayData(data)); 
}


};