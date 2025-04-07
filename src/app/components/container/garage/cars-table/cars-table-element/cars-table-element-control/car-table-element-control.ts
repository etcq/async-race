import { BaseComponent } from '../../../../../factory-components/base-components';
import ButtonView from '../../../../../factory-components/button/button';
import type CarsTableElement from '../cars-table-element';

export default class CarsTableElementControl extends BaseComponent {
  private parent: CarsTableElement;
  private nameTitle: BaseComponent;
  constructor(parent: CarsTableElement) {
    super({ tag: 'div', classNames: ['car-control'] });
    this.parent = parent;
    this.nameTitle = new BaseComponent({
      tag: 'span',
      classNames: ['car-title'],
      text: this.parent.getThisData().name,
    });
    this.configureView();
  }

  public updateCarName(name: string): void {
    this.nameTitle.getElement().textContent = name;
  }

  private configureView(): void {
    const select = new ButtonView({
      tag: 'button',
      classNames: ['btn'],
      text: 'select',
      listener: {
        event: 'click',
        callback: (): void => {
          this.parent.selectCar();
        },
      },
    });
    const remove = new ButtonView({
      tag: 'button',
      classNames: ['btn'],
      text: 'remove',
      listener: { event: 'click', callback: (): void => this.parent.deleteCar() },
    });

    this.addChildren(select, remove, this.nameTitle);
  }
}
