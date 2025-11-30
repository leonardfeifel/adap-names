import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source.slice();
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components
            .map(comp => this.unmaskComponent(comp, delimiter))
            .join(delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertIndexInBounds(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertIndexInBounds(i);
        this.assertNotNullOrUndefined(c, "Component cannot be null or undefined");
        this.components[i] = c;
        this.assertInvariant();
        this.assertComponentAtIndexChanged(i, c);
    }

    public insert(i: number, c: string) {
        this.assertIndexInInsertBounds(i);
        this.assertNotNullOrUndefined(c, "Component cannot be null or undefined");
        const oldLength: number = this.getNoComponents();
        this.components.splice(i, 0, c);
        this.assertInvariant();
        this.assertLengthChanged(oldLength, 1);
        this.assertComponentAtIndexChanged(i, c);
    }

    public append(c: string) {
        this.assertNotNullOrUndefined(c, "Component cannot be null or undefined");
        const oldLength: number = this.getNoComponents();
        this.components.push(c);
        this.assertInvariant();
        this.assertLengthChanged(oldLength, 1);
    }

    public remove(i: number) {
        this.assertIndexInBounds(i);
        const oldLength: number = this.getNoComponents();
        this.components.splice(i, 1);
        this.assertInvariant();
        this.assertLengthChanged(oldLength, -1);
    }

    private unmaskComponent(maskedString: string, delimiter: string): string {
        let unescaped = '';
        let escaped = false;
        for (const ch of maskedString) {
            if (escaped) {
                unescaped += ch;
                escaped = false;
            } else if (ch === ESCAPE_CHARACTER) {
                escaped = true;
            } else {
                unescaped += ch;
            }
        }
        return unescaped;
    }

     protected assertInvariant(): void {
        const condition: boolean = (this.components !== null && this.components !== undefined);
        InvalidStateException.assert(condition, "Invariant violation: components array is null or undefined");
    }

   
   

    

}