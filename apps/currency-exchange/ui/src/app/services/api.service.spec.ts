import { TestBed } from '@angular/core/testing';
import { ApiService, DEFAULT_ERROR } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the currencies', (done) => {
    const mockCurrencies = [
      {
        "currencyName": "Hong Kong Dollar",
        "currencyCode": "HKD"
      },
      {
        "currencyName": "USA Dollar",
        "currencyCode": "USD"
      }
    ];

    service.getCurrencies().subscribe((currencies) => {
      expect(currencies.length).toBe(2);
      expect(currencies).toEqual(mockCurrencies);
      done();
    });

    const mockHttp = httpTesting.expectOne('/currency-exchange-api/currencies');
    expect(mockHttp.request.method).toBe('GET');
    mockHttp.flush(mockCurrencies);
  });

  it('should convert the currency', (done) => {
    const amount = 100;
    const currency = 'EUR';
    const mockConversion = {
      amount: 67.18673778126583,
      path: [
        {
          previousAmount: amount,
          previousCurrency: 'CAD',
          currencyCode: currency,
          exchangeRate: 0.6718673778126584,
          convertedAmount: 67.18673778126583
        }
      ]
    };

    service.convert(amount, currency).subscribe((conversion) => {
      expect(conversion).toEqual(mockConversion);
      done();
    });

    const mockHttp = httpTesting.expectOne(`/currency-exchange-api/convert?amount=${amount}&currency=${currency}`);
    expect(mockHttp.request.method).toBe('GET');
    mockHttp.flush(mockConversion);
  });

  it('should handle the error', (done) => {
    const amount = 100;
    const currency = 'EUR';
    service.convert(amount, currency).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error?.message).toEqual(DEFAULT_ERROR);
        done()
      }
    });

    const mockHttp = httpTesting.expectOne(`/currency-exchange-api/convert?amount=${amount}&currency=${currency}`);
    expect(mockHttp.request.method).toBe('GET');
    mockHttp.flush('Error', { status: 500, statusText: 'Internal Server error' });
  })
});
