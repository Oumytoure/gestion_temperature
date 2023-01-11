import { Component } from '@angular/core';

@Component({
  selector: 'app-content-accueil',
  templateUrl: './content-accueil.component.html',
  styleUrls: ['./content-accueil.component.css']
})
export class ContentAccueilComponent {
//
VentilateurSrc ="../../../assets/ventillateurOff.png";
buzzerSrc = "../../../assets/buzzerOff.png";
//
imageButtons = [ {src:'../../../assets/ventillateurOff.png', src1:"../../../assets/buzzerOff.png"}];
imageButtonOn = [  {src:'../../../assets/ventillateurOn.gif', src1:"../../../assets/buzzerOn.gif"}];

//
constructor() { }
ngOnInit() {

}
//
onClick(imageNameObject: {
  src: string,
  src1: string
}) {
  this.VentilateurSrc = imageNameObject.src,
  this.buzzerSrc = imageNameObject.src1

}
}
