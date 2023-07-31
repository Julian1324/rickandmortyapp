import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Character } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
import { filter, take } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
type RequestInfo = {
  next: any;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  info: RequestInfo = {
    next: null
  }

  private page = 1;
  private type: string = '';
  private query: string = '';
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  showGoUpButton = false;
  loadingData = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.getCharactersQuery();
  }

  @HostListener('window:scroll', [])

  onWindowScroll() {
    // const yOffset = window.scrollY;
    // if ((yOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
    //   this.showGoUpButton = true;
    // } else if (this.showGoUpButton && (yOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
    //   this.showGoUpButton = false;
    // }
  }

  onScrollDown() {
    if (!!this.info.next) {
      this.page++;
      this.getDataPromise();
    }
  }

  onScrollTop() {
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }

  // Getdata con Observable
  // (No se utilizó porque al hacer peticiones no bloqueantes, el método searchEpisode (linea 43) se ejecuta tarde y no se actualiza el atributo episodes 
  // de la variable this.characters y no saldría el nombre del episodio. this.character se pasa por @Input a otro componente y por esta razón no se actualiza. )
  private getDataObservable() {
    try {
      this.characterService.searchCharacter(this.type, this.query, this.page).pipe(
        take(1)
      ).subscribe(async (res: any) => {
        if (res?.results?.length) {
          const { info, results } = res;

          for (const result of results) {
            this.characterService.searchEpisode(result.episode[0]).pipe(take(1)).subscribe((res2: any) => {
              result.episode = res2.name;
            })
          }

          this.characters = [...this.characters, ...results];
          console.log(this.characters);

          this.info = info;
        } else {
          this.characters = [];
        }
      });
    } catch (error) {
      console.log(error);

    }

  }

  private onUrlChanged() {

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((navigation: any) => {
      if (navigation.url != "/home") {
        this.characters = [];
        this.page = 1;
        this.getCharactersQuery();
      }

    })
  }

  private async getCharactersQuery() {

    const params = this.route.snapshot.queryParams;
    this.query = params.q;
    this.type = params.type;
    // this.getDataObservable();
    this.getDataPromise();
  }

  // Getdata con Promesas
  private async getDataPromise() {

    try {
      this.loadingData = true;
      const res: any = await this.characterService.searchCharacter(this.type, this.query, this.page).toPromise();

      if (res?.results?.length) {

        const { info, results } = res;

        for await (const result of results) {
          const res2: any = await this.characterService.searchEpisode(result.episode[0]).toPromise();
          result.episode = res2.name;
        }

        this.characters = [...this.characters, ...results];
        this.info = info;
        this.loadingData = false;

      } else {
        this.characters = [];
      }
    } catch (error) {
      this.loadingData = false;
      console.log(error);

    }
  }

}
