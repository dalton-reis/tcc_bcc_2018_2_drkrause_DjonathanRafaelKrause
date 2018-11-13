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

  QUEUE_INTERVAL = 500 // 0.5 segundos
  queueInterval: any
  logs: string
  
  validBeacons: Array<Beacon>
  allBeacons: Array<Beacon>

  scanning: boolean
  scanningAll: boolean
  calibrating: boolean
  calibrated: boolean
  
  constructor(public navCtrl: NavController, private ble: BLE, private http: HttpClient) {
    this.scanning = false
    this.scanningAll = false
    this.calibrated = false
    this.calibrating = false

    this.allBeacons = []
    this.logs = ""
    
    this.sendToQueue()
    this.setBeacons()
  }

  setBeacons() {
    let lemonBeacon = new Beacon('D7:80:45:7D:C8:86', 'beacon_amarelo', -78)
    let candyBeacon = new Beacon('F8:15:B1:06:9B:71', 'beacon_rosa', -77)
    let beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', 'beacon_roxo', -80)

    let miBeacon   = new Beacon('MIBEACON', 'mi_beacon', 0)
    let genBeacon1 = new Beacon('GEN1', 'gen_beacon_1', 0)
    let genBeacon2 = new Beacon('GEN2', 'gen_beacon_2', 0)
    
    this.validBeacons = []
    this.validBeacons.push(lemonBeacon)
    this.validBeacons.push(candyBeacon)
    this.validBeacons.push(beetrootBeacon)
    this.validBeacons.push(miBeacon)
    this.validBeacons.push(genBeacon1)
    this.validBeacons.push(genBeacon2)
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
  updateBeacon(beaconFound) {
    this.validBeacons.forEach((b) => {
      if (b.id === beaconFound.id) {
        // Pode atualizar o valor mais alto caso ele seja maior do q o calibrado
        // O menor não deve ser atualizado
        b.setMaxRSSI(beaconFound.rssi) 
        b.setRSSI(beaconFound.rssi)
      }
    })
  }

  /**
   *
   */
  scan() {
    this.log("Procurando beacons válidos");
    this.scanning = true;
    this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe(
      beaconFound => {
        if (this.isValidBeacon(beaconFound)) {
          this.updateBeacon(beaconFound)
        }
      },
      error => {
        this.log(JSON.stringify(error))
      }
    )
  }
  
  /**
   * Para de scanear beacons e limpa as variáveis
   */
  stopScan() {    
    this.ble.stopScan()
    clearImmediate(this.queueInterval)
    this.scanning = false
  }

  scanAll() {
    this.log("Procurando todos os beacons")
    this.scanningAll = true
    this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe(
      beaconFound => {
        let updated = false
        for(let b of this.allBeacons) {
          if (b.id == beaconFound.id) {
            b.setRSSI(beaconFound.rssi)
            updated = true
          }
        }
        
        if (!updated) {
          let newBeacon = new Beacon(beaconFound.id, beaconFound.id, beaconFound.rssi)
          this.allBeacons.push(newBeacon)
        }
      },
      error => {
        this.log(JSON.stringify(error))
      }
    )
  }

  stopScanAll() {
    this.ble.stopScan()
    this.scanningAll = false
  }

  /**
   * Envia uma coleção de dados para a fila. Executa uma vez a cada QUEUE_INTERVAL 
   * enquanto a flag scanning estiver ativa
   */
  sendToQueue() {
    // Envia pra fila a cada n segundos
    this.queueInterval = setInterval(() => {
      if (this.scanning) {
        let url = this.SERVER + 'addAll'
        let options = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) }
        let data = this.validBeacons
        
        console.log('Publicando em ' + url + 'os dados: ' + JSON.stringify(data))
     
        this.http.post(url, data, options)
          .subscribe(res => {
            this.log(res)
          }, (err) => {
            this.log(err.message)
          })
      }
    }, this.QUEUE_INTERVAL)
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
