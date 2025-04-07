import type { CarData, UpdateViewMethod } from '../../../utils/interfaces';
import Race from './race/race';
import { BaseComponent } from '../../factory-components/base-components';
import CarsTable from './cars-table/cars-table';
import FormCreate from './forms/forms-create';
import FormUpdate from './forms/forms-update';
import GenerateCar from './generate-cars/generate-cars';
import Pagination from '../../factory-components/pagination/pagination';

import './garage.scss';

export default class Garage extends BaseComponent {
  private formCreate: FormCreate;
  private formUpdate: FormUpdate;
  private header: BaseComponent;
  private carsTable: CarsTable;
  private generate;
  private race;
  private pagination: Pagination;
  constructor() {
    super({
      tag: 'div',
      classNames: ['garage'],
    });
    this.header = new BaseComponent({ tag: 'h2', classNames: ['garage-header'], text: 'Garage' });
    this.carsTable = new CarsTable(this);
    this.pagination = new Pagination(this.carsTable, () => this.carsTable.renderCars());
    this.formCreate = new FormCreate(this, this.carsTable);
    this.formUpdate = new FormUpdate();
    this.generate = new GenerateCar(this, this.carsTable);
    this.race = new Race(this.carsTable);
    this.configureView();
  }

  public sendToUpdateForm(data: CarData, method: UpdateViewMethod): void {
    this.formUpdate.setSelectedCar(data, method);
  }

  public headerUpdate(total: number): void {
    this.pagination.checkValidButton();
    this.header.setTextContent(`Garage (${total})`);
  }

  private configureView(): void {
    this.addChildren(
      this.formCreate,
      this.formUpdate,
      this.generate,
      this.race,
      this.header,
      this.pagination,
      this.carsTable,
    );
  }
}
