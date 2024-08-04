import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ExchangeFormComponent } from './exchange-form.component';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';

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

const mockConversion = {
  amount: 100,
  path: [
    {
      previousAmount: 5,
      previousCurrency: "CAD",
      currencyCode: "USD",
      exhangeRate: 0.79,
      convertedAmount: 100
    }
  ]
};

const apiServiceMock = {
  getCurrencies: jest.fn().mockReturnValue(of(mockCurrencies)),
  convert: jest.fn().mockReturnValue(of(mockConversion))
}

describe('ExchangeFormComponent', () => {
  let component: ExchangeFormComponent;
  let fixture: ComponentFixture<ExchangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeFormComponent],
      providers: [
        {
          provide: ApiService, useValue: apiServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExchangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load currencies on init', () => {
    const formElement: HTMLElement = fixture.nativeElement;
    const select = formElement.querySelector("#currency") as HTMLSelectElement;
    
    component.ngOnInit();
    
    expect(component.currencies).toEqual(mockCurrencies);
    expect(component.operation.currency).toEqual(mockCurrencies[0].currencyCode);
    expect(select.value).toEqual(mockCurrencies[0].currencyCode)
    expect(component.selectedCurrency).toEqual(mockCurrencies[0].currencyName);
  });

  it('should call makeConversion only once when typing within 500ms', fakeAsync(() => {
    jest.spyOn(component, 'makeConversion');
    component.submitted = true;
    component.operation.amount = 5;

    component.onInput()
    tick(200);

    component.operation.amount = 50
    
    component.onInput();
    tick(500);

    expect(component.makeConversion).toHaveBeenCalledTimes(1);
  }));

  it('should convert the desired amount to the target currency when both are defined', () => {
    component.operation.amount = 5;
    component.operation.currency = 'USD';

    component.makeConversion();

    expect(component.convertedAmount).toEqual(mockConversion.amount);
    expect(component.transactions).toEqual(mockConversion.path);
    expect(component.selectedCurrency).toEqual('USA Dollar');
  });
});
