import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styles: []
})
export class HeroesComponent implements OnInit {
    
    heroes :any[] ;

    constructor(public _heroesService:HeroesService,
                public _router:Router) { 
        this._heroesService.getHeroes().subscribe(heroes =>{
            this.heroes = heroes;
        });
    }

    ngOnInit() { }

    eliminarHeroe(key:string){
        this._heroesService.deleteHeroe(key).subscribe(res =>{
            delete this.heroes[key];
        });
    }
}
