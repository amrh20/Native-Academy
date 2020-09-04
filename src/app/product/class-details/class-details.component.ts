import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/shared/services/home.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  comments: any;
  ClassId: any;
  show= 0
  coursdetails: any;
  reviews: any;
  hideme= []
  errorComment: string
  errorReview: string
  errorReply: string
  errorMsg: string
  replyLoading: boolean
  commentLoading: boolean
  reviewLoading: boolean
  checkLang
  tester: boolean
  showReplyInput: boolean= true
  newarray: any[]= []
  videos
  url
  timeTables
  textValue = 'initial value'
  pathImage="http://novoduxapi.native-tech.co/Images/StudentImages/"
  reviewform = new FormGroup({
    reviewComment: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
  });
  urlSafe: SafeResourceUrl;
  @ViewChild('replyInput') replyInput:ElementRef; 
  
  @ViewChild('fondovalor') fondovalor:ElementRef; 
  form = new FormGroup({
    comment: new FormControl('', Validators.required)
  });
  replyform = new FormGroup({
   reply: new FormControl('',Validators.required)
  })
  navLinks = ["videos","comments","reviews","exams","time table"]
  constructor(private activeRoute: ActivatedRoute, private homeService: HomeService, private productService: ProductService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(parm => {
      let id =parm.id
      localStorage.setItem('classId',id)
      this.homeService.getCourseDetails(id).subscribe((res: any) => {
        console.log(res.model)
        this.timeTables=res.model.TimeTables
      })

      this.productService.getComments(id).subscribe((res:any) => {
        this.comments= res.model
      })
      this.productService.getReviews(id).subscribe((res: any) => {
        this.reviews = res.model;
      })
    })
    this.ClassId= localStorage.getItem('classId')
    
  }
  addReview() {
    this.reviewLoading = true
    const CourseRateValue = this.reviewform.value.rating
    const Comment = this.reviewform.value.reviewComment
    const CourseId = Number(localStorage.getItem('courseId'))
    this.productService.addReviews(CourseRateValue, Comment, CourseId).subscribe(res => {
      this.toastr.success('your review added successfully')
      this.reviewform.reset()
      window.location.reload();
      this.reviewLoading = false
    }, err => {
      console.log(err)
      this.reviewLoading = false
      if (err.error.errors.message === "Authorization has been denied for this request") {
        this.errorReview = "please log in first"
        this.reviewform.reset()
      }
      else if (err.error.errors.message === "Student not enrolled in this course") {
        this.errorReview = "Student not enrolled in this course"
        this.reviewform.reset()
      }
      else {
        this.toastr.error("something error")

      }
    })
  }
  text(t) {
    this.show= t
  }
   // comments
 get comment() {
  return this.form.get('comment')
}
addcomment() {
 this.commentLoading =true
 let  CourseId= Number(localStorage.getItem('courseId'))
 let  Comment = this.form.value.comment;
 let id= localStorage.getItem("courseId")
 this.productService.addComment(CourseId,Comment).subscribe((res: any) => {
   this.form.reset()
   this.toastr.success('your comment added successfully');
   this.commentLoading= false
   this.productService.getComments(id).subscribe((res:any) => {
    this.comments= res.model
  })
 },err => {
  this.toastr.error("something error")
  this.commentLoading= false
 if (err.error.Message =="Authorization has been denied for this request.") {
  this.errorComment= "please log in first"
  this.form.reset()
 }
 })
}
//  replys
get reply() {
return this.replyform.get('reply')
}

addreply() {
this.replyLoading= true
let  CourseCommentId= Number(localStorage.getItem('CourseCommentId'))
let  ReplyText = this.replyform.value.reply;
let id= localStorage.getItem("courseId")
this.productService.addreply(CourseCommentId,ReplyText).subscribe(res => {
   this.toastr.success('your comment added successfully');
   this.replyform.reset()
   this.replyLoading =false
  this.productService.getComments(id).subscribe((res:any) => {
    this.comments= res.model
  })
  //  this.productService.getComments().subscribe()
},err => {
  this.toastr.error("something error")
  this.replyLoading =false
  if (err?.error?.errors?.message == "Invalid Parametrs") {
   this.errorReply= "please select the comment first that you want to reply for"
  }
  if (err?.error?.Message=="Authorization has been denied for this request.") {
    this.errorReply= "please login first"
  }
  this.replyform.reset()
})
}
selectOption(e) {
  localStorage.setItem('CourseCommentId',e)
 }
}
