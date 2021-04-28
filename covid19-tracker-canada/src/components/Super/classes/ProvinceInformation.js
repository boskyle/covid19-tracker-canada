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

getFormattedDate = (curDate,option) => {
  
    let last7 = new Date(curDate);
    switch (option) {
        case 'daily': return moment(curDate).format('DD-MM-YYYY');
        case 'weekly': last7.setDate(last7.getDate() -7); return [moment(curDate).format('DD-MM-YYYY'),moment(last7).format('DD-MM-YYYY')];
        case 'monthly': last7.setDate(last7.getDate() -30); return [moment(curDate).format('DD-MM-YYYY'),moment(last7).format('DD-MM-YYYY')];
        default: return curDate;
    }
    
}




async getData(province,cur_date,option) {
    // transform input to formatted to be inserted to async fetch
let loc = this.getProvinceCode(province);
let date = this.getFormattedDate(cur_date,option);
let covidInfo; 
let provArray;
covidInfo = await this.getCovid(loc,date,option);
provArray = await this.additionalData();


let provInfo;
provArray.map(x => {if (x.short === loc) {provInfo = x;}})


return {covidInfo,provInfo,date};
}


 async getCovid(loc,date) {
    //  if I have range
    let baseUrl = `https://api.opencovid.ca/timeseries?stat=cases&loc=${loc}&date=${date}`;
    if(Array.isArray(date)) {
        baseUrl = `https://api.opencovid.ca/timeseries?stat=cases&loc=${loc}&before=${date[0]}&after=${date[1]}`
    }
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







