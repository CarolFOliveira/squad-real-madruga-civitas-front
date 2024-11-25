import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  styleUrls: ['./student-chart.component.scss'],
})
export class StudentChartComponent implements OnInit {
  public chartOptions!: Partial<ApexOptions>;

  public ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Mês anterior',
          color: '#D0BCFF',
          data: [2, 4, 2],
        },
        {
          name: 'Mês atual',
          color: '#65558F',
          data: [3, 3, 3],
        },
      ],
      chart: {
        type: 'bar',
        height: 425,
        toolbar: {
          show: false,
        },
        animations: {
          speed: 275,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadiusApplication: 'end',
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'Desenvolvimento acadêmico',
          'Inteligência emocional',
          'Responsabilidade',
        ],
        labels: {
          style: {
            fontSize: 'clamp(11px, 1vw, 14px)',
          },
        },
      },
      yaxis: {
        max: 5,
        labels: {
          offsetX: -15,
        },
      },
      legend: {
        fontSize: '15px',
        height: 50,
      },
      grid: {
        borderColor: '#2222220c',
        padding: {
          right: 0,
          left: 0,
        },
      },
    };
  }
}
