import type { Point } from "../util/point.js";
import type { Zone } from "../world/zone.js";
import { Component } from "./component.js";

export class PositionComponent extends Component {
    constructor(private readonly zone : Zone, public position : Point = {x:0, y: 0})
    {
        super();
    }

    canMove() : boolean {return true}
    canMoveTo(p: Point) {
        return this.canMove() && true;
    }
    moveTo(p:Point) {
        
    }

    
}