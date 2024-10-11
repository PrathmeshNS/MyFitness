import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../entity/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private api = "http://localhost:8080/material/"
  constructor(private http: HttpClient) { }

  getAllMaterial(): Observable<any> {
    return this.http.get(this.api + "getAllMaterial")
  }

  addMaterial(material: Material): Observable<any> {
    return this.http.post(this.api + "addMaterial", material)
  }

  getMaterialById(material:Material): Observable<any> {
    return this.http.get(`${this.api + 'getMaterialById'}/${material.materialId}`);
  }

  deleteMaterialById(material:Material) {
    return this.http.get(`${this.api + 'deleteById'}/${material.materialId}`);

  }
}
