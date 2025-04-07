import { BaseComponent } from '../../../../../../factory-components/base-components';
import { carImg } from '../../../../../../../utils/car-code';
import '../../cars-table-element.scss';
import flagPath from '../../../../../../../../assets/flag.png';

export default class CarsTableElementTrack extends BaseComponent {
  private car;
  private color;
  private flag;
  constructor(color: string) {
    super({ tag: 'div', classNames: ['car-table-element-track'] });
    this.car = new BaseComponent({ tag: 'div', classNames: ['car-img'] });
    this.flag = new BaseComponent({ tag: 'img', classNames: ['car-table-element-flag'], options: { src: flagPath } });
    this.color = color;
    this.configureView();
  }

  public getCar(): BaseComponent {
    return this.car;
  }

  private configureView(): void {
    this.car.getElement().innerHTML = carImg(this.color);
    this.addChildren(this.car, this.flag);
  }
}
