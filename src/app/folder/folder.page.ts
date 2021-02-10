import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { FolderService } from './core/folder.service';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Township } from './core/alert.model';
import { Observable } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { AutocompleteProvider } from './core/autocomplete.service';
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public folder: string;
  selectedImage = 'https://previews.123rf.com/images/lenm/lenm1307/lenm130700317/20779967-illustration-de-la-terre-pleurer-dus-%C3%A0-la-pollution.jpg';
  textForm: FormGroup = new FormGroup({});
  options: Township[] = [];
  filteredOptions: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private folderService: FolderService, 
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private webview : WebView, 
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.folderService.getTownships().subscribe(res => {
      this.options = res
    }, err => console.log(err))
    this.textForm = this.formBuilder.group({
      text: ['', Validators.required], 
      township: ['', Validators.required]
    })
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // this.filteredOptions = this.textForm.get('township').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this._filter(name) : this.options.slice())
    //   )
  }

  sendAlert(){
    var alert = {
      imageUrl: this.selectedImage,
      text : this.textForm.get('text').value, 
      township: this.textForm.get('township').value
    }
    console.log(alert)
    this.folderService.postAlert(alert).subscribe(res => {
      this.presentToast('Votre alerte a bien été publiée !', 'success');
    }, err => {
      this.presentToast('Votre alerte n\'a pas été publiée ...', 'danger');
      console.log(err)
    });
  }

  private chooseFromCamera(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then(data => {
      console.log('DATA FROM CAMERA');
      console.log(data);
      this.selectedImage = this.webview.convertFileSrc(data);
    })

  }


  async showEditPopup() {
    const actionRef = await this.actionSheetController.create({
      header: 'Choisir votre source',
      buttons: [
        {
          text: 'Depuis caméra',
          role: 'destructive',
          icon: 'camera-outline',
          handler: () => {
            console.log('Depuis la caméra');
            this.chooseFromCamera();
          }
        }
      ]
    });
    actionRef.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: "top",
      color: color
    });
    toast.present();
  }

  displayFn(township: any): string {
    return township && township.name ? township.name : '';
  }

  // loadCities() {
  //   return this.folderService.getTownships().subscribe( 
  //     result => {
  //       this.options = result;
  //       console.log(result);
  //       this.changeDetectorRef.detectChanges();
  //     }, err => {
  //       this.changeDetectorRef.detectChanges();
  //       console.log(err);
  //     }
  //   )
  // }

  townshipChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('township:', event.value);
  }

}
