import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [QRScanner, HttpClient, HttpClientModule]
})

export class HomePage {
  scannedData:any = {};
  url_base = "192.168.0.64:3000";
  send_pos = this.url_base + "/sendPosition";
  test_post = this.url_base + "/testPost";
  reset_map = this.url_base + "/resetMap";
  locX;
  locY;
  logs = "";

  constructor(public navCtrl: NavController, private qrScanner: QRScanner, private http: HttpClient) {
    console.log("app started");
  }

  scan(){
    this.scannedData.text = "scanning...";
    console.log("scanning");
    this.qrScanner.show();
    window.document.querySelector('ion-app').classList.add('transparent-body');

    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      // camera permission was granted
      if (status.authorized) {
        console.log("scanning2");
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log("scanning3");

          console.log('Scanned something' + text);
          this.scannedData.text = text;
          this.sendPos(text);

          // stop scanning
          this.qrScanner.hide();
          scanSub.unsubscribe(); 
        });
      } else if (status.denied) {
        console.log("Permissão negada 1");
        // camera permission was permanently denied you must use QRScanner.openSettings() method to guide the user to the settings page then they can grant the permission from there
      } else {
        console.log("Permissão negada 2");
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    }).catch((e: any) => console.error('ERRO! ' + e));
  }

  sendPos(data) {
    console.log("Sending data {" + data + "} to URL" + this.url_base + this.send_pos);
    this.http.post(this.test_post, data, {responseType: 'text', headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')})
    .subscribe(res => {
      this.log("Post Success");
    }, (err) => {
      this.log("Post error " + err.message);
    });   
  }

  testPost() {
    let testData = `{
      "message": "Hello World :D"
    }`;

    console.log("Sending test data to " + this.test_post)
      this.http.post(this.test_post, testData, {responseType: 'text', headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')})
      .subscribe(res => {
        this.log("Post Success");
      }, (err) => {
        this.log("Post error " + err.message);
      });  
  }

  addLocation() {
    this.logs = "";
    if (this.locX == "" || this.locY == "") {
      this.logs = "Empty x or y";
    } 
    
    if (this.locX < 1 || this.locY < 1) {
      this.logs = "x or y < 1";
    } 
    
    if (this.logs == "") {
      let testLoc = `{
        "x":` + (this.locX-1) + `,
        "y":` + (this.locY-1) + `,
        "message": "Location"
      }`;

      console.log("Sending location to " + this.url_base + "/addLocation")
        this.http.post(this.url_base + "/addLocation", testLoc, {responseType: 'text', headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')})
        .subscribe(res => {
          this.log("Post Success");
        }, (err) => {
          this.log("Post error " + err.message);
        });  
    }
  }

  resetMap() {
    this.http.post(this.reset_map, {}, {responseType: 'text', headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')})
    .subscribe(res => {
      this.log("Map reseted!");
    }, (err) => {
      this.log("Error on reset map! " + err.message);
    });   
  }

  log(msg) {
    this.logs = msg;
    console.log(msg);
  }


}
