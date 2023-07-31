import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Character } from "src/app/shared/interfaces/character.interface";
type RequestInfo = {
    next: any;
}

@Component({
    selector: 'app-character',
    templateUrl: './character.component.html',
    styleUrls: ['./character.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterComponent {
    @Input() character: Character;

    constructor() { this.character = {} as Character }

    ngOnInit(): void {
    }

}