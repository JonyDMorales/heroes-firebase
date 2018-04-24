import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

    public heroesUrl:string = 'https://heroesapp-9803d.firebaseio.com/heroes.json';
    public heroeUrl:string = 'https://heroesapp-9803d.firebaseio.com/heroes';

    constructor( private http:Http) { }
    
    public newHeroe(heroe:Heroe){
        let body = JSON.stringify( heroe );
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.heroesUrl, body, {headers}).map(res => {
            return JSON.parse(res['_body']);
        });
    }

    public updateHeroe(heroe:Heroe, key$:string){
        let body = JSON.stringify( heroe );
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let url = `${ this.heroeUrl }/${ key$ }.json`;
        return this.http.put( url, body, {headers}).map(res => {
            return JSON.parse(res['_body']);
        });
    }

    public getHeroe(key$:string){
        let url = `${ this.heroeUrl }/${ key$ }.json`;
        return this.http.get( url ).map(res => {
            return JSON.parse(res['_body']);
        });
    }

    public getHeroes(){
        return this.http.get( this.heroesUrl ).map(res => {
            return JSON.parse(res['_body']);;
        });
    }

    public deleteHeroe(key$:string){
        let url = `${ this.heroeUrl }/${ key$ }.json`;
        return this.http.delete( url ).map(res => {
            return res;
        });
    }
}
