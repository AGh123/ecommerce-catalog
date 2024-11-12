import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { WeatherService } from './shared/services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ecommerce-catalog';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getUserLocation();
  }
}
