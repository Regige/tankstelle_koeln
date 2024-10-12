import { Injectable } from '@angular/core';
import { Station } from '../interfaces/station';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid%20is%20not%20null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=%2A&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson";

  stations: Station[] = [];


  constructor() { }


  async fetchDataJson() {
    let response = await fetch(this.url);
    let responseAsJson = await response.json();
    let stationsObjects = this.transformObjects(responseAsJson.features);
    this.stations = this.sortStations(stationsObjects);

    console.log(this.stations);
  }


  transformObjects(stationsRaw: any[]): Station[] {
    return stationsRaw.map(station => {
        const { objectid, adresse } = station.attributes;
        const { x: longitude, y: latitude } = station.geometry;

        // Adresse aufsplitten in Straße, Postleitzahl und Stadtteil
        const adresseParts = adresse.match(/^(.*) \((\d{5}) (.*)\)$/);
        const street = adresseParts[1];
        const zip_code = adresseParts[2];
        const district = adresseParts[3];

        return {
            id: objectid,
            street: street,
            zip_code: zip_code,
            district: district,
            latitude: latitude.toString(),
            longitude: longitude.toString()
        };
    });
  }


  sortStations(stations: Station[], attribute: 'street' | 'district' = 'street', ascending: boolean = true): Station[] {
    return stations.sort((a, b) =>
      ascending ? a[attribute].localeCompare(b[attribute]) : b[attribute].localeCompare(a[attribute])
    );
  }


}
