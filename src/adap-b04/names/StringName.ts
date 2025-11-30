import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.splitEscaped(source, this.delimiter, true).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.splitEscaped(this.name, this.delimiter).join(delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.assertIndexInBounds(i);
        return this.splitEscaped(this.name, this.delimiter, true)[i];
    }

    public setComponent(i: number, c: string) {
        this.assertIndexInBounds(i);
        this.assertNotNullOrUndefined(c, "Component cannot be null or undefined");
        this.name = this.splitEscaped(this.name, this.delimiter, true).map((comp, index) => index === i ? c : comp).join(this.delimiter);
        this.assertInvariant();
        this.assertComponentAtIndexChanged(i, c);
    }

    public insert(i: number, c: string) {
        this.assertIndexInInsertBounds(i);
        this.assertNotNullOrUndefined(c, "Component cannot be null or undefined");

        const oldLength: number = this.getNoComponents();
        let nameArray = this.splitEscaped(this.name, this.delimiter, true);
        nameArray.splice(i, 0, c);
        this.name = nameArray.join(this.delimiter);
        this.noComponents++;

        this.assertInvariant();
        this.assertLengthChanged(oldLength, 1);
        this.assertComponentAtIndexChanged(i, c);
    }

    public append(c: string) {
        this.assertNotNullOrUndefined(c, "Component cannot be null or undefined");
        const oldLength: number = this.getNoComponents();

        let nameArray = this.splitEscaped(this.name, this.delimiter, true);
        nameArray.push(c);
        this.name = nameArray.join(this.delimiter);
        
        this.noComponents++;

        this.assertInvariant();
        this.assertLengthChanged(oldLength, 1);
    }

    public remove(i: number) {
        this.assertIndexInBounds(i);
        const oldLength: number = this.getNoComponents();

        let nameArray = this.splitEscaped(this.name, this.delimiter, true);
        nameArray.splice(i, 1);
        this.name = nameArray.join(this.delimiter);
        this.noComponents--;

        this.assertInvariant();
        this.assertLengthChanged(oldLength, -1);
    }


    private splitEscaped(input: string, delimiter: string, withEscapeChar: boolean = false): string[] {
        const result: string[] = [];
        let current = '';
        let escaped = false;
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (escaped) {
                current += char;
                escaped = false;
            } else if (char === ESCAPE_CHARACTER) {
                escaped = true;
                if (withEscapeChar) {
                    current += char;
                }
            } else if (char === delimiter) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    protected assertInvariant(): void {
        const condition: boolean = (this.name !== null && this.name !== undefined);
        InvalidStateException.assert(condition, "Invariant violation: name string is null or undefined");
    }

}