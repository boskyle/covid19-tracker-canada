import ProvinceInformation from './ProvinceInformation';
import ProvinceView from './ProvinceView';

// Controller
export default class Province extends ProvinceInformation
{
    constructor(province,prevProvince,date) {
        super(province,prevProvince,date);
    }

   findData = (province,prevProvince,date) => {
        let provinceViewObj = new ProvinceView();
        this.getData(province,prevProvince,date).then((data) => {
        provinceViewObj.displayData(data);
        }); 
}


};