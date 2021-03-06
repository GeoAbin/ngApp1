import { Component, OnInit } from '@angular/core';
import {Video} from './../video'
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  videos: any

  selectedVideo:Video
  public hidenewVideo:boolean=true

  constructor(private videoService:VideoService) { }

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(videofetched=> this.videos=videofetched)
  }

  onSelectVideo(video:any)
  {
    this.selectedVideo=video
    this.hidenewVideo=true
    console.log(this.selectedVideo)
  }

   newVideo()
   {
     this.hidenewVideo=false
   }

  onSubmitAddVideo(video:any)
  {
    this.videoService.addVideo(video).subscribe(videoAdded=>{this.videos.push(videoAdded);
      this.hidenewVideo=true;
      console.log(videoAdded);
    });
  }

  onUpdateVideoEvent(video:any)
  {
    this.videoService.updateVideo(video).subscribe(resUpdatedVideo=>video=resUpdatedVideo)
    this.selectedVideo=null
    console.log(video)
  }

  onDeleteVideoEvent(video:any)
  {
    let videoArray=this.videos
    this.videoService.deleteVideo(video).subscribe(resDeletedVideo=>{
      for(let i=0;i<videoArray.length;i++)
      {
        if(videoArray[i]._id===video._id)
        videoArray.splice(i,1)
      }
    })
    this.selectedVideo=null
  }
}
