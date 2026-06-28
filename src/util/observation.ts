export class Signal<T> {
    observers : Set<((arg: T) => void)> = new Set();
    // Note an arrow function must be used here unless you wish to perish
    attach(observer : (arg: T) => void) {
        this.observers.add(observer);
    }
    detach(observer : (arg: T) => void) {
        this.observers.delete(observer);
    }
    emit(val : T) {
        for (const obs of this.observers)
        {
            obs(val);
        }
    }
}