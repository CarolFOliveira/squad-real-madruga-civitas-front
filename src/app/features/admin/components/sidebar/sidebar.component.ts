import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  /**
   * Define se a sidenav está aberta ou fechada.
   * @defaultValue `true`
   */
  @Input() isSidenavOpen = true;

  /**
   * Lista de itens de navegação exibidos na sidenav.
   *
   * Cada item contém uma `label`, um `link` de navegação e um `icon`.
   */
  items = [
    {
      label: 'Alunos',
      link: '/administrador/alunos',
      icon: 'contact_page',
    },
  ];
}
