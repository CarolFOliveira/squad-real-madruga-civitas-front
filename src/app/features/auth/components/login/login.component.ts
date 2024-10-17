import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * LoginComponent
 * Componente de login para diferentes tipos de usuários.
 * @example
 * `<app-login></app-login>`
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /** URL da imagem a ser exibida */
  @Input() img = '';
  /**Descrição da imagem, para ser inserida no atributo alt */
  @Input() alt = '';
  /**Texto a ser exibido */
  @Input() h4Text1 = '';
  /**Texto a ser exibido */
  @Input() h4Text2 = '';
  /**Texto que será atribuído ao placeholder do elemento input */
  @Input() placeholder = '';
  /**Identificação do elemento input */
  @Input() inputId = '';
  /**Identificação do botão */
  @Input() btnId = '';
  /**Texto da mensagem de erro */
  @Input() errorText = '';
  /**Rota para a navegação do professor após login bem-sucedido */
  @Input() professorRoute = '';
  /**Rota para a navegação do responsável após login bem-sucedido */
  @Input() responsavelRoute = '';
  /**Tipo de usuário ('professor' ou 'responsavel') */
  @Input() userType = '';

  matricula = '';
  matriculaInvalid = false;
  /**
   * Construtor que injeta o serviço Router.
   * @param router O serviço Router para navegação.
   */
  constructor(private router: Router) {}

  /**
   * onSubmit()
   * Responsável pelo do formulário. Verifica se o formulário e a matrícula são válidos e navega para a rota correta com base no tipo de usuário.
   * @param event O evento de submissão do formulário.
   * @param loginForm O formulário de login.
   */
  onSubmit(event: Event, loginForm: NgForm) {
    event.preventDefault();
    if (loginForm.valid && this.matriculaIsValid(this.matricula)) {
      this.matriculaInvalid = false;
      if (this.userType === 'professor') {
        this.storeProfessorLogin(this.matricula);
        console.log('Formulário enviado!', this.matricula);
        this.router.navigate([this.professorRoute]);
      } else if (this.userType === 'responsavel') {
        this.storeResponsavelLogin(this.matricula);
        console.log('Formulário enviado!', this.matricula);
        this.router.navigate([this.responsavelRoute]);
      }
    } else {
      this.matriculaInvalid = true;
      console.error('Número de matrícula está incorreto');
    }
  }
  /**
   * matriculaIsValid()   *
   * Verifica se a matrícula é válida.
   * @param matricula O número de matrícula a ser validado.
   * @returns True se a matrícula é válida, false caso contrário.
   */
  matriculaIsValid(matricula: string): boolean {
    return matricula.trim().length > 0;
  }

  /**
   * storeProfessorLogin()
   * Armazena localmente o login do professor.
   * @param matricula O número de matrícula do professor.
   */
  storeProfessorLogin(matricula: string) {
    localStorage.setItem('professorMatricula', matricula);
  }
  /**
   * storeResponsavelLogin()
   * Armazena localmente o login do responsavel.
   * @param matricula O número de matrícula do professor.
   */
  storeResponsavelLogin(matricula: string) {
    localStorage.setItem('responsavelMatricula', matricula);
  }
}
