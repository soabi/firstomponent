import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-componente',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})
export class MiComponenteComponent {
  csvContent: string | undefined;
  totalAssets: number = 0;
  totalServices: number = 0;
  totalGasoline: number = 0;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.csvContent = reader.result as string;
      this.processCSV();
    };

    reader.readAsText(file);
  }

  processCSV() {
    if (!this.csvContent) {
      console.error('No seleccionaste un archivo CSV');
      return;
    }
    const lines = this.csvContent.split('\n');

    for (const line of lines) {
      const columns = line.split(',');

      if (columns.length === 3) {
        const establishmentName = columns[0].trim();
        const totalAmount = parseFloat(columns[1]);
        const invoiceType = columns[2].trim();

        const withoutIVA = totalAmount / 1.12;

        if (establishmentName === 'Estacion de Servicio Villa Clarita') {
          this.totalGasoline += withoutIVA;
        } else if (establishmentName === 'Sporta') {
        this.totalServices += withoutIVA;
        }else if (establishmentName === 'TacoBell' || establishmentName === 'Tacolito' || establishmentName === 'Pizza Hut' ) {
          this.totalAssets += withoutIVA;
      
        }
      }  
      
    }
  }
}
