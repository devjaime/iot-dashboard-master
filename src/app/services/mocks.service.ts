import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IResponse, IResponseErrorItem } from 'response-type';
import { matchPattern } from 'url-matcher';
import { environment } from '../../environments/environment';
import { PermissionsService } from '@services/permissions.service';
import { IUserForm, CloudDevice, DataSource, IUser, ICloudDeviceDailyHistory, IContact, IResetForm, IRole } from '@app/definitions';
import { CloudDeviceType } from '@app/definitions';
import { IotSvgService } from '@services/iot-svg/iot-svg.service';
import { random, times } from '@lodash';
import { ILocation } from '@app/definitions';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/delay';

const devices = [
  {
    id: 1,
    name: 'Temperatura del pasillo',
    type: CloudDeviceType.TemperatureSensor,
    datasource: 'device-1',
    value: random(10, 30),
    location: 1,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true,
      DisplayHistoryStatisticsInHome: true
    }
  },
  {
    id: 2,
    name: 'Temperatura de la cocina',
    type: CloudDeviceType.TemperatureSensor,
    datasource: 'device-2',
    value: random(10, 30),
    location: 1,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
  {
    id: 3,
    name: 'Lampara principal',
    type: CloudDeviceType.LampBridge,
    datasource: 'device-4',
    value: 1,
    location: 1,
    preferences: {
      DisplayLampOnOffInHome: true
    }
  },
  {
    id: 4,
    name: 'Humedad del baño',
    type: CloudDeviceType.HumiditySensor,
    datasource: 'device-5',
    value: random(10, 60),
    location: 2,
    preferences: {
      DisplayHumidityInHome: true,
    }
  },
  {
    id: 5,
    name: 'Sensor de CO2 Calefón',
    type: CloudDeviceType.CO2Sensor,
    datasource: 'device-6',
    value: random(100, 600),
    location: 2,
    preferences: {
      DisplayCO2InHome: true
    }
  },
  {
    id: 6,
    name: 'Temperatura del Calefón',
    type: CloudDeviceType.TemperatureSensor,
    datasource: 'device-7',
    value: random(10, 30),
    location: 2,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
  {
    id: 7,
    name: 'Temperatura Minima',
    type: CloudDeviceType.TemperatureSensor,
    datasource: 'device-8',
    value: random(10, 30),
    location: 3,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
  {
    id: 8,
    name: 'Temperatura Maxima',
    type: CloudDeviceType.TemperatureSensor,
    datasource: 'device-9',
    value: random(10, 30),
    location: 3,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
];
const validateLocation = (location: ILocation) => {
  const errors: Array<IResponseErrorItem> = [];
  if (!location.name) {
    errors.push({
      message: 'Proporcione un nombre para la ubicación',
      location: 'name'
    });
  }
  if (!location.level) {
    errors.push({
      message: 'Por favor seleccione un nivel',
      location: 'level'
    });
  }
  if (!location.icon) {
    errors.push({
      message: 'Por favor seleccione un icono para la ubicación',
      location: 'icon'
    });
  }
  return errors;
};
@Injectable()
export class MockService {
  public routes = {
    'POST /api/user/signin': 'signIn',
    'POST /api/user/signup': 'signUp',
    'GET /api/locations': 'getLocations',
    'DELETE /api/role/:id': 'deleteRole',
    'GET /api/roles': 'getRoles',
    'POST /api/role': 'postRole',
    'GET /api/devices/daily-history/:id': 'GetDeviceDailyHistory',
    'GET /api/devices/token': 'getDevicesToken',
    'GET /api/devices/day-history/:date/:id': 'GetDeviceDayHistory',
    'GET /api/device/:id': 'getDevice',
    'GET /api/devices': 'getDevices',
    'GET /api/unconnected': 'getUnconnected',
    'POST /api/device': 'postDevice',
    'POST /api/forget-password': 'forgetPassword',
    'POST /api/location': 'postLocation',
    'DELETE /api/location/:id': 'deleteLocation',
    'DELETE /api/device/:id': 'deleteDevice',
    'GET /api/contact-details': 'GetContactDetails',
    'POST /api/user/settings': 'updateUserProfile',
    'POST /api/contact-details': 'UpdateContactDetails',
    'POST /api/user/reset-password': 'ResetPassword',
  };

  constructor (
    private permissions: PermissionsService,
    private iotsvg: IotSvgService,
    private translate: TranslateService,
  ) {}

  urlMatch( url: string, method: string = null ) {
    url = url.replace(environment.api, '');
    for ( const route of Object.keys( this.routes ) ) {
      const urlMethod = route.split( ' ' );
      let result = '';
      if ( urlMethod.length === 2 ) {
        if ( method === null ) {
          result = matchPattern( urlMethod[ 1 ], url );
        } else {
          if ( urlMethod[ 0 ].toUpperCase() === method.toUpperCase() ) {
            result = matchPattern( urlMethod[ 1 ], url );
          }
        }
      } else {
        result = matchPattern( route, url );
      }
      if ( result ) {
        return route;
      }
    }
    return '';
  }

  handleRoute( req: HttpRequest<any> ): Observable<HttpEvent<any>> {
    const url = this.urlMatch( req.url, req.method );
    const action = this.routes[ url ];
    const result = this[ action ].call( this, req );

    if (result && result.error) {
      result.error.message = this.translate.get(result.error.message)['value'];
    }
    if (result && result.error && result.error.errors) {
      result.error.errors = result.error.errors.map((x: IResponseErrorItem) => {
        x.message = this.translate.get(x.message)['value'];
        return x;
      });
    }
    const mockResponse = new HttpResponse( {
      body: result,
      headers: new HttpHeaders(),
      status: (result.data) ? 200 : result.error.code,
      statusText: 'OK',
      url: req.url
    } );
    return Observable.of( mockResponse );
  }

  public ResetPassword(req: HttpRequest<IResetForm>): IResponse<any> {
    const message = 'Restablezca su contraseña a 123321, y ambos campos deben ser idénticos.' +
    'Usted ve este mensaje porque está ejecutando una versión experimental de la aplicación';
    if (req.body.password1 !== '123321' || req.body.password2 !== req.body.password1) {
      return {
        error: {
          code: 17,
          message,
          errors: [
            {
              location: 'password1',
              message: 'Por favor escriba 123321'
            },
            {
              location: 'password2',
              message: 'Por favor repita 123321'
            }
          ]
        }
      };
    }
    return {
      data: {
        items: times(24 , () => random (10, 30)),
      }
    };
  }

  public GetDeviceDayHistory(req: HttpRequest<any>): IResponse<number> {
    return {
      data: {
        items: times(24 , () => random (10, 30)),
      }
    };
  }
  public mockUser () {
    return {
      email: 'hernandez.hs@gmail.com',
      username: 'jhernandez',
      avatar: 'user.png',
      firstname: 'Jaime',
      lastname: 'Hernandez ',
      role: {
        permissions: [
          this.permissions.findByKey('DEVICES::VIEW'),
          this.permissions.findByKey('WIDGETS::VIEW'),
          this.permissions.findByKey('LOCATIONS::VIEW'),
          this.permissions.findByKey('ACTIVITIES::VIEW'),
          this.permissions.findByKey('ROLES::VIEW'),
          this.permissions.findByKey('USERS::VIEW')
        ]
      },
    };
  }
  public deleteRole (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {
          }
        ]
      }
    };
  }
  signIn( req: HttpRequest<any> ): IResponse<any> {
    if ( req.body.email === 'hernandez.hs@gmail.com' && req.body.password === '123321' ) {
      return {
        'data': {
          'items': [
            {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyfSwiaWF0IjoxNTEwOTE4NTY5L' +
              'CJleHAiOjE1MTA5MjIxNjl9.qOPJVGiIFBye1dUY0BfX6bqcc0rig8PhZTLMYNg1FLU',
              user: this.mockUser()
            }
          ]
        }
      };
    } else {

      const errors: Array<IResponseErrorItem> = [];
      if (!req.body.email) {
        errors.push({
          location: 'email',
          message: 'Proporcione "hernandez.hs@gmail.com" como correo electrónico'
        });
      }
      if (!req.body.password) {
        errors.push({
          location: 'password',
          message: 'Proporcione "123321" como contraseña'
        });
      }
      return {
        apiVersion: 'beta',
        error: {
          code: 401,
          message: 'Hay un problema al iniciar sesión. Por favor, configure el correo electrónico y la contraseña como se indica.',
          errors: errors
        }
      };
    }
  }
  public getUnconnected (req: HttpRequest<any>): IResponse<DataSource> {
    return {
      data: {
        items: [
          {
            dataSourceId: 'device-36',
            date: new Date(),
            value: 22
          }
        ]
      }
    };
  }
  public postRole (req: HttpRequest<any>): IResponse<IRole> {
    const form: IRole = req.body;
    if (!form.id) {
      form.id = random(1, 99999);
    }
    return {
      data: {
        items: [
          form
        ]
      }
    };
  }
  public signUp (req: HttpRequest<any>): IResponse<any> {
    const form = req.body;
    function hasUnvalidFields(user: IUserForm): Array<any> {
      const errors = [];
      if ( ! user.email ) {
        errors.push({
          location: 'email',
          message: 'Por favor proporciona el correo electrónico'
        });
      }
      if ( ! user.password ) {
        errors.push({
          location: 'password',
          message: 'Proporcione una contraseña segura'
        });
      }
      return errors;
    }
    if (hasUnvalidFields(form).length) {
      return {
        error: {
          code: 1,
          message: 'La suscripción no se puede completar debido a algunos errores. Por favor, arregle los campos marcados e intente de nuevo',
          errors: hasUnvalidFields(form)
        }
      };
    }
    return {
      data: {
        items: [
          {
            user: this.mockUser(),
            token: 'fake-token3892379828932982789237982'
          }
        ]
      }
    };
  }
  public getRoles (): IResponse<IRole> {
    return {
      data: {
        items: [
          {
            id: 1,
            title: 'Developer',
            permissions: []
          },
          {
            id: 2,
            title: 'Master',
            permissions: []
          },
          {
            id: 3,
            title: 'Guest',
            permissions: []
          }
        ]
      }
    };
  }

  public getDevices (): IResponse<CloudDevice> {
    return {
      data: {
        items: devices
      }
    };
  }
  public getDevice (req: HttpRequest<any> , params): IResponse<CloudDevice> {
    const id = req.url.split('/').reverse()[0];
    return {
      data: {
        items: devices.filter(device => device.id === +id)
      }
    };
  }

  public getLocations (): IResponse<any> {
    return {
      data: {
        items: [
          {
            id: 1,
            name: 'Cocina',
            'icon': IotSvgService.kitchen,
            level: '2',
            temperatureDevice: 1
          },
          {
            id: 2,
            name: 'Baño',
            'icon': IotSvgService.pathtub,
            level: '3',
            temperatureDevice: 2
          },
          {
            id: 3,
            name: 'Habitación Carolina y Jaime',
            'icon': IotSvgService.masterBedroom,
            level: '2',
            temperatureDevice: 1
          },
        ]
      }
    };
  }
  public postDevice( req: HttpRequest<any> ): IResponse<CloudDevice> {
    const device: CloudDevice = req.body;
    if (! device.id) {
      device.id = random(1000, 999999);
    }
    const validations = DeviceValidator(device);
    if (validations.length) {
      return {
        error: {
          message: 'El dispositivo no puede ser creado. Por favor corrija que los campos estén resaltados',
          errors: validations,
          code: 34
        }
      };
    }
    return {
      data: {
        items: [
          device
        ]
      }
    };
  }
  public postLocation(req: HttpRequest<any>): IResponse<ILocation> {
    const location: ILocation = req.body;
    if ( ! location.id) {
      location.id = random(100, 9999);
    }
    if (validateLocation(location).length) {
      return {
        error: {
          message: 'No se puede crear un dispositivo Por favor arregla los siguientes problemas',
          code: 294,
          errors: validateLocation(location)
        }
      };
    }
    return {
      data: {
        items: [
          {
            icon: location.icon,
            id: location.id,
            name: location.name,
            level: location.level,
            temperatureDevice: location.temperatureDevice
          }
        ]
      }
    };
  }
  public UpdateContactDetails(req: HttpRequest<any>): IResponse<any> {

    return {
      data: {
        items: [
          {

          }
        ]
      }
    };
  }
  /**
   * For email, phone, sms and etc that user determines when he wants
   * to be notified when an action has occured.
   */
  public GetContactDetails (req: HttpRequest<any>): IResponse<IContact> {
    return {
      data: {
        items: [
          {
            type: 'call',
            value: '+14149990000'
          },
          {
            type: 'sms',
            value: '+492839179387'
          }
        ]
      }
    };
  }
  public GetDeviceDailyHistory (req: HttpRequest<any>): IResponse<ICloudDeviceDailyHistory> {
    // const id = req.body.id;
    return {
      data: {
        items: [
          {
            date: new Date('2018-06-27'),
            average: 33.5
          },
          {
            date: new Date('2018-06-26'),
            average: 35.2
          },
          {
            date: new Date('2018-06-25'),
            average: 31.5
          }
        ]
      }
    };
  }
  public updateUserProfile(req: HttpRequest<any>): IResponse<IUser> {
    const user: IUser = req.body;
    return {
      data: {
        items: [
          user
        ]
      }
    };
  }

  public forgetPassword(req: HttpRequest<any>): IResponse<any> {
    const username: string = req.body.username;
    if ( ! username) {
      return {
        error: {
          code: 29,
          message: 'No podemos procesar su solicitud de restablecimiento de contraseña',
          errors: [
            {
              location: 'username',
              message: 'Por favor, proporcione un nombre de usuario primero.'
            }
          ]
        },
      };
    };
    return {
      data: {
        items: []
      }
    };
  }

  public deleteLocation (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {

          }
        ]
      }
    };
  }
  public deleteDevice (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {

          }
        ]
      }
    };
  }

  public getDevicesToken (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {
            hash: 'ei923040'
          }
        ]
      }
    };
  }
}
function DeviceValidator (device: CloudDevice) {
  const errors: Array<IResponseErrorItem> = [];

  if ( ! device.name) {
    errors.push({
      location: 'name',
      message: 'El dispositivo debe tener un nombre para ser identificado'
    });
  }
  if ( ! device.datasource) {
    errors.push({
      location: 'datasource',
      message: 'Debe conectar el dispositivo a una fuente de datos'
    });
  }
  return errors;
}
