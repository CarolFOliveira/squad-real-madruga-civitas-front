import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';
import { EntityService } from '../../services/entity.service';

enum AcademicYear {
  YEAR_1 = '1º ano',
  YEAR_2 = '2º ano',
  YEAR_3 = '3º ano',
  YEAR_4 = '4º ano',
  YEAR_5 = '5º ano',
  YEAR_6 = '6º ano',
}

enum EducationLevel {
  NURSERY = 'Maternal',
  PRESCHOOL = 'Pré-escola',
  ELEMENTARY = 'Ensino fundamental 1',
}

enum ClassPeriod {
  MORNING = 'Manhã',
  AFTERNOON = 'Tarde',
  EVENING = 'Noite',
}

@Component({
  selector: 'app-classroom-upsert',
  templateUrl: './classroom-upsert.component.html',
  styleUrls: ['./classroom-upsert.component.scss'],
})
export class ClassroomUpsertComponent implements OnInit {
  academicYearOptions = this.enumToSelectOptions(AcademicYear);
  educationLevelOptions = this.enumToSelectOptions(EducationLevel);
  classPeriodOptions = this.enumToSelectOptions(ClassPeriod);

  isEditMode = false;
  classroomId: number | null = null;

  public form = new FormGroup(
    {
      academicYear: new FormControl('', Validators.required),
      classPeriod: new FormControl('', Validators.required),
      educationLevel: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
    },
    { updateOn: 'blur' }
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _entityService: EntityService
  ) {}

  public ngOnInit(): void {
    this.loadClassroomData();
  }

  public onSubmit($event: SubmitEvent) {
    $event.preventDefault();

    console.log(this.form.value);
  }

  /**
   * enumToSelectOptions
   *
   * Converte um enum em um array de objetos do tipo {@link ISelectOptions}.
   *
   * @param enumObj - O enum que será convertido. É restrito a um `Record<string, string>`
   * @returns Um array de objetos do tipo {@link ISelectOptions}
   * @example
   * ```ts
   * enum EducationLevel {
   *   PRESCHOOL = 'Pré-escola',
   * }
   *
   * const options = this.enumToSelectOptions(EducationLevel);
   * // Resultado: [{ value: 'Pré-escola', viewValue: 'Pré-escola' }]
   * ```
   */
  private enumToSelectOptions(
    enumObj: Record<string, string>
  ): ISelectOptions[] {
    return Object.values(enumObj).map((value) => ({ value, viewValue: value }));
  }

  private async loadClassroomData() {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    const classroomId = Number(id);
    this.classroomId = classroomId;
    this.isEditMode = true;

    try {
      const classroom = (await this._entityService.getEntity({
        endpoint: ApiEndpoints.CLASSROOMS,
        id: classroomId,
      })) as any; // TODO: remover any

      this.form.patchValue({
        academicYear: classroom.anoLetivo,
        classPeriod: classroom.periodoLetivo,
        educationLevel: classroom.ensino,
        alias: classroom.turmaApelido,
      });
    } catch (error) {
      // TODO: mostrar toast
    }
  }
}
