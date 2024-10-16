import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * LoginComponent
 * Componente de login para diferentes tipos de usuários.
 * @param img = url da imagem a ser exibida;
 * @param alt = descrição da imagem, para ser inserida no atributo alt
 * @param h4Text1 = Texto a ser exibido;
 * @param h4Text2 = Texto a ser exibido;
 * @param placeholder = Texto que será atribuído ao placeholder do elemento input;
 * @param inputId= Id do elemento input;
 * @param btnId=Id do botão;
 * @param errorText = Texto da mensagem de erro;
 * @param professorRoute = Rota para a navegação do professor após login bem-sucedido;
 * @param responsavelRoute = Rota para a navegação do responsável após login bem-sucedido.
 * @param userType = Tipo de usuário ('professor' ou 'responsavel').
 * 
 */


export class LoginComponent {
  @Input() img = '';
  @Input() alt = '';
  @Input() h4Text1 = '';
  @Input() h4Text2 = '';
  @Input() placeholder = '';
  @Input() inputId = '';
  @Input() btnId = '';
  @Input() errorText = '';
  @Input() professorRoute = '';
  @Input() responsavelRoute = "";
  @Input() userType = ''; 

  matricula= '';
  matriculaInvalid = false;

  constructor(private router: Router) {}

/**
   * onSubmit()
   * 
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
        this.router.navigate([this.professorRoute]); // Navega para a rota indicada
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
   * matriculaIsValid()
   * 
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
