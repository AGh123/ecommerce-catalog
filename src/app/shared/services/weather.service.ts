import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { WeatherDataInterface } from '../models/weather-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';
  weatherData = signal<WeatherDataInterface | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private getWeatherForCurrentLocation(
    geolocationPosition: GeolocationPosition
  ) {
    const params = new HttpParams()
      .set('latitude', geolocationPosition.coords.latitude.toString())
      .set('longitude', geolocationPosition.coords.longitude.toString())
      .set('current', 'temperature_2m');
    return this.http.get<WeatherDataInterface>(this.apiUrl, { params });
  }

  getUserLocation() {
    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.getWeatherForCurrentLocation(position).subscribe({
            next: (data: WeatherDataInterface) => {
              this.weatherData.set(data);
            },
            error: (err) => {
              console.log('Error', err);
            },
          });
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  get temperature() {
    const weatherData = this.weatherData();
    if (weatherData?.current && weatherData?.current_units) {
      return (
        weatherData.current.temperature_2m +
        weatherData.current_units.temperature_2m
      );
    }
    return 0;
  }
}
