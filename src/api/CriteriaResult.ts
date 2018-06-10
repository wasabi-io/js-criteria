export default class CriteriaResult<E> {
    private readonly _total: number;
    private readonly _data: E[];

    public constructor(total: number, data: E[]) {
        this._total = total;
        this._data = data;
    }

    public get total(): number {
        return this._total;
    }

    public get data(): E[] {
        return this._data;
    }
}
