import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const toastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        AuthService,
        { provide: Router, useValue: router },
        { provide: ToastrService, useValue: toastr }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear(); // Clear session after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#signIn', () => {
    it('should sign in successfully', () => {
      const credentials: IUser = { email: 'test@example.com', password: 'password' };
      const mockUserResponse = [{ id: '1', email: 'test@example.com', password: 'password' }];

      service.signIn(credentials);

      const req = httpMock.expectOne(`${environment.apiUrl}user?email=test@example.com`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUserResponse);

      expect(toastrSpy.success).toHaveBeenCalledWith('You have signed in successfully');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes']);
    });

    it('should show error message on incorrect credentials', () => {
      const credentials: IUser = { email: 'test@example.com', password: 'wrongpassword' };
      const mockUserResponse = [{ id: '1', email: 'test@example.com', password: 'password' }];

      service.signIn(credentials);

      const req = httpMock.expectOne(`${environment.apiUrl}user?email=test@example.com`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUserResponse);

      expect(toastrSpy.error).toHaveBeenCalledWith('Email or Password is not correct!');
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should handle HTTP error', () => {
      const credentials: IUser = { email: 'test@example.com', password: 'password' };

      service.signIn(credentials);

      const req = httpMock.expectOne(`${environment.apiUrl}user?email=test@example.com`);
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error'));

      expect(toastrSpy.error).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('#signOut', () => {
    it('should sign out and navigate to login', () => {
      spyOn(sessionStorage, 'removeItem');

      service.signOut();

      expect(sessionStorage.removeItem).toHaveBeenCalledWith('userId');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('#isAuthenticated', () => {
    it('should return true if user is authenticated', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue('1');

      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if user is not authenticated', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue(null);

      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('#isAuthorized', () => {
    it('should return true if user has required role', async () => {
      sessionStorage.setItem('userId', '1');
      spyOn(service, 'isAuthenticated').and.returnValue(true);
      const mockUserResponse = [{ id: '1', role: 'admin' }];

      const promise = service.isAuthorized('admin');

      const req = httpMock.expectOne(`${environment.apiUrl}user?id=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUserResponse);

      expect(await promise).toBeTrue();
    });

    it('should return false if user does not have required role', async () => {
      sessionStorage.setItem('userId', '1');
      spyOn(service, 'isAuthenticated').and.returnValue(true);
      const mockUserResponse = [{ id: '1', role: 'user' }];

      const promise = service.isAuthorized('admin');

      const req = httpMock.expectOne(`${environment.apiUrl}user?id=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUserResponse);

      expect(await promise).toBeFalse();
    });

    it('should return false if user is not authenticated', async () => {
      spyOn(service, 'isAuthenticated').and.returnValue(false);

      expect(await service.isAuthorized('admin')).toBeFalse();
    });
  });
});
