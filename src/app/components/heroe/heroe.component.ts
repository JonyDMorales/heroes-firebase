import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styles: []
})
export class HeroeComponent implements OnInit {

    heroe :Heroe = {
        nombre: '',
        casa: 'DC',
        bio:''
    };
    id:string = '';
    nuevo:boolean = false;

    constructor(public _heroesService:HeroesService,
                public _router:Router, 
                public _activatedRouter: ActivatedRoute ) { 
        this._activatedRouter.params.subscribe( parametros => {
            this.id = parametros['id'];
            if(this.id != 'nuevo'){
                this._heroesService.getHeroe(this.id).subscribe(heroe =>{
                    this.heroe = heroe;
                    console.log(heroe);
                });
            }
        });

    }

    ngOnInit() { }

    public sendGuardar(){
        if( this.id == 'nuevo'){
            this._heroesService.newHeroe(this.heroe).subscribe(data => {
                this._router.navigate(['/heroe', data.name]);
            });
        }else{
            this._heroesService.updateHeroe(this.heroe, this.id).subscribe(data => {
                
            });
        }
    }

}
