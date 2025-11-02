import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.components = source.slice();
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components
            .map(comp => this.unmaskComponent(comp, delimiter))
            .join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
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

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("Component index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("Component index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("Component index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
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