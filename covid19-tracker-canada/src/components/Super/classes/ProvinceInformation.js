import Province from './Province';


// MVC => Model
export default class ProvinceInformation extends Province {
    constructor (province,date) {
        super(province,date);
    }

    async getData() {
        console.log(this.getDate());
        let nd = this.getDate();
        let dataInformation;
        let baseUrl=`https://api.opencovid.ca/timeseries?stat=cases&loc=${this.getProvinceCode()}&date=${nd}`;
        await fetch(baseUrl)
        .then(response => response.json())
            .then(data => {               
                /*destructure json from the api*/
                //  const {cases,cum_cases:cumulative_cases,province} = data.cases[0];
                dataInformation = data;
            
        });
        return dataInformation;
        }

}







