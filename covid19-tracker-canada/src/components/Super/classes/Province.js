import React from 'react';
// Controller
export default class Province {
    constructor(province,date) {
        this._province = province;
        this._date = date;
    }

 


    // getters

    // Two-letter-code to be pasted into fetch of third party api for simplicity
    getProvinceCode = () => {
        switch (this._province){
            case 'alberta': return 'AB';
            case 'british-columbia': return 'BC';
            case 'manitoba': return 'MB';
            case 'new-brunswick': return 'NB';
            case 'new-foundland-and-labrador': return 'NL';
            case 'northwest-territories': return 'NT';
            case 'nova-scotia': return 'NS';
            case 'ontario': return 'ON';
            case 'pei': return 'PE';
            case 'quebec': return 'QC';
            case 'saskatchewan': return 'SK';
            case 'yukon': return 'YT';
            default: return 'RP';
        }
    }

    getDate = () => {
        return this._date; 
    }


};