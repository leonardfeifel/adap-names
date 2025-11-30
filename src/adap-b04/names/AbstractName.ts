import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertDelimiterIsValid(delimiter);
        this.delimiter = delimiter;
    }

    public clone(): Name {
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation or deletion");
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let result = []
        for (let i = 0; i < this.getNoComponents(); i++) {
            result.push(this.getComponent(i));
        }
        return result.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);

            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        this.assertNameIsValid(other);
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    // --- Assertions ---
    protected assertNameIsValid(name: Name): void {
        const condition: boolean = (name !== null && name !== undefined && name.getNoComponents() >= 0);
        IllegalArgumentException.assert(condition, "Name is not valid");
    }
     protected assertIndexInBounds(i: number): void {
        const condition: boolean = (i >= 0 && i < this.getNoComponents());
        IllegalArgumentException.assert(condition, "Component index out of bounds");
    }

    protected assertIndexInInsertBounds(i: number): void {
        const condition: boolean = (i >= 0 && i <= this.getNoComponents());
        IllegalArgumentException.assert(condition, "Component index out of bounds for insert");
    }

    protected assertDelimiterIsValid(delimiter: string): void {
        const condition: boolean = (delimiter !== null && delimiter.length == 1);
        IllegalArgumentException.assert(condition, "Delimiter is not valid");
    }

     protected assertNotNullOrUndefined(argument: any, message: string): void {
        const condition: boolean = (argument !== null && argument !== undefined);
        IllegalArgumentException.assert(condition, message);
    }

    protected assertLengthChanged(oldLength: number, change: number): void {
        const condition: boolean = (this.getNoComponents() === oldLength + change);
        MethodFailedException.assert(condition, "Method failed: components array length did not change as expected");
    }

    protected assertComponentAtIndexChanged(i: number, expectedValue: string): void {
        const condition: boolean = (this.getComponent(i) === expectedValue);
        MethodFailedException.assert(condition, "Method failed: component at index " + i + " did not change as expected");
    }

}