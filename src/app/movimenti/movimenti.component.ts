import { Component, OnInit } from '@angular/core';
import { Movimento } from '../models/movimento';

@Component({
  selector: 'app-movimenti',
  templateUrl: './movimenti.component.html',
  styleUrls: ['./movimenti.component.css']
})
export class MovimentiComponent implements OnInit {
  movimenti: Movimento[] = [
    {
      "data": "2022-01-22",
      "tipo": "ENTRATA",
      "descrizione": "Stipendio",
      "importo": 12000
    },
    {
      "data": "2022-01-24",
      "tipo": "USCITA",
      "descrizione": "Abbonamento Netflix",
      "importo": 6
    },
    {
      "data": "2022-01-25",
      "tipo": "USCITA",
      "descrizione": "HERA Gas e Luce",
      "importo": 11000
    }
  ];

  movimento?: Movimento;

  modalitaModifica = false;

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.movimento = { data: "2023-05-16", descrizione: "", importo: 0, tipo: "ENTRATA" };
    this.modalitaModifica = false;
  }

  estrattoConto(): number {
    let totale = 0;

    for (const m of this.movimenti) {
      if (m.tipo == "ENTRATA") {
        totale += m.importo;
      } else {
        totale -= m.importo;
      }
    }

    return totale;

    return this.movimenti.reduce((totale, movimento) => {
      if (movimento.tipo == "ENTRATA") {
        totale += movimento.importo;
      } else {
        totale -= movimento.importo;
      }
      return totale;
    }, 0);
  }

  elimina(m: Movimento) {
    if (confirm(`Sei sicuro di voler elimnare il movimento ${m.descrizione}?`)) {
      let index = this.movimenti.indexOf(m);

      if (index > -1) {
        this.movimenti.splice(index, 1);
      }
    }
  }

  eliminaByIndice(i: number) {
    if (confirm("Sei sicuro di voler elimnare il movimento?")) {
      this.movimenti.splice(i, 1);
    }
  }

  modifica(m: Movimento) {
    this.movimento = m;
    this.modalitaModifica = true;
  }

  salva() {
    if (this.modalitaModifica) {
      // modifica
      this.reset();
    } else {
      // inserisci nuovo
      // // alternativa 1
      // if (this.movimento) {
      //   this.movimenti.push(this.movimento);
      // }

      // alternativa 2
      // ! => mi assumo la responsabilità di dire che il valore non è undefined
      this.movimenti.push(this.movimento!);

      this.reset();
    }
  }
}
