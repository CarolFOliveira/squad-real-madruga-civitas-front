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
        { name: 'Mês anterior', data: [4, 3, 2] }, //TODO: trazer dados do backend
        { name: 'Mês atual', data: [3, 4, 5] },
      ],
      chart: {
        type: 'bar',
        height: 425,
        toolbar: {
          show: false,
        },
        animations: {
          easing: 'easeinout',
          speed: 1,
          dynamicAnimation: {
            speed: 250,
          },
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
      colors: ['#65558F', '#D0BCFF'],
      legend: {
        height: 50,
        offsetY: 10,
        fontSize: 'clamp(11px, 1vw, 14px)',
      },
      dataLabels: { enabled: false },
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
      grid: {
        borderColor: '#2222220c',
        padding: {
          right: 0,
          left: 0,
        },
      },
      responsive: [
        {
          breakpoint: 598,
          options: {
            xaxis: {
              labels: {
                formatter: function (value: string) {
                  return value === 'Desenvolvimento acadêmico'
                    ? 'Desenv. acadêmico'
                    : value;
                },
                rotateAlways: true,
              },
            },
          },
        },
      ],
    };
  }
}
