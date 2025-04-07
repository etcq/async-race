// import { BaseComponent } from '../../../factory-components/base-components';
import ButtonView from '../../../factory-components/button/button';
import { service } from '../../../../services/garage-service';
import type Garage from '../garage';
import type CarsTable from '../cars-table/cars-table';
import { brand, model } from '../../../../utils/cars-data';

import './generate.scss';

export default class GenerateCar extends ButtonView {
  private brand;
  private model;
  private color;
  private parent;
  private table;
  constructor(parent: Garage, table: CarsTable) {
    super({
      tag: 'button',
      classNames: ['btn', 'generate-btn'],
      text: 'Generate cars',
      listener: {
        event: 'click',
        callback: (): void => this.renderHundredCars(),
      },
    });
    this.parent = parent;
    this.table = table;
    this.brand = brand;
    this.model = model;
    this.color = '';
  }

  private getNewCarData(): { name: string; color: string } {
    return { name: this.getNewCarName(), color: this.getNewCarColor() };
  }

  private renderHundredCars(): void {
    for (let i = 0; i < 100; i++) {
      for (let j = this.table.getElement().children.length; j < 7; j++) {
        const { name, color } = this.getNewCarData();
        this.table.renderCar(name, color);
        this.parent.headerUpdate(this.table.decRow());
      }
      service.createCar(JSON.stringify(this.getNewCarData()));
      this.parent.headerUpdate(this.table.incRow());
    }
  }

  private getNewCarName(): string {
    return `${this.brand[Math.floor(Math.random() * 10)]} ${this.model[Math.floor(Math.random() * 10)]}`;
  }

  private getNewCarColor(): string {
    this.color = `#${Math.floor(Math.random() * 0xff_ff_ff)
      .toString(16)
      .padEnd(6, '0')}`;
    return this.color;
  }
}
