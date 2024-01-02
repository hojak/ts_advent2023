export class HikingMap {
    private _map: string;
    private _width: number;
    private _height: number;
    
    constructor ( map: string ) {
        this._map = map.replace(/\n/g, "");
        this._width = map.indexOf("\n");
        this._height = map.length - this._map.length + 1;
    }
    public get width(): number {
        return this._width;
    }
    public get height(): number {
        return this._height;
    }
}