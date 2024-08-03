import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeFormComponent } from './exchange-form.component';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';


const apiServiceMock = {
  getCurrencies: jest.fn().mockReturnValue(of([])),
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
});
