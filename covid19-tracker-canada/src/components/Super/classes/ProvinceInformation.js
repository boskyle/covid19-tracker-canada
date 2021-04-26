import moment from 'moment';


class ProvinceInformation {
    constructor (province,prevProvince,date) {
        this._province = province;
        this._prevProvince = prevProvince;
        this._date = date;
    }




getProvinceCode = (province) => {
    switch (province){
        case 'alberta': return 'AB';
        case 'british-columbia': return 'BC';
        case 'manitoba': return 'MB';
        case 'new-brunswick': return 'NB';
        case 'new-foundland-and-labrador': return 'NL';
        case 'northwest-territories': return 'NT';
        case 'nunavut': return 'NU';
        case 'nova-scotia': return 'NS';
        case 'ontario': return 'ON';
        case 'pei': return 'PE';
        case 'quebec': return 'QC';
        case 'saskatchewan': return 'SK';
        case 'yukon': return 'YT';
        default: return 'RP';
    }
}

getFormattedDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
}



async getData(province,prevProvince,cur_date) {
    // transform input to formatted to be inserted to async fetch
let loc = this.getProvinceCode(province);
let date = this.getFormattedDate(cur_date);
let covidInfo; 
let provArray;
covidInfo = await this.getCovid(loc,date);
provArray = await this.additionalData();

let provInfo;
provArray.map(x => {if (x.short === loc) {provInfo = x;}})
console.log(date);
console.log(covidInfo);
return {covidInfo,provInfo};
}


 async getCovid(loc,date) {
    let baseUrl = `https://api.opencovid.ca/timeseries?stat=cases&loc=${loc}&date=${date}`;
    let response = await fetch(baseUrl);
    let data = response.json();
    return data;
 }
 async additionalData() {
    let baseUrl = 'https://raw.githubusercontent.com/Clavicus/Testing-Requests/master/canadian-provinces.json';
    const resp = await fetch (baseUrl);
    const data = resp.json();
    return data;
}

}

export default ProvinceInformation;







