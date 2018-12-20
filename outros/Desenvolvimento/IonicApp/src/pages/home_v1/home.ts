import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { BLE } from '@ionic-native/ble';
// import { HTTP } from '@ionic-native/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  todosDadosColetados: Array<any> = [];
  dataToPost: Array<any> = [];
  validBeacons: Array<string> = [];
  dadosDoBeacon: any;
  scanning: boolean;
  saveOnFirebase: boolean;
  readyToPost: boolean;
  tempoDeAnalise: number;
  queueInterval: any;
  
  idBeaconAnalisado: string;
  nomeBeaconAnalisado: string;

  SERVER = "http://192.168.0.64:80/"; // CASA
  //SERVER = "http://10.13.20.86:80/"; // FURB
  QUEUE_INTERVAL = 100 // 0.1 segundo
  

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, private ble: BLE, private http: HttpClient) {
    this.todosDadosColetados = [];
    this.dataToPost = [];
    this.tempoDeAnalise = 5;
    this.scanning = false;
    this.saveOnFirebase = false;
    this.readyToPost = true;
    this.sendToQueue();
    
    this.validBeacons = [ 'D7:80:45:7D:C8:86', 'F8:15:B1:06:9B:71', 'CF:43:E0:FA:CE:D2' ];
  }

  /**
   * Procura por um beacon específico informado pelo usuário
   */
  scan() {
    this.scanning = true;
    this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe(
      beaconEncontrado => {
        beaconEncontrado.dataLeitura = new Date();
        beaconEncontrado.nome = this.nomeBeaconAnalisado;
  
        if (beaconEncontrado.id == this.idBeaconAnalisado) {
          this.dadosDoBeacon = beaconEncontrado;
          this.todosDadosColetados.push(JSON.parse(JSON.stringify(beaconEncontrado)));
          console.log(this.dadosDoBeacon);
        }
  
      },
      error => {
        console.log(JSON.stringify(error))
      }
    );

    setTimeout(() => {
      this.scanning = false;
      this.stopScan();
    }, this.tempoDeAnalise * 1000);
  }

  /**
   * Procura todos os beacons até que o botão de parar seja acionado
   */
  scanAll() {
    console.log("Escaneando todos os beacons");
    this.scanning = true;
    this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe(
      beaconFound => {
        // Verifica se é um dos beacons que estamos esperando
        if (this.isValidBeacon(beaconFound)) {
          // Se a lista de dados ainda não tiver esse beacon, add ele
          if (this.dataToPost.filter(b => b.id === beaconFound.id).length === 0) {
            this.dataToPost.push(JSON.parse(JSON.stringify(beaconFound)));
          }
        }
      },
      error => {
        console.log(JSON.stringify(error))
      }
    );
  }
  
  /**
   * Para de scanear beacons e limpa as variáveis
   */
  stopScan() {    
    this.ble.stopScan();
    
    console.log("PARANDO DE PROCURAR");
    console.log(this.todosDadosColetados);

    this.saveData(this.todosDadosColetados);

    this.dadosDoBeacon = {};
    this.idBeaconAnalisado = "";
    this.todosDadosColetados = [];

    clearImmediate(this.queueInterval);

    this.scanning = false;
    
  }

  /**
   * Salva os dados no firebase se a flag saveOnFirebase estiver ativa
   */
  saveData(dados) {
    if (this.saveOnFirebase) {
      let dadosParaSalvar = JSON.parse(JSON.stringify(dados));
      console.log(dadosParaSalvar);
      console.log("SALVANDO DADOS NO FIREBASE");
      this.db.database.ref("dados_coletados").push(dadosParaSalvar);
    }
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
        this.readyToPost = false;

        console.log('Publicando em ' + this.SERVER + 'addAll. Dados: ' + JSON.stringify(tmp));
        let url = this.SERVER + 'addAll';
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };
     
        this.http.post(url, tmp, httpOptions)
          .subscribe(res => {
            console.log(res)
            this.readyToPost = true; // Só libera nova inserção quando receber ok do servidor
          }, (err) => {
            console.error(err.message) 
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
    return this.validBeacons.indexOf(beacon.id) > -1
  }


  // TESTES DE REDE
  testGet() {
    console.log("TESTANDO GET REQUEST");
    let testData = `{
      "message": "Hello World :D"
    }`;

    let url1 = this.SERVER + "testGet/"; 
 
    this.http.get(url1 + testData)
      .subscribe(res => { 
        console.log(res) 
      }, (err) => { 
        console.error(err.message) 
      });
  }

  testPost() {
    console.log("TESTANDO POST REQUEST");
    let testData = {
      message: "Hello World :D"
    };

    let url1 = this.SERVER + "testPost"; 

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
 
    this.http.post(url1, {testData }, httpOptions)
      .subscribe(res => { 
        console.log(res) 
      }, (err) => { 
        console.error(err.message) 
      });
  }

}
