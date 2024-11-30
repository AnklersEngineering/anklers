import { AbstractControl } from '@angular/forms';

//export { ɵFormGroupRawValue as TypedValueOf } from '@angular/forms';

export type TypedControlsOf<Type> = {
	-readonly [Property in keyof Type]: AbstractControl<Type[Property]>;
};

