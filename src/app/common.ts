import { IResponse } from 'response-type';

export function GetNetworkError (): IResponse<any> {
  return {
    error: {
      code: 0,
      message: 'It seems you are not connected to internet. Please check your connection and try again'
    }
  };
}
import { IotSvgService } from '@app/services/iot-svg/iot-svg.service';
import { DataSource } from '@app/definitions';

export function error (response: IResponse<any>, fieldName: string) {
  if ( ! response || ! response.error || !response.error.errors) {
    return '';
  }
  const error = response.error.errors.find(x => x.location === fieldName);
  return error ? error.message : '';
}

export const IotImages = [
  {
    id: '1',
    src: IotSvgService.bathroom,
    name: 'Bathroom',
  },
  {
    id: '2',
    src: IotSvgService.kitchen,
    name: 'Kitchen'
  },
  {
    id: '3',
    src: IotSvgService.masterBedroom,
    name: 'Master bedroom'
  },
  {
    id: '4',
    src: IotSvgService.pathtub,
    name: 'Pathtub'
  }
];

export function IsSuccessEntity (response: IResponse<any>) {
  return response && response.data && response.data.items && response.data.items[0];
}

export function IsDataSource (data: DataSource) {

  if (! data.value) {
    return false;
  }
  if (!data.dataSourceId) {
    return false;
  }
  return true;
}
