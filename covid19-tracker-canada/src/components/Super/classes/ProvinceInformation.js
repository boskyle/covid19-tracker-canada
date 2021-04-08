import Province from './Province';


// MVC => MODEL
export default class ProvinceInformation extends Province {
    constructor (province) {
        super(province);
    }
    display () {
        return this.getProvinceCode();
    }


        async getData() {
            let baseUrl=`https://api.opencovid.ca/timeseries?stat=cases&loc=${this.getProvinceCode()}&date=03-07-2020`;
             await fetch(baseUrl)
             .then(response => response.json())
                .then(data => {
                 console.log(data.cases[0]);
                 console.log(data.cases[0].cases);
                 console.log(this.getProvinceCode());
                 // destructure json from the api
                 const {cases,cum_cases:cumulative_cases,province} = data.cases[0];
                 return cases;  
             });;

        }




}





