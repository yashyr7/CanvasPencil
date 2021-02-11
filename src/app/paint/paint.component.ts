import { Component, OnInit } from '@angular/core';
import {fabric} from 'fabric';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css'],
})
export class PaintComponent implements OnInit {
  name = firebase.auth().currentUser.displayName;
  canvas: any;
  brushColor: any;
  uid = firebase.auth().currentUser.uid;

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.width = 5;
    this.brushColor = '#00FFFF'; 
    this.canvas.freeDrawingBrush.color = this.brushColor;
    this.canvas.setWidth(window.innerWidth * 0.975);
    this.canvas.setHeight(window.innerHeight * 0.827);
    this.canvas.add(new fabric.Text(" Welcome " + this.name + "!\n Drawing mode enables you to draw anything freely.\n Click Choose File button to upload a picture and edit it.\n You can exit drawing mode to resize and rotate elements.\n Click clear to clean everything on the canvas.\n Happy Drawing!",
    {
      fontSize: 30,
      fontFamily: "Helvetica",
      top: 20,
      left: 10
    }));
  }

  clearCanvas() {
    this.canvas.clear();
    document.getElementById("toggle-eraser").innerHTML = "Eraser";
    this.canvas.mode = 'pencil';
    this.canvas.freeDrawingBrush.width = 5;
    this.canvas.freeDrawingBrush.color = this.brushColor;
  }

  eraser() {
    let mode = document.getElementById("toggle-eraser").innerHTML;
    if (mode == "Pencil") {
      document.getElementById("toggle-eraser").innerHTML = "Eraser";
      this.canvas.mode = 'pencil';
      this.canvas.freeDrawingBrush.width = 5;
      this.canvas.freeDrawingBrush.color = this.brushColor;
    } else if (mode == "Eraser") {
      document.getElementById("toggle-eraser").innerHTML = "Pencil";
      this.canvas.mode = 'pencil';
      this.canvas.freeDrawingBrush.width = 15;
      this.canvas.freeDrawingBrush.color = 'white';
      
    }
  }

  toggleDrawingMode() {
    let mode = document.getElementById("toggle-drawing-mode").innerHTML;
    if (mode == "Exit Drawing Mode") {
      this.canvas.isDrawingMode = false;
      document.getElementById("toggle-drawing-mode").innerHTML = "Enter Drawing Mode";
    } else if (mode == "Enter Drawing Mode") {
      this.canvas.isDrawingMode = true;
      document.getElementById("toggle-drawing-mode").innerHTML = "Exit Drawing Mode";
    }
  }

  changeColor (event) {
    this.brushColor = event.target.value
    this.canvas.freeDrawingBrush.color = this.brushColor;
  }

  uploadImage(event) {
    let inputImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(inputImage);
    reader.onload = (e)=>{
      fabric.Image.fromURL(reader.result as string, (oImg) => {
        oImg.scaleToWidth(300);
        oImg.scaleToHeight(300);
        this.canvas.add(oImg);
        this.canvas.centerObject(oImg);
      });
    }
    inputImage = null;
    event.target.files = null;
    event = null;
  }

  realTime() {
    console.log("wagwawn");
    firebase.database().ref('users/' + this.uid).set({
      canvas : JSON.stringify(this.canvas)
    });
  }
}
