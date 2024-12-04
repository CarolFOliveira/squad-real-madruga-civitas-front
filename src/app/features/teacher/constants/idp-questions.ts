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
        name: 'concentrationAbility',
        text: 'Capacidade de concentração durante as aulas:',
      },
      {
        name: 'activeParticipation',
        text: 'Participação ativa em discussões em sala de aula:',
      },
      {
        name: 'practicalApplication',
        text: 'Capacidade de aplicar conceitos aprendidos em problemas práticos:',
      },
      {
        name: 'helpSeekingInitiative',
        text: 'Iniciativa em buscar ajuda para resolver dúvidas:',
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
      {
        name: 'collaborativeAttitude',
        text: 'Atitude colaborativa ao trabalhar em grupo:',
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
        name: 'collectiveResponsibility',
        text: 'Participação em atividades de responsabilidade coletiva e atividades de grupo:',
      },
      {
        name: 'schoolRulesRespect',
        text: 'Respeito pelas regras e normas da escola:',
      },
      {
        name: 'resourceResponsibility',
        text: 'Responsabilidade no uso de materiais e recursos da escola:',
      },
      {
        name: 'activityPlanning',
        text: 'Habilidade em planejar suas atividades de modo a cumprir compromissos escolares:',
      },
    ],
  },
];
