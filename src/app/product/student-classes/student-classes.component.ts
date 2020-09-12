import { ProductService } from './../../shared/services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.scss']
})
export class StudentClassesComponent implements OnInit {
  classes
  loading: boolean
  checkLang
  imagePath= "http://nativeacademydashboard.native-tech.co/Images/CourseImages/";
  constructor(private router:Router,private productService: ProductService) { }

  ngOnInit(): void {
    this.loading= true
    this.productService.studentClasses().subscribe((res: any) => {
      this.classes= res.model
      this.loading= false
      console.log(this.classes)
    })
    this.checkLang= localStorage.getItem('currentLanguage') || 'en'
  }
  logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('CourseCommentId')
    localStorage.removeItem('courseId')
    this.router.navigate(['home'])
  }
}
