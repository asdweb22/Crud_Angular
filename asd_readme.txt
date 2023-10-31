Angular Crud App Project
new line added by asd

Date: 19-10-2023
Day:Thursday
--------------------------------------------------------------


Create project first
----------------------
-ng-new crud-app
-cd crud-app
-ng serve


Added angular material:
-----------------------
step 1:->  ng add @angular/material
step 2:-> import cli of compoenents inside app.module.ts file  

--------------------------------------------------------------------------------------------

Reactive Form Module:
->   emp_add_edit.ts file
--------------------------

 empForm: FormGroup;
  educations: string[] = [
    'Matric',
    'Deploma',
    'Intermediate',
    'Graduation',
    'Post Graduation',
  ];

  constructor(private _fb: FormBuilder) {
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

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
    }
  }


-> emp_add_edit.html file
-----------------------

<form [formGroup]="empForm" (ngSubmit)="onFormSubmit()">
  <div mat-dialog-content class="content">
    <div class="row">
      <mat-form-field appearance="outline">
        <mat-label>First Name</mat-label>
        <input
          matInput
          type="text"
          placeholder="First Name"
          formControlName="firstName"
        />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Last Name</mat-label>
        <input
          matInput
          type="text"
          placeholder="Last Name"
          formControlName="lastName"
        />
      </mat-form-field>
    </div>
    <div class="row">
      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input
          matInput
          type="email"
          placeholder="Ex. example@gmail.com"
          formControlName="email"
        />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="dob" />
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </div>
    <div class="row">
      <mat-radio-group aria-label="Select an option" formControlName="gender">
        <mat-radio-button value="Male">Male</mat-radio-button>
        <mat-radio-button value="Female">Female</mat-radio-button>
      </mat-radio-group>
    </div>
    <div class="row">
      <mat-form-field appearance="outline">
        <mat-label>Education</mat-label>
        <mat-select formControlName="education">
          <mat-option *ngFor="let val of educations" [value]="val"
            >{{ val }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="example-full-width" appearance="outline">
        <mat-label>Company</mat-label>
        <input matInput placeholder="Company" formControlName="company" />
      </mat-form-field>
    </div>
    <div class="row">
      <mat-form-field class="example-full-width" appearance="outline">
        <mat-label>Experience</mat-label>
        <input matInput placeholder="Ex. 4" formControlName="experience" />
      </mat-form-field>
      <mat-form-field class="example-full-width" appearance="outline">
        <mat-label>Package</mat-label>
        <input matInput placeholder="Ex. 12" formControlName="package" />
      </mat-form-field>
    </div>
  </div>
  <div mat-dialog-actions class="action">
    <button mat-raised-button>cancel</button>
    <button mat-raised-button color="primary">Save</button>
  </div>
</form>

Note : Add angular material form compoenents api accordigly inside app.modules.ts

----------------------------------------------------------------------------------------
Date : 20-10-2023
Day :Friday

Fake json server for quick backend

install inside app:

Step 1: ->  npm install -g json-server   (json server created)
step 2: ->  json-server --watch db.json  (dummy db.json file created with dummy data) 
Step 3: -> add employees [] inside db.json (new api emdpoint created)
->E:\Briot_technologies\crud-app> ng g s services/employees

Step 4: ->Add HttpClientModule inside imports[] (app.module.ts file)
Step 5: ->services/employee.services.ts

  constructor(private _http:HttpClient) { }

  addEmployee(data:any):Observable<any>{
    return this._http.post("http://localhost:3000/employees",data)
  }

step 6: calling employee services from required compoenents

-> emp_add_edit.ts

 constructor(
    private _fb: FormBuilder,
    private _empService: EmployeesService,
    private _dialogRef: DialogRef<EmpAddEditComponent>
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

//add Employee 

  onFormSubmit() {
    if (this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee Added Successfully');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }


  --------------------------------------------------


//get All employee 

-> services/employee.services.ts
create get employees method

    getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
    }

-> app.compoenent.ts
implemets OnInit to class 

add variable in constructor ->private _empService: EmployeesService


 ngOnInit(): void {
    this.getEmployeeList();
  }    

 getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        console.log('All Empoyees List', res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  ------------------------------------------------------------------------------------
  Q.What is interceptor
-The angular interceptor is a medium connecting the backend and front-end applications.
-Interceptors help us ensure to process all HTTP requests and responses before sending or getting the request, giving us the power to manage communication.

