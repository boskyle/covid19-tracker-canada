import moment from 'moment';


class ProvinceInformation {
    constructor (province,date) {
        this._province = province;
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


init = () => {

}



 async getData(province,cur_date) {
 let loc = this.getProvinceCode(province);
 let date = this.getFormattedDate(cur_date);
 let baseUrl=`https://api.opencovid.ca/timeseries?stat=cases&loc=${loc}&date=${date}`;
 let response = await fetch(baseUrl);
 let data = response.json();
 let foo = await this.additionalData();
 let buff;
 foo.map(x => {
     if (x.short === loc) {
         buff = x;
        
     }
 })
 console.log(buff);
return {data,buff};
}


 async additionalData() {
    let baseUrl = 'https://raw.githubusercontent.com/Clavicus/Testing-Requests/master/canadian-provinces.json';
    const resp = await fetch (baseUrl);
    const data = resp.json();
    return data;
}

}

export default ProvinceInformation;







