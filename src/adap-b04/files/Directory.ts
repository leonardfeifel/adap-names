import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        this.assertArgumentNotNull(cn, "Child node cannot be null");
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.assertArgumentNotNull(cn, "Child node cannot be null");
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.assertHasChildNode(cn);
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    // --- Assertions ---
    protected assertHasChildNode(cn: Node): void {
        const condition: boolean = this.childNodes.has(cn);
        MethodFailedException.assert(condition, "Directory does not contain the specified child node");
    }

    protected assertArgumentNotNull(argument: any, message: string): void {
        const condition: boolean = (argument !== null && argument !== undefined);
        IllegalArgumentException.assert(condition, message);
    }

}