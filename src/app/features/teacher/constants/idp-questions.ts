interface IQuestionGroups {
  name: string;
  title: string;
  formName: string;
  questions: {
    name: string;
    text: string;
  }[];
}

export const idpQuestion: IQuestionGroups[] = [
  {
    name: 'Área 1',
    title: 'Desenvolvimento Acadêmico',
    formName: 'firstFormGroup',
    questions: [
      {
        name: 'interestEngagement',
        text: 'Nível de interesse e engajamento nas atividades de sala de aula:',
      },
      {
        name: 'performanceTests',
        text: 'Desempenho em testes e atividades avaliativas:',
      },
      {
        name: 'concentrationAbility',
        text: 'Capacidade de concentração durante as aulas:',
      },
      {
        name: 'deadlineSkills',
        text: 'Habilidade em cumprir com prazos e trabalhos escolares:',
      },
      {
        name: 'contentProgress',
        text: 'Progresso no domínio dos conteúdos do currículo:',
      },
    ],
  },
  {
    name: 'Área 2',
    title: 'Inteligência Emocional',
    formName: 'secondFormGroup',
    questions: [
      {
        name: 'frustrationTolerance',
        text: 'Capacidade de lidar com frustrações e desafios:',
      },
      {
        name: 'emotionExpression',
        text: 'Expressão adequada de emoções em diferentes situações:',
      },
      {
        name: 'conflictResolution',
        text: 'Habilidade em resolver conflitos com colegas de forma pacífica:',
      },
      {
        name: 'adaptationAbility',
        text: 'Capacidade de adaptação a mudanças na rotina ou no ambiente escolar:',
      },
      {
        name: 'empathyRespect',
        text: 'Empatia e respeito pelos sentimentos dos colegas e professores:',
      },
    ],
  },
  {
    name: 'Área 3',
    title: 'Responsabilidade',
    formName: 'thirdFormGroup',
    questions: [
      {
        name: 'punctuality',
        text: 'Pontualidade e assiduidade nas atividades escolares:',
      },
      {
        name: 'taskCompletion',
        text: 'Cumprimento de tarefas individuais e em grupo:',
      },
      {
        name: 'materialOrganization',
        text: 'Capacidade de manter materiais e pertences organizados:',
      },
      {
        name: 'collectiveResponsibility',
        text: 'Participação em atividades de responsabilidade coletiva, como limpeza da sala ou atividades de grupo:',
      },
      {
        name: 'schoolRulesRespect',
        text: 'Respeito pelas regras e normas da escola:',
      },
    ],
  },
];
