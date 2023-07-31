import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Character } from 'src/app/shared/interfaces/character.interface';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character$: Observable<Character> = new Observable<Character>();
  episodes: any[] = [];

  constructor(private route: ActivatedRoute, private characterService: CharacterService, private location: Location) { }

  async ngOnInit(): Promise<void> {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const { id } = params;
      this.character$ = this.characterService.getDetails(id);
      // console.log(this.character$);
      // this.character$.pipe().subscribe(m => console.log(m));
    });

    // this.episodes = (await this.character$.toPromise()).episode;
    // console.log(typeof this.episodes);

    this.character$.pipe(take(1)).subscribe((c) => {
      // this.episodes = c.episode;

      for (const episode of c.episode) {
        this.characterService.searchEpisode(episode).pipe().subscribe((m: any) => {
          this.episodes.push(m);
        })
      }
    })



    // this.characterService.searchEpisode((await this.character$.toPromise()).episode).pipe(take(1)).subscribe((res) => {
    //   console.log(res);
    // });
  }

  onBack() {
    this.location.back();
  }

}
