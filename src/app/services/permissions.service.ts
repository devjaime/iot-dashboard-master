import { Injectable } from '@angular/core';
import { IPermission } from '@app/definitions';

@Injectable()
export class PermissionsService {

  constructor() { }

  UsersPermissions (): Array<IPermission> {
    return [
      {
        group: 'USERS',
        key: 'USERS::CREATE',
        title: 'Crear usuario'
      },
      {
        group: 'USERS',
        key: 'USERS::UPDATE',
        title: 'Actualizar usuario'
      },
      {
        group: 'USERS',
        key: 'USERS::DELETE',
        title: 'Borrar usuario'
      },
      {
        group: 'USERS',
        key: 'USERS::VIEW',
        title: 'Ver usuarios'
      }
    ];
  }

  DevicesPermissions (): Array<IPermission> {
    return [
      {
        title: 'Actualizar la información del dispositivo',
        group: 'DEVICES',
        key: 'DEVICES::UPDATE_INFORMATION'
      },
      {
        title: 'Actualizar dispositivos',
        group: 'DEVICES',
        key: 'DEVICES::VIEW'
      }
    ];
  }

  LocationsPermissions (): Array<IPermission> {
    return [
      {
        title: 'Ver ubicaciones',
        group: 'LOCATIONS',
        key: 'LOCATIONS::VIEW'
      }
    ];
  }

  ActivitiesPermissions (): Array<IPermission> {
    return [
      {
        title: 'Ver actividades',
        group: 'ACTIVITIES',
        key: 'ACTIVITIES::VIEW'
      }
    ];
  }

  RolesPermissions (): Array<IPermission> {
    return [
      {
        title: 'Vista de Roles',
        group: 'ROLES',
        key: 'ROLES::VIEW'
      }
    ];
  }


  WidgetsPermissions (): Array<IPermission> {
    return [
      {
        group: 'WIDGETS',
        key: 'WIDGETS::CREATE',
        title: 'Create widget'
      },
      {
        group: 'WIDGETS',
        key: 'WIDGETS::UPDATE',
        title: 'Update widget info'
      },
      {
        group: 'WIDGETS',
        key: 'WIDGETS::CHANGE',
        title: 'Change widgets output'
      },
      {
        group: 'WIDGETS',
        key: 'WIDGETS::VIEW',
        title: 'View widgets'
      }
    ];
  }

  getAll (): Array<IPermission>  {
    return this.DevicesPermissions()
      .concat(this.UsersPermissions())
      .concat(this.LocationsPermissions())
      .concat(this.RolesPermissions())
      .concat(this.ActivitiesPermissions())
      .concat(this.WidgetsPermissions());
  }

  findByKey (key: string) {
    return this.getAll().find(x => x.key === key);
  }

}
