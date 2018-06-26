import { Component, OnInit } from '@angular/core';
import { SidebarControllerService } from '../ngx-sidebar/sidebar-controller.service';
import { navigation } from '@app/app.navigation';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  public sideState = true;
  public keepOpen = false;
  public navigation: Array<any> = navigation;

  public nav2 = [
    {
      link: '/home',
      icon: 'icon-home',
      title: 'Home',
      active: true,
    },
    {
      link: '/devices',
      icon: 'icon-devices_other',
      title: 'Dispositivo',
    },
    {
      icon: 'icon-widgets',
      title: 'Widgets',
      children: [
        {
          link: '/activities',
          title: 'Actividades',
        },
        {
          title: 'Elementos de forma',
          children: [
            {
              title: 'Roles y permisos',
              children: [
                {
                  link: '#',
                  title: 'Actividades',
                },
                {
                  link: '/formelements',
                  title: 'Elementos de forma',
                },
                {
                  link: '#',
                  title: 'Logout',
                }
              ]
            }, {
              link: '#',
              title: 'Widgets',
            },
          ]
        },
        {
          link: '#',
          title: 'Logout',
        }
      ]
    },
    {
      link: '#',
      icon: 'icon-attach_file',
      title: 'Subir archivo',
    },
    {
      icon: 'icon-person_outline',
      title: 'Usuarios',
      children: [
        {
          title: 'Roles y permisos',
          children: [
            {
              link: '#',
              title: 'Actividades',
            },
            {
              link: '#',
              title: 'Elementos de forma',
            },
            {
              link: '#',
              title: 'Logout',
            }
          ]
        }
      ]
    },
    {
      link: '#',
      icon: 'icon-accessibility',
      title: 'Roles y permisos',
    },
    {
      link: '/locations',
      icon: 'icon-location_searching',
      title: 'Localización',
    },
    {
      link: '#',
      icon: 'icon-event_note',
      title: 'Actividades',
    },
    {
      link: '/login',
      icon: 'icon-exit_to_app',
      title: 'Logout',
    }
  ];
  constructor(public sidebar: SidebarControllerService) {
    this.sidebar.ToggleSidebar.subscribe((e) => {
      if (e === 'hidden' && !this.keepOpen) {
        this.sideState = false;
        return;
      } else if ( e === 'show') {
        this.sideState = true;
        return;
      }
      this.sideState = (this.sideState) ? false : true;
    });
  }

  ngOnInit() {
    if (window.innerWidth < 992) {
      this.sideState = false;
    }
  }

}
