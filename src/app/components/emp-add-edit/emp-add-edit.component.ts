import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  educations: string[] = [
    'Matric',
    'Deploma',
    'Intermediate',
    'Graduation',
    'Post Graduation',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeesService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              // alert('Data Updated Successfully');
              this._coreService.openSnackBar(
                'Data Updated Successfully',
                'Done'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee Added Successfully');
            this._coreService.openSnackBar(
              'Employee Added Successfully',
              'Done'
            );
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
