import { Injectable } from '@angular/core';
import { Station } from '../interfaces/station';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid%20is%20not%20null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=%2A&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson";

  stationsAll: Station[] = [];
  stations: Station[] = [];
  searchedStations: Station[] = [];


  constructor() { }


  async fetchDataJson() {
    let response = await fetch(this.url);
    let responseAsJson = await response.json();
    let stationsObjects = this.transformObjects(responseAsJson.features);
    this.stationsAll = this.sortStations(stationsObjects);
    this.stations = this.stationsAll;

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


  filterStationsByLetter(letter: string, attribute: 'street' | 'district' = 'street', ascending : boolean, searchText : string) {
    if(this.searchedStations.length >= 1 || searchText.trim() !== '') {
      console.log("SearchedStation", this.searchedStations);
      this.stations = this.sortStations(this.searchedStations, attribute, ascending);
    } else {
      this.stations = this.sortStations(this.stationsAll, attribute, ascending);
    }

    let filteredStations = this.stations.filter(station => 
      station[attribute].toLowerCase().startsWith(letter.toLowerCase())
    );
    this.stations = filteredStations;
    console.log("Gefilterte Stationen:", filteredStations);
  }


  searchStations(searchTerm: string, attribute: 'street' | 'district', ascending : boolean) {
  if (searchTerm.trim() === '') {
    this.stations = this.sortStations(this.stationsAll, attribute, ascending);
    this.searchedStations = [];
  } else {
    // In einer Schleife nach Straße und Stadtteil filtern
    let uniqueResults = this.stationsAll.filter(station => {
      const streetMatches = station['street'].toLowerCase().includes(searchTerm.toLowerCase().trim());
      const districtMatches = station['district'].toLowerCase().includes(searchTerm.toLowerCase().trim());
      
      // Wenn entweder die Straße oder der Stadtteil übereinstimmt, behalten wir die Station
      return streetMatches || districtMatches;
    });

    this.searchedStations = uniqueResults;
    this.stations = this.searchedStations;
  }

  console.log('Stationen nach Suchtext (Straßen und Stadtteile):', this.stations);
}


}
