import { Component, OnInit } from '@angular/core';
import { StudentAPIService } from '../../Services/student-api.service';
import { Student } from '../../Models/Student.model';
import { Studentdto } from '../../Models/Studentdto.model';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  filteredStudents: Student[] = [];
  selectedStudent?: Student;
  editableStudent: Student = { id: 0, firstName: '', lastName: '', mobile: '', email: '', nic: '', dateOfBirth: new Date(), address: '', imagePath: '' };
  newStudent: Student = { id: 0, firstName: '', lastName: '', mobile: '', email: '', nic: '', dateOfBirth: new Date(), address: '', imagePath: '' };
  isEdit: boolean = false;
  showModal: boolean = false;
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  sortKey: string = '';
  sortDirection: boolean = true;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  

  constructor(private studentApiService: StudentAPIService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentApiService.getStudents().subscribe(data => {
      this.students = data;
      this.filterStudents();
    });
  }

  onSelect(student: Student): void {
    this.selectedStudent = this.selectedStudent === student ? undefined : student;
  }

  onAdd(): void {
    this.editableStudent = { ...this.newStudent };
    this.isEdit = false;
    this.showModal = true;
  }

  onEdit(): void {
    if (this.selectedStudent) {
      this.editableStudent = { ...this.selectedStudent };
      this.isEdit = true;
      this.showModal = true;
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onSave(): void {
    const formData = new FormData();
    
    formData.append('firstName', this.editableStudent.firstName || '');
    formData.append('lastName', this.editableStudent.lastName || '');
    formData.append('mobile', this.editableStudent.mobile || '');
    formData.append('email', this.editableStudent.email || '');
    formData.append('nic', this.editableStudent.nic || '');
    
    if (this.editableStudent.dateOfBirth) {
      const dateOfBirth = new Date(this.editableStudent.dateOfBirth);
      if (!isNaN(dateOfBirth.getTime())) {
        formData.append('dateOfBirth', dateOfBirth.toISOString());
      }
    }
    
    formData.append('address', this.editableStudent.address || '');
    
    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    
    // Debugging: Log FormData keys and values
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    // Proceed with sending the formData via API
    if (this.isEdit && this.editableStudent.id) {
      formData.append('id', this.editableStudent.id.toString());
      this.studentApiService.updateStudent(this.editableStudent.id, formData)
        .subscribe(() => this.loadStudents(), error => console.error('Update error:', error));
    } else {
      this.studentApiService.addStudent(formData)
        .subscribe(() => this.loadStudents(), error => console.error('Add error:', error));
    }
    
    this.closeModal();
  }
  onDelete(): void {
    if (this.selectedStudent) {
      this.studentApiService.deleteStudent(this.selectedStudent.id)
        .subscribe(() => this.loadStudents());
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedStudent = undefined;
    this.editableStudent = { id: 0, firstName: '', lastName: '', mobile: '', email: '', nic: '', dateOfBirth: new Date(), address: '',imagePath: '' };
  }

  filterStudents(): void {
    this.filteredStudents = this.students.filter(student => {
      return Object.values(student).some(val =>
        val.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.sortStudents();
  }

  sortStudents(): void {
    if (this.sortKey) {
      this.filteredStudents.sort((a, b) => {
        const aValue = a[this.sortKey as keyof Student];
        const bValue = b[this.sortKey as keyof Student];
        return (aValue > bValue ? 1 : -1) * (this.sortDirection ? 1 : -1);
      });
    }
  }

  // Function to handle page change
  handlePageChange(newPage: number): void {
    this.page = newPage;
    this.filterStudents(); // Reapply filters and sorting after page change
  }

  // Function to return paginated students
  getPagedStudents(): Student[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.filteredStudents.slice(startIndex, startIndex + this.pageSize);
  }

  sort(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortKey = key;
      this.sortDirection = true;
    }
    this.sortStudents();
  }
}
