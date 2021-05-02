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



// this format is used for the api fetch
getFormattedDate = (curDate,option) => {
  



    let last7 = new Date(curDate);
    switch (option) {
        case 'daily': return moment(curDate).format('DD-MM-YYYY');
        case 'weekly': last7.setDate(last7.getDate() -7); return [moment(curDate).format('DD-MM-YYYY'),moment(last7).format('DD-MM-YYYY')];
        case 'monthly': last7.setDate(last7.getDate() -30); return [moment(curDate).format('DD-MM-YYYY'),moment(last7).format('DD-MM-YYYY')];
        default: return curDate;
    }
    
}
// this format is used for display purposes 
getFormattedDateDisplay =(curDate,option) => {
    let last7 = new Date(curDate);
    switch (option) {
        case 'daily': return moment(curDate).format('MMM Do YYYY');
        case 'weekly': last7.setDate(last7.getDate() -7); return [moment(curDate).format('MMM Do YYYY'),moment(last7).format('MMM Do YYYY')];
        case 'monthly': last7.setDate(last7.getDate() -30); return [moment(curDate).format('MMM Do YYYY'),moment(last7).format('MMM Do YYYY')];
        default: return curDate;
    }

}

displayDate(date) {
   if(Array.isArray(date)) {
        return `${date[1]} to ${date[0]}`;
    }
        return date;
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

var myDate = '';
myDate = this.displayDate(this.getFormattedDateDisplay(cur_date,option));


return {covidInfo,provInfo,myDate};
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
 getLeaderboard(cur_date,option) {
    var date = this.getFormattedDate(cur_date,option);
    console.log(date);
    var PR_CODES=['AB','BC','MB','NB','NL','NT','NU','NS','ON','PE','QC','SK','YT'];
    var baseUrl='';
    let promises = [];
    // iterate through all the provinces and territories
    for (let i =0; i<PR_CODES.length; i++) {

        // if date is single (no range)
        if (!Array.isArray(date)) {
            console.log(date);
            baseUrl = `https://api.opencovid.ca/timeseries?stat=cases&loc=${PR_CODES[i]}&date=${date}`;
            
      
        }else if (Array.isArray(date)){
            baseUrl = `https://api.opencovid.ca/timeseries?stat=cases&loc=${PR_CODES[i]}&before=${date[0]}&after=${date[1]}`;
        } else {console.log("DATE INVALID")}

         promises.push(fetch(baseUrl));
    }
    
    return Promise.all(promises);

   
}

}

export default ProvinceInformation;







