import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

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
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("Component index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("Component index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("Component index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("Component index out of bounds");
        }
        this.components.splice(i, 1);
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
}