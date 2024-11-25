import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { WeatherService } from './shared/services/weather.service';
import { AuthService } from './shared/services/auth.service';

describe('AppComponent', () => {
  let mockWeatherService: jasmine.SpyObj<WeatherService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', [
      'getUserLocation',
    ]);

    mockAuthService = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
      'isLoggedin',
    ]);
    mockAuthService.isLoggedin.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [AppComponent, NavigationComponent],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the title "ecommerce-catalog"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('ecommerce-catalog');
  });

  it('should fetch weather data on initialization', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(mockWeatherService.getUserLocation).toHaveBeenCalled();
  });
});
