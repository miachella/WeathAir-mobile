import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { FolderService } from './core/folder.service';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public folder: string;
  selectedImage = 'https://previews.123rf.com/images/lenm/lenm1307/lenm130700317/20779967-illustration-de-la-terre-pleurer-dus-%C3%A0-la-pollution.jpg';
  textForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private folderService: FolderService, 
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private webview : WebView
    ) { }

  ngOnInit() {
    this.textForm = this.formBuilder.group({
      text: ['', Validators.required]
    })
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  sendAlert(){
    var alert = {
      text : this.textForm.get('text').value
    }
    console.log(alert)
    this.folderService.postAlert(alert).subscribe(res => {
      //TODO modale success
    }, err => {
      //TOD modale error
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

}
