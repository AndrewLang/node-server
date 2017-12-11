export class ServiceToken {
    constructor(protected description: string) {

    }
    toString(): string {
        return this.description;
    }
}
