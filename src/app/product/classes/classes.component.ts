import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  subCourses;
  listOfCategory;
  listOfSubCategory
  checkLang  
  showFilter
  hideme= []
  courses: any
  Courseloading: boolean;
  showCourses: boolean= false
  ClassDetails
  teacherDetails
  timeTables
  IsSubscribed
  courseId
  teachPath="http://nativeacademydashboard.native-tech.co/Images/TeacherImages/" 
  constructor(private activeRoute:ActivatedRoute,
    private productService:ProductService,
    private toastr: ToastrService,private homeService:HomeService, private router: Router) { 
  }

  ngOnInit(): void {
    this.homeService.getCategories().subscribe((res:any) => {
      this.listOfCategory= res.model
    })

    this.checkLang= localStorage.getItem('currentLanguage') || 'en'
  }
 
  selectCatgory(e) {
    this.homeService.getSubCategories(e).subscribe((res: any) => {  
     this.listOfSubCategory= res.model
    })
  }
  selectSubCatgory(e) {
    this.Courseloading= true
    this.homeService.getAllCoursesBySubCategoryId(e).subscribe((res:any) => {
      this.courses= res.model
      this.showCourses= true
      this.Courseloading= false
    })
  }
  selectClass(e) {
    this.productService.getCourseData(e).subscribe((res:any) => {
      this.ClassDetails= Object.keys(res.model);
      this.teacherDetails= res.model.Teacher
      this.timeTables= res.model.TimeTables
      this.IsSubscribed= res.model.IsSubscribed
      this.courseId= res.model.Id
      console.log("res",this.courseId)
    })
  }
  selectReserve(e) {
    console.log(e,"dkdkdkdkd")
    this.productService.subscribeClass(e).subscribe((res: any)=> {
      this.toastr.success('subscribed successfully')
      this.router.navigate(['product/classes-details'])
    }, err=> {
      console.log(err)
    })
  }
  show() {
    this.showFilter = true
  }
  close() {
    this.showFilter = false
  }  

}
