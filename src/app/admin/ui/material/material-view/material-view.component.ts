import { Component } from '@angular/core';
import { Material } from 'src/app/entity/material';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css'],
})
export class MaterialViewComponent {

  showAllMaterial = false;

  material: Material[] = [];

  addNewMaterial: Material = {
    materialId: 0,
    materialName: '',
    quantity: 0,
    materialDescription: '',
    url: ''
  };

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.getAllMaterial();
  }

  onAdd() {
    this.materialService.addMaterial(this.addNewMaterial).subscribe({
      next: (value) => {
        console.log("from Next : ", value)
        alert("Material Addedd Successfully!!!")
        this.reloadPage()
      },
      error: (err) => {
        console.log("from error : ", err)
      },
    })
  }


  getAllMaterial() {
    this.materialService.getAllMaterial().subscribe({
      next: (value) => {
        this.material = value;
      },
      error: (err) => {

      },
    })
  }

  reloadPage() {
    window.location.reload()
  }
}
