import { Signal } from "../util/observation.js";

export class InputHandler {

    upPressed = new Signal<void>();
    downPressed = new Signal<void>();
    leftPressed = new Signal<void>();
    rightPressed = new Signal<void>();

    handle = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowUp":
            case "w":
                this.upPressed.emit()
                break;
            case "ArrowDown":
            case "s":
                this.downPressed.emit()
                break;
            case "ArrowLeft":
            case "a":
                this.leftPressed.emit()
                break;
            case "ArrowRight":
            case "d":
                this.rightPressed.emit()
                break;
            default:
                return; // exit this handler for other keys
        }
    };
}