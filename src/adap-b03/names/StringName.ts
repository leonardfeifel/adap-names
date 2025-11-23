import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

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
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        return this.splitEscaped(this.name, this.delimiter, true)[i];
    }

    public setComponent(i: number, c: string) {
         if (i < 0 || i >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        this.name = this.splitEscaped(this. name, this.delimiter, true).map((comp, index) => index === i ? c : comp).join(this.delimiter);
    }

    public insert(i: number, c: string) {
         if (i < 0 || i >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        let nameArray = this.splitEscaped(this.name,this.delimiter,true);
        nameArray.splice(i, 0, c);
        this.name = nameArray.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string) {
        this.name += this.delimiter + c;
        this.noComponents++;
    }

    public remove(i: number) {
         if (i < 0 || i >= this.noComponents) {
            throw new Error("Component index out of bounds");
        }
        let nameArray = this.splitEscaped(this.name, this.delimiter, true);
        nameArray.splice(i, 1);
        this.name = nameArray.join(this.delimiter);
        this.noComponents--;
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