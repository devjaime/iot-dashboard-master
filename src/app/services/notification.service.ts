import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { CloudDevice, ILocation, AppState, INotification, IRole } from '@app/definitions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {

  constructor(
    private toaster: ToasterService,
    private store: Store<AppState>,
    private translation: TranslateService,
  ) { }

  private StoreNotification (notification: INotification) {
    notification.title = this.translation.get(notification.title)['value'];
    notification.message = this.translation.get(notification.message)['value'];
    this.store.dispatch({
      type: 'INSERT_NOTIFICATION',
      payload: notification
    });
    this.toaster.popAsync(notification.type, notification.title , notification.message);
  }
  public InvokePasswordReset () {
    const notification: INotification = {
      message: 'Su contraseña ha sido restablecida con éxito.',
      status: 'icon-vpn_key',
      date: new Date(),
      title: 'Restablecimiento de contraseña',
      type: 'success'
    };
    this.toaster.popAsync(notification.type, notification.title, notification.message);
  }
  public InvokeUserSignup () {
    const title = 'Signup successful';
    const message = 'Bienvenido a tu tablero. Lea las presentaciones en Integración> Documentos para obtener más información..';
    this.StoreNotification({
      title,
      type: 'success',
      status: 'icon-exit_to_app',
      date: new Date(),
      message
    });
  }

  public InvokeDeviceCreate (device: CloudDevice) {
    const title = 'Dispositivo creado con éxito ';
    this.StoreNotification({
      title,
      type: 'success',
      status: 'icon-add_circle',
      date: new Date(),
      message: device.name
    });
  }
  public InvokeRoleUpdate (role: IRole) {
    const title = 'Actualización de roles con éxito';
    this.StoreNotification({
      title,
      type: 'success',
      status: 'icon-add_circle',
      date: new Date(),
      message: role.title
    });
  }
  public InvokeRoleCreate (role: IRole) {
    const title = 'Rol creado con éxito';
    this.StoreNotification({
      title,
      type: 'success',
      status: 'icon-add_circle',
      date: new Date(),
      message: role.title
    });
  }

  public InvokeDeviceUpdate (device: CloudDevice) {
    const title = 'Dispositivo editado!';
    this.StoreNotification({
      title,
      type: 'success',
      status: 'icon-mode_edit',
      date: new Date(),
      message: device.name
    });
  }
  public InvokeRoleDelete (role: IRole) {
    this.StoreNotification({
      title: 'Su rol eliminado',
      type: 'error',
      status: 'icon-remove_circle',
      date: new Date(),
      message: role.title
    });
  }
  public InvokeDeviceDelete (device: CloudDevice) {
    this.StoreNotification({
      title: 'Su dispositivo fue eliminado',
      type: 'error',
      status: 'icon-remove_circle',
      date: new Date(),
      message: device.name
    });
  }
  public InvokeLocationDelete (location: ILocation) {
    this.StoreNotification({
      title: 'Su ubicación fue eliminada',
      type: 'error',
      status: 'icon-remove_circle',
      date: new Date(),
      message: location.name
    });
  }
  public InvokeContactsUpdate() {
    this.StoreNotification({
      title: 'Los detalles de contacto se han actualizado y se usarán de manera efectiva',
      type: 'success',
      status: 'icon-mode_edit',
      date: new Date()
    });
  }
  public InvokeLocationUpdate (location: ILocation) {
    this.StoreNotification({
      title: 'Tu ubicación ha sido actualizada',
      type: 'success',
      status: 'icon-mode_edit',
      date: new Date(),
      message: location.name
    });
  }
  public InvokeLocationCreate (location: ILocation) {
    this.StoreNotification({
      title: 'Ubicación creada con éxito',
      type: 'success',
      status: 'icon-add_circle',
      date: new Date(),
      message: location.name
    });
  }
  public InvokeProfileUpdate() {
    this.StoreNotification({
      title: 'Perfil actualizado',
      type: 'success',
      status: 'icon-account_box',
      date: new Date(),
      message: 'Sus cambios de perfil se han guardado. Algunos de los cambios pueden afectar en el siguiente inicio de sesión.'
    });
  }
  public InvokeSocketConnect () {
    this.StoreNotification({
      title:  'Servidor',
      type: 'success',
      status: 'icon-dns',
      date: new Date(),
      message: 'Ahora estás conectado'
    });
  }
  public InvokeRoomConnect () {
    this.StoreNotification({
      title:  'Entorno privado',
      type: 'success',
      status: 'icon-cloud_done',
      date: new Date,
      message: 'Estás dentro de tu entorno privado ahora'
    });
  }
}
