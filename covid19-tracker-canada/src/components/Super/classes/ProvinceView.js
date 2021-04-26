class ProvinceView  {
    displayData = ({covidInfo,provInfo}) => {
       console.log("province: "+provInfo.name+"\n"+"latitude: "+provInfo.latitude+"\n"+"longitude: "+provInfo.longitude +"\n");

    }


}

export default ProvinceView;