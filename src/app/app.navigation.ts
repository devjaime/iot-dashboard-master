import { environment } from 'environments/environment';
export const navigation = [
  {
    link: '/index',
    icon: 'icon-home',
    title: 'Home',
    class: 'home'
  },
  {
    icon: 'icon-devices_other',
    title: 'Dispositivos',
    permissions: ['DEVICES::VIEW'],
    class: 'device',
    auth: true,
    children: [
      {
        link: '/device/create',
        icon: '',
        title: 'Crear un Dispositivo',
        permissions: ['DEVICES::VIEW'],
        auth: true,
        class: 'device-create'
      },
      {
        link: '/devices',
        icon: '',
        title: 'Lista de dispositivos',
        permissions: ['DEVICES::VIEW'],
        auth: true,
        class: 'device-list'
      }
    ]
  },
  {
    icon: 'icon-location_searching',
    title: 'Localización',
    class: 'location',
    children: [
      {
        link: '/location/new',
        icon: '',
        title: 'Crear una localización',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'location-create'
      },
      {
        link: '/locations',
        icon: '',
        title: 'Ver ubicaciones',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'location-list'
      },
    ]
  },
  {
    icon: 'icon-visibility',
    title: 'Supervisión',
    class: 'monitoring',
    children: [
      {
        link: '/monitoring/manage-contacts',
        icon: '',
        title: 'Gestionar contactos',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'manage-contacts'
      },
    ]
  },
  {
    icon: 'icon-verified_user',
    title: 'Usuarios y acceso',
    class: 'users-access',
    children: [
      {
        link: '/roles',
        icon: '',
        title: 'Lista de roles',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'roles-list'
      },
    ]
  },
  ! environment.production ? {
    link: '/gallery',
    icon: 'icon-attach_file',
    title: 'Galería',
    permissions: ['USERS::VIEW'],
    auth: true,
    class: 'gallery'
  } : null,
  {
    title: 'Integración',
    icon: 'icon-link',
    children: [
      {
        link: '/token',
        icon: 'icon-settings',
        title: 'Access tokens',
        class: 'settings',
        auth: true
      },
      {
        // link: '/docs',
        icon: 'icon-help',
        title: 'Documentos',
        class: 'docs',
        children: [
          {
            title: 'Introducción',
            class: 'docs-introduction',
            link: '/docs'
          },
          {
            title: 'Restful API',
            class: 'docs-restful-api',
            link: '/docs/restful-api'
          },
          {
            title: 'Enviando Información',
            class: 'docs-sending-information',
            link: '/docs/sending-information-over-https'
          },

        ]
      },
    ]
  },
  ! environment.production ? {
    icon: 'icon-fingerprint',
    title: 'Experimental',
    class: 'experimental',
    children: [
      {
        link: '/experimental',
        title: 'Introducción',
        class: 'introduction',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
      },
      {
        link: '/gps',
        icon: '',
        title: 'Localización GPS',
        permissions: ['LOCATIONS::VIEW'],
        auth: true,
        class: 'gps-location'
      },
    ]
  } : null,
  {
    link: '/login',
    icon: 'icon-power_settings_new',
    title: 'Logout',
    class: 'logout'
  }
];
