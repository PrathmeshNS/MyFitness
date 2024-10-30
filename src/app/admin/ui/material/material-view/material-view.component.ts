import { Component } from '@angular/core';
import { Material } from 'src/app/entity/material';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css'],
})
export class MaterialViewComponent {
  onSubmit() {
  }
  material: Material[] = [];

  addNewMaterial: Material = {
    materialId: 0,
    materialName: '',
    quantity: '',
    materialDescription: '',
    url: ''
  };

  constructor(private materialService: MaterialService) { }
}
