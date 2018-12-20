import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BLE } from '@ionic-native/ble';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Beacon } from './Beacon'

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  SERVER = "http://192.168.0.64:80/" // CASA
  //SERVER = "http://10.13.20.86:80/" // FURB

  QUEUE_INTERVAL = 100 // 0.1 segundo
  queueInterval: any
  logs: string
  
  dataToPost: Array<any> = []
  validBeacons : Array<Beacon>

  scanning: boolean
  calibrating: boolean
  calibrated: boolean
  
  constructor(public navCtrl: NavController, private ble: BLE, private http: HttpClient) {
    this.scanning = false
    this.calibrated = false
    this.calibrating = false
    this.dataToPost = []
    this.sendToQueue()
    this.logs = ""

    let lemonBeacon = new Beacon('D7:80:45:7D:C8:86', 'beacon_amarelo', -78)
    let candyBeacon = new Beacon('F8:15:B1:06:9B:71', 'beacon_rosa', -77)
    let beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', 'beacon_roxo', -80)

    this.validBeacons = []
    this.validBeacons.push(lemonBeacon)
    this.validBeacons.push(candyBeacon)
    this.validBeacons.push(beetrootBeacon)
  }

  /**
   * 
   */
  calibrate() {
    this.calibrating = true
    this.log("Calibrando, ande por toda a sala")

    this.ble.startScanWithOptions([], { reportDuplicates: true })
      .subscribe(
        beaconFound => {
          if (this.isValidBeacon(beaconFound)) {
            this.calibrateBeacon(beaconFound)
          } else {
            console.log(beaconFound.id)
          }
        },
      error => {
        this.log(JSON.stringify(error))
      }
    )    
  }

  /**
   * 
   * @param beacon 
   */
  calibrateBeacon(beacon) {
    this.validBeacons.forEach((b) => {
      if (b.id === beacon.id) {
        console.log(b.name + ' - ' + beacon.rssi + ' | ' + b.maxRSSI + ' / ' + b.minRSSI)
        b.setMaxRSSI(beacon.rssi)
        b.setMinRSSI(beacon.rssi)
        b.setRSSI(beacon.rssi)
      }
    })
  }

  /**
   * 
   */
  calibrationComplete() {
    this.ble.stopScan()
    let url = this.SERVER + 'calibrationComplete'
    let data = this.validBeacons
    let options = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };
    
    this.http.post(url, data, options)
      .subscribe(res => {
        this.log(res)
      }, (err) => {
        this.log(err.message)
      })
    
    this.calibrating = false
    this.calibrated = true
  }

  /**
   * 
   * @param beaconFound 
   */
  updateBeaconRSSI(beaconFound) {
    this.validBeacons.forEach((b) => {
      if (b.id === beaconFound.id) {
        b.setRSSI(beaconFound.rssi)
      }
    })
  }

  /**
   * Procura todos os beacons até que o botão de parar seja acionado
   */
  scanAll() {
    this.log("Escaneando todos os beacons");
    this.scanning = true;
    this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe(
      beaconFound => {
        console.log(JSON.stringify(beaconFound))
        // Verifica se é um dos beacons que estamos esperando
        if (this.isValidBeacon(beaconFound)) {
          // Tratamento apenas para debug e mostrar o rssi no app
          this.updateBeaconRSSI(beaconFound)

          // Se a lista de dados ainda não tiver esse beacon, add ele
          if (this.dataToPost.filter(b => b.id === beaconFound.id).length === 0) {
            this.dataToPost.push(JSON.parse(JSON.stringify(beaconFound)));
          }
        }
      },
      error => {
        this.log(JSON.stringify(error))
      }
    );
  }
  
  /**
   * Para de scanear beacons e limpa as variáveis
   */
  stopScan() {    
    this.ble.stopScan();
    clearImmediate(this.queueInterval);
    this.scanning = false;
  }

  /**
   * Envia uma coleção de dados para a fila. Executa uma vez a cada QUEUE_INTERVAL 
   * enquanto a flag scanning estiver ativa
   */
  sendToQueue() {
    // Envia pra fila a cada n segundos
    this.queueInterval = setInterval(() => {
      if (this.dataToPost.length > 0) {
        let tmp = this.dataToPost;
        this.dataToPost = [];

        console.log('Publicando em ' + this.SERVER + 'addAll. Dados: ' + JSON.stringify(tmp));
        let url = this.SERVER + 'addAll';
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };
     
        this.http.post(url, tmp, httpOptions)
          .subscribe(res => {
            this.log(res)
          }, (err) => {
            this.log(err.message)
          });
      } else {
        this.dataToPost = []
      }
    }, this.QUEUE_INTERVAL);
  }

  /**
   * Verifica se é um dos beacons que estamos utilizando nos testes
   */
  isValidBeacon(beacon) {
    return this.validBeacons.filter(b => {
      if (b.id === beacon.id) {
        return true
      }
    })
  }

  log(msg) {
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg)
    }
    console.log(msg);
    this.logs = msg;
  }

  // TESTES HTTP
  testGet() {
    this.log("TESTANDO GET REQUEST NO SERVER " + this.SERVER);
    let testData = `{
      "message": "TESTANDO GET REQUEST"
    }`;

    let url1 = this.SERVER + "testGet/"; 
 
    this.http.get(url1 + testData)
      .subscribe(res => { 
        this.log(res) 
      }, (err) => { 
        this.log(err.message)
      });
  }

  testPost() {
    this.log("TESTANDO POST REQUEST NO SERVER " + this.SERVER);
    let testData = {
      message: "TESTANDO POST REQUEST"
    };

    let url1 = this.SERVER + "testPost"; 

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
 
    this.http.post(url1, {testData }, httpOptions)
      .subscribe(res => { 
        this.log(res) 
      }, (err) => { 
        this.log(err.message)
      });
  }

}
