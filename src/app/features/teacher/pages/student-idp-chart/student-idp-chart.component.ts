import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-student-idp-chart',
  templateUrl: './student-idp-chart.component.html',
  styleUrls: ['./student-idp-chart.component.scss'],
})
export class StudentIdpChartComponent implements OnInit {
  public chartOptions!: Partial<ApexOptions>;

  public ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Mês anterior',
          data: [2, 3, 2],
          color: '#65558F',
        },
        {
          name: 'Mês atual',
          data: [4, 3, 4],
          color: '#D0BCFF',
        },
      ],
      chart: {
        type: 'bar',
        height: 350,

        toolbar: {
          show: false,
        },
        animations: {
          speed: 400,
        },
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 6,
        },
      },
      colors: ['#FF5733', '#33B5E5'],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'Desenvolvimento acadêmico',
          'Inteligência emocional',
          'Responsabilidade',
        ],
      },
      yaxis: {
        max: 5,
      },
    };
  }
}
