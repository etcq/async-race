import { carImg } from '../../../../../utils/car-code';
import { BaseComponent } from '../../../../factory-components/base-components';

import './winners-table-element.scss';

export default class WinnersTableElement extends BaseComponent {
  private id;
  private color;
  private car;
  private name;
  private wins;
  private time;
  constructor(id: number, color: string, name: string, wins: number, time: number) {
    super({
      tag: 'tr',
      classNames: ['winner-table-element'],
    });
    this.id = id;
    this.color = color;
    this.car = new BaseComponent({ tag: 'div', classNames: ['car-img'] });
    this.name = name;
    this.wins = wins;
    this.time = `${time} seconds`;
    this.configureView();
  }

  private createCell(data: string | number | BaseComponent): void {
    const cell = new BaseComponent({ tag: 'th', classNames: ['table-cell'] });
    if (data instanceof BaseComponent) {
      cell.addChild(data);
    } else {
      cell.setTextContent(data);
    }
    this.addChild(cell);
  }

  private configureView(): void {
    this.car.getElement().innerHTML = carImg(this.color);
    const data = [this.id, this.car, this.name, this.wins, this.time];
    for (const cell of data) {
      this.createCell(cell);
    }
  }
}
