import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.name = source;
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.noComponents = source.split(this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.split(this.delimiter).join(delimiter); // missing unmasking?
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        if (x < 0 || x >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        return this.name.split(this.delimiter)[x];
    }

    public setComponent(n: number, c: string): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        this.name = this.name.split(this.delimiter).map((comp, index) => index === n ? c : comp).join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        let nameArray = this.name.split(this.delimiter);
        nameArray.splice(n, 0, c);
        this.name = nameArray.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string): void {
        this.name += this.delimiter + c;
        this.noComponents++;
    }

    public remove(n: number): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        let nameArray = this.name.split(this.delimiter);
        nameArray.splice(n, 1);
        this.name = nameArray.join(this.delimiter);
        this.noComponents--;
    }

    public concat(other: Name): void {
        if (other.getNoComponents() === 0) {
            return;
        }
        this.name += this.delimiter + other.asDataString();
        this.noComponents += other.getNoComponents();
    }

}