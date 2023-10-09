import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-componente',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})
export class MiComponenteComponent {
  csvContent: String | undefined;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.csvContent = reader.result as string;
      console.log('Contenido del archivo CSV:', this.csvContent);
    };

    reader.readAsText(file);
    
  }

  processCSV() {
    if (!this.csvContent){
      console.error('You dont select a CSV file');
      return;
    }
    const lines = this.csvContent?.split('\n');
    let bienesTotal = 0;
    let serviciosTotal = 0;
    let gasolinaTotal = 0;

    for (const line of lines){
      const columns = line.split(',');
      if(columns.length === 3){
        const propertName = columns[0].trim();
        const totalAmount = parseFloat(columns[1]);
        const invoiceType = columns[2].trim();

        const withoutIVA = totalAmount / 1.12;

        if (invoiceType === 'bienes'){
          bienesTotal = bienesTotal + withoutIVA;
        }else if (invoiceType === 'servicios'){
          serviciosTotal += withoutIVA;
        }else if(invoiceType === 'gasolina'){
          gasolinaTotal += withoutIVA;
        }
      }
    }
    console.log('Total de bienes: ' + bienesTotal);
    console.log('Total de servicios: ' + serviciosTotal);
    console.log('Total de gasolina: ' + gasolinaTotal);
  }
}

    
