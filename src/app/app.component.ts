import { Component, ElementRef, ViewChild } from '@angular/core';
import { load } from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-object-detection',
  templateUrl: './object-detection.component.html',
  styleUrls: ['./object-detection.component.css']
})
export class ObjectDetectionComponent {
  @ViewChild('canvas') canvas: ElementRef | undefined;

  isLoading: boolean = false;

  predictions: any[] = [];

  async detectObjects(event: any) {
    // Set isLoading to true to show loading spinner
    this.isLoading = true;

    // Load COCO-SSD model
    const model = await load();

    // Load image from input element
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;

    // Wait for image to load
    await new Promise<void>(resolve => {
      img.onload = () => {
        resolve();
      };
    });
    // Convert image to tensor
    const tfImage = tf.browser.fromPixels(img);
    // Run object detection on image
    const predictions = await model.detect(tfImage);

    // Draw bounding boxes on image using Canvas API
    const canvas = this.canvas?.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, 100, 300);
    ctx.drawImage(img, 0, 0);
    ctx.font = '16px Arial';
   
    predictions.forEach(prediction => {
      // Draw bounding box
      ctx.beginPath();
      ctx.rect(...prediction.bbox);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'blue';
      ctx.fillStyle = 'white';
      ctx.stroke();
      ctx.fillText(
        `${prediction.class} (${prediction.score.toFixed(2)})`,
        prediction.bbox[0],
        prediction.bbox[1],
      );
    });
    this.predictions = predictions;
    console.log(predictions)

    // Set isLoading to false to hide loading spinner
    this.isLoading = false;
  }
}
