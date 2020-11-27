import { validateSync } from 'class-validator';
import { observable } from 'mobx';

export function validate(dto: any) {
    const errors = validateSync(dto);
    dto.$errors = {};

    if (errors.length) {
        if (!dto.$errors) {
            dto.$errors = observable({});
        }
        errors.forEach(error => {
            dto.$errors[error.property] = error.constraints[Object.keys(error.constraints)[0]];
        });
        return false;
    }

    return true;

}