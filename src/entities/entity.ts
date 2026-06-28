import type { Component } from "../component/component.js";

type ComponentConstructor<T> = (new (...args: any[]) => T) & {
  registerAs?: Function;
};

export class Entity {
  components = new Map<Function, unknown>();

  constructor(...components: Component[]) {
    for (const component of components) {
      this.addComponent(component);
    }
  }

  addComponent(comp: Component): void {
    this.components.set(
      (comp.constructor as ComponentConstructor<any>).registerAs ??
        comp.constructor,
      comp,
    );
    comp.setEntity(this);
  }

  getComponent<T>(ctor: ComponentConstructor<T>): T | undefined {
    // This is me promising I know what I'm returning
    return this.components.get(ctor) as T | undefined;
  }

  hasComponent<T>(ctor: ComponentConstructor<T>): boolean {
    return this.components.has(ctor);
  }
}
