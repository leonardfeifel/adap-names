import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";


enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        this.assertIsNotOpen();
        this.assertIsNotDeleted();
        // do something
        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        this.assertIsOpen();
        // read something
        return new Int8Array();
    }

    public close(): void {
        this.assertIsOpen();
        // do something
        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    // --- Assertions ---
    protected assertIsNotOpen(): void {
        const condition: boolean = (this.state !== FileState.OPEN);
        IllegalArgumentException.assert(condition, "File is already open");
    }
    
    protected assertIsNotDeleted(): void {
        const condition: boolean = (this.state !== FileState.DELETED);
        IllegalArgumentException.assert(condition, "File is deleted");
    }

    protected assertIsOpen(): void {
        const condition: boolean = (this.state === FileState.OPEN);
        IllegalArgumentException.assert(condition, "File must be open to perform this operation");
    }

}