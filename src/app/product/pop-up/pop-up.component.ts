import { ProductService } from './../../shared/services/product.service';
import { HomeService } from './../../shared/services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  Courseloading
  courses: any;
  showCourses: boolean;
  showOverlay: boolean;
  checkLang: string;
  teachPath = "http://nativeacademydashboard.native-tech.co/Images/TeacherImages/"
  teacherDetails: any;
  ClassDetails: string[];
  timeTables: any;
  IsSubscribed: any;
  courseId: any;

  constructor(private homeService:HomeService, private productService: ProductService) { }

  ngOnInit(): void {
    this.checkLang = localStorage.getItem('currentLanguage') || 'en'

  }
  selectSubCatgory(e) {
    this.homeService.getAllCoursesBySubCategoryId(e).subscribe((res: any) => {
      this.courses = res.model
      this.showCourses = true
      this.Courseloading = false
      this.showOverlay= true
      console.log(this.courses.length)
    })
  }
    selectClass(e) {
    this.productService.getCourseData(e).subscribe((res: any) => {
      this.ClassDetails = Object.keys(res.model);
      this.teacherDetails = res.model.Teacher
      this.timeTables = res.model.TimeTables
      this.IsSubscribed = res.model.IsSubscribed
      this.courseId = res.model.Id
      console.log("res", this.courseId)
    })
}

}