import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-embedded-video',
  standalone: false,

  templateUrl: './embedded-video.component.html',
  styleUrl: './embedded-video.component.css'
})
export class EmbeddedVideoComponent implements OnInit, OnDestroy {

  @Input() key: string | null = null;
  videoUrl: SafeResourceUrl = "";
  destroy$ = new Subject<void>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.buildYoutubeVideoUrl());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildYoutubeVideoUrl(): string {
    return `https://www.youtube.com/embed/${this.key}`;
  }

}
