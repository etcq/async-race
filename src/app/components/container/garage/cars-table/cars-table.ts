import { service } from '../../../../services/garage-service';
import CarsTableElement from './cars-table-element/cars-table-element';
import type { CarData, UpdateViewMethod } from '../../../../utils/interfaces';
import type Garage from '../garage';
import Table from '../../../factory-components/table/table';

import './cars-table.scss';

export default class CarsTable extends Table {
  public selectCar: CarData;
  declare protected parent: Garage;
  constructor(parent: Garage) {
    super(parent, {
      tag: 'div',
      classNames: ['cars-table'],
    });
    this.selectCar = { id: 0, name: '', color: '' };
    this.limit = 7;
    this.configureView();
  }

  public renderCars(): void {
    service
      .getCars(this.currentPage)
      .then((response) => {
        if (response) {
          const { data, total, limit } = response;
          for (const car of data) {
            const { id, name, color } = car;
            const element = new CarsTableElement(this, id, name, color);
            this.addChild(element);
            this.children.add(element);
          }
          this.total = total;
          this.limit = limit;
          this.parent.headerUpdate(this.total);
        }
      })
      .catch((error) => console.log(`Error of render cars ${error}`));
  }

  public getSelectCar(data: CarData, method: UpdateViewMethod): void {
    this.parent.sendToUpdateForm(data, method);
  }

  public renderCar(name: string, color: string): void {
    const length = this.getElement().children.length - 1;
    const element = new CarsTableElement(this, length, name, color);
    this.addChild(element);
    this.children.add(element);
    this.parent.headerUpdate(this.incRow());
  }

  private configureView(): void {
    this.renderCars();
  }
}
