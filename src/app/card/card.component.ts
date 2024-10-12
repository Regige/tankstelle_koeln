import { Component, Input } from '@angular/core';
import { Station } from '../interfaces/station';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() station: Station = {
    id: 0,
    street: '',
    zip_code: '',
    district: '',
    latitude: '',
    longitude: '',
  }

}
