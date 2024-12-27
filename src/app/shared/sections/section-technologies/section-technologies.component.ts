import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CoreModule } from "@web/core";

@Component({
  standalone: true,
  imports: [CoreModule],
  selector: "section-technologies",
  templateUrl: "./section-technologies.component.html",
  styleUrl: "./styles.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTechnologiesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
