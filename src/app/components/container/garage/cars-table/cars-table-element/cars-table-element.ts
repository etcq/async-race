import { BaseComponent, type ComponentProps } from '../../../../factory-components/base-components';
import type CarsTable from '../cars-table';
import { service } from '../../../../../services/garage-service';
import CarsTableElementControl from './cars-table-element-control/car-table-element-control';
import CarsTableElementEngine from './cars-table-element-engine/cars-table-element-engine';
import type { CarData } from '../../../../../utils/interfaces';
import { winnerService } from '../../../../../services/winners-service';

import './cars-table-element.scss';
export default class CarsTableElement extends BaseComponent {
  private id: number;
  private name: string;
  private color: string;
  private parent: CarsTable;
  private controls: CarsTableElementControl;
  private engine: CarsTableElementEngine;
  constructor(parent: CarsTable, id: number, name: string, color: string) {
    const props: ComponentProps = {
      tag: 'div',
      classNames: ['car'],
      options: {
        id: id.toString(),
      },
    };
    super(props);
    this.id = id;
    this.parent = parent;
    this.name = name;
    this.color = color;
    this.controls = new CarsTableElementControl(this);
    this.engine = new CarsTableElementEngine(this);
    this.configureView();
  }

  public deleteCar(): void {
    this.getElement().remove();
    service.deleteCar(this.id);
    winnerService.deleteWinner(this.id);
    this.parent.decRow();
  }

  public updateCarView = (name: string, color: string): void => {
    this.controls.updateCarName(name);
    this.engine.updateCarColor(color);
  };

  public getThisData(): CarData {
    return { id: this.id, name: this.name, color: this.color };
  }

  public getId(): number {
    return this.id;
  }

  public selectCar(): void {
    this.parent.getSelectCar(this.getThisData(), this.updateCarView);
  }

  public drive(method: (name: string, time: string) => void): void {
    this.engine.startDrive(method);
  }

  public stopDrive(): void {
    this.engine.driveReset();
  }

  private configureView(): void {
    this.addChildren(this.controls, this.engine);
  }
}
