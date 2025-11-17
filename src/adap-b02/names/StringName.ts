import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.name = source;
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.noComponents = this.splitEscaped(source, this.delimiter, true).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.splitEscaped(this.name, this.delimiter).join(delimiter);
    }

    public asDataString(): string {
        return this.splitEscaped(this.name, this.delimiter, true).join(DEFAULT_DELIMITER);
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
        return this.splitEscaped(this.name, this.delimiter, true)[x];
    }

    public setComponent(n: number, c: string): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        this.name = this.splitEscaped(this. name, this.delimiter, true).map((comp, index) => index === n ? c : comp).join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        let nameArray = this.splitEscaped(this.name,this.delimiter,true);
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
        let nameArray = this.splitEscaped(this.name, this.delimiter, true);
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

    private splitEscaped(input:string, delimiter: string, withEscapeChar : boolean = false): string[] {
        const result: string[] = [];
        let current = '';
        let escaped = false;
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if(escaped) {
                current +=char;
                escaped = false;
            } else if(char === ESCAPE_CHARACTER) {
                escaped = true;
                if(withEscapeChar) {
                    current += char;
                }
            } else if(char === delimiter) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

}