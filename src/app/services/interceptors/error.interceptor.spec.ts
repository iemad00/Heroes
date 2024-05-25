import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        ErrorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    toastrService = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should show an error message when a HTTP error occurs', () => {
    spyOn(toastrService, 'error');

    httpClient.get('/test').subscribe(
      () => fail('should have failed with the network error'),
      () => { }
    );

    const req = httpMock.expectOne('/test');
    req.flush('Error message', { status: 500, statusText: 'Server Error' });

    expect(toastrService.error).toHaveBeenCalledWith('Http failure response for /test: 500 Server Error');
  });
});
