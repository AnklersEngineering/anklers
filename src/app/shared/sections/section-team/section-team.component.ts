import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [],
  selector: "section-team",
  templateUrl: "./section-team.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTeamComponent {
  constructor() {}
}
