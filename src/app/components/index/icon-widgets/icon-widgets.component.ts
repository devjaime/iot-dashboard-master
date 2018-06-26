import { Component, OnInit } from '@angular/core';
import { random } from '@lodash';

@Component({
  selector: 'app-icon-widgets',
  templateUrl: './icon-widgets.component.html',
  styleUrls: ['./icon-widgets.component.scss']
})
export class IconWidgetsComponent implements OnInit {

  public places: Array<any>;
  public largeWidgets: Array<any>;

  constructor() { }

  mockData () {
      return [
          {
              'title': 'Power',
              'icon': 'icon icon-flash',
              'value': random(300, 600),
              'unit': 'Wh'
          },
          {
              'title': 'Consumo',
              'icon': 'icon icon-temperatire',
              'value': random(5500, 6000) / 100,
              'unit': 'kWh'
          },
          {
              'title': 'Agua',
              'icon': 'icon icon-tint',
              'value': random(200, 800) / 100,
              'unit': 'L'
          }
      ];
  }

  async ngOnInit() {
      this.largeWidgets = this.mockData();
      this.places = [
          {name: 'Cocina' , 'icon': 'four-cooking-accessories-set-for-kitchen.svg'},
          {name: 'Baño' , 'icon': 'bathtub.svg'},
          {name: 'Habitación Carolina y Jaime', 'icon': 'fireplace.svg'},
          {name: 'Living', 'icon': 'living-room.svg'},
          {name: 'Sala de computación', 'icon': 'conference.svg'}
      ];
  }
}
