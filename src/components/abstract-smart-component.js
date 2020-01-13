import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }


  // bicycle#1
  // rerender() {
  //   const oldElement = this.getElement();
  //   this.removeElement();
  //   const newElement = this.getElement();
  //   oldElement.replaceWith(newElement);
  //   this.recoveryListeners();
  // }

  // bicycle#2
  // rerender() {
  //   const oldElement = this.getElement();
  //   this.removeElement();
  //   oldElement.replaceWith(this.getElement());
  //   this.recoveryListeners();
  // }

}
