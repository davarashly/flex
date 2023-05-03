import {
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
  Optional,
} from "@angular/core"
import {
  AbstractControl,
  NgControl,
  FormGroupDirective,
  NgForm,
} from "@angular/forms"

@Directive({
  selector: "[formControlName], [formControl]",
})
export class IsInvalidDirective {
  constructor(
    private ngControl: NgControl,
    private renderer: Renderer2,
    private el: ElementRef,
    @Optional() private formGroupDirective: FormGroupDirective,
    @Optional() private ngForm: NgForm,
  ) {}

  @HostBinding("class.is-invalid")
  get isInvalid(): boolean {
    const control: AbstractControl | null = this.ngControl.control
    const formSubmitted =
      !!this.formGroupDirective?.submitted || !!this.ngForm?.submitted

    return control ? control.invalid && formSubmitted : false
  }
}
