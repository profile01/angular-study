import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten',
    standalone: true
})
export class ShortenPipe implements PipeTransform{
    transform(value: any, limit: number) {
        if(value.length > limit) {
            return (value as string).substr(0, limit) + " ...";
        }
        return value
    }
}