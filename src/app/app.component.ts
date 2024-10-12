import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tankstelle_koeln';

  showStreet = true;
  letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  constructor(public data: DataService) {}

  ngOnInit() {
    this.data.fetchDataJson();
  }


  backToAllStations(attribute: 'street' | 'district') {
    this.data.stations = this.data.stationsAll;
    this.data.sortStations(this.data.stations, attribute, true)
  }




  //  $(document).ready(function () {
  //       var map = document.getElementById("map"),
  //         list = document.getElementById("list"),
  //         listUl = list.querySelector("ul"),
  //         mapBtn = document.getElementById("mapBtn"),
  //         listBtn = document.getElementById("listBtn");
  //       var mapObject;

  //       function toggleHandler(toggle) {
  //         if (toggle) {
  //           styleHandler(map, mapBtn, list, listBtn);
  //         } else {
  //           styleHandler(list, listBtn, map, mapBtn);
  //         }
  //       }

  //       function styleHandler(block, blockBtn, none, noneBtn) {
  //         none.style.display = "none";
  //         noneBtn.style.backgroundColor = "#ccc";
  //         block.style.display = "block";
  //         blockBtn.style.backgroundColor = "#666";
  //       }

  //       function init() {
  //         toggleHandler(true);
  //         mapBtn.addEventListener("click", toggleHandler.bind(null, true));
  //         listBtn.addEventListener("click", toggleHandler.bind(null, false));

  //         mapObject = L.map("map").setView([50.937231, 6.960279], 16);

  //         L.tileLayer("http://{s}.tiles.koeln.de/tiles/kde/{z}/{x}/{y}.png", {
  //           attribution:
  //             '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //         }).addTo(mapObject);

  //         var url =
  //           "https://geoportal.stadt-koeln.de/arcgis/rest/services/Gefahrgutstrecken/MapServer/0/query?where=objectid%20is%20not%20null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=%2A&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson";

  //         $.ajax({
  //           url: url,
  //           dataType: "jsonp",
  //         }).done(function (data) {
  //           $.each(data.features, addItem);
  //         });
  //       }

  //       function addItem(index, value) {
  //         var name = value.attributes.ADRESSE;
  //         var longitude = value.geometry.y;
  //         var latitude = value.geometry.x;

  //         L.marker([longitude, latitude]).addTo(mapObject).bindPopup(name);

  //         listEl = document.createElement("li");
  //         text = document.createTextNode("Name: " + name);
  //         listEl.appendChild(text);
  //         listUl.appendChild(listEl);
  //       }

  //       init();
  //     });
}
