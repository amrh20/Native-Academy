import { PopUpComponent } from './../pop-up/pop-up.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/shared/services/home.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  currentRate = 4.5;
  subCourses;
  listOfCategory;
  listOfSubCategory
  checkLang
  showFilter
  hideme = []
  courses: any
  Courseloading: boolean;
  showCourses: boolean = false
  showOverlay: boolean= false
  ClassDetails
  teacherDetails
  timeTables
  IsSubscribed
  courseId
  errorLogin: string = ''
  teachPath = "http://nativeacademydashboard.native-tech.co/Images/TeacherImages/"
  constructor(private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService, private homeService: HomeService, private router: Router,public dialog: MatDialog) {
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(PopUpComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.homeService.getCategories().subscribe((res: any) => {
      this.listOfCategory = res.model
    })

    this.checkLang = localStorage.getItem('currentLanguage') || 'en'
  }

  selectCatgory(e) {
    this.homeService.getSubCategories(e).subscribe((res: any) => {
      this.listOfSubCategory = res.model
    })
  }
  selectSubCatgory(e) {
    this.Courseloading = true
    this.homeService.getAllCoursesBySubCategoryId(e).subscribe((res: any) => {
      this.courses = res.model
      this.showCourses = true
      this.Courseloading = false
      this.showOverlay= true
    })
  }
  selectClass(e) {
    this.productService.getCourseData(e).subscribe((res: any) => {
      this.ClassDetails = Object.keys(res.model);
      this.teacherDetails = res.model.Teacher
      this.timeTables = res.model.TimeTables
      this.IsSubscribed = res.model.IsSubscribed
      this.courseId = res.model.Id
    })
  }
  selectReserve(e) {
    this.productService.subscribeClass(e).subscribe((res: any) => {
      this.toastr.success('subscribed successfully')
    }, err => {
      if (err.status === 401) {
        this.errorLogin = "please login first";
      }
      else if (err.error.errors.message === "Your money in Rewards not enough") {
        this.router.navigate(['/product/payment'])
      }
      console.log(err)
    })
  }
  timeTable(e) {
    this.productService.getCourseData(e).subscribe((res: any) => {
      this.ClassDetails = Object.keys(res.model);
      this.courseId = res.model.Id
      this.timeTables = res.model.TimeTables
      this.IsSubscribed = res.model.IsSubscribed
    })
  }
  openopUp() {
    this.showOverlay= !this.showOverlay
  }
  show() {
    this.showFilter = true
  }
  close() {
    this.showFilter = false
  }

}
