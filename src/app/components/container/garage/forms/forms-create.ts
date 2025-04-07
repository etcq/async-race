import ButtonView from '../../../factory-components/button/button';
import FormGarage from '../../../factory-components/form/form-garage';
import { service } from '../../../../services/garage-service';
import type CarsTable from '../cars-table/cars-table';
import type Garage from '../garage';

export default class FormCreate extends FormGarage {
  private parent: Garage;
  private table;
  constructor(parent: Garage, table: CarsTable) {
    super();
    this.parent = parent;
    this.table = table;
    this.configureView();
  }

  private createCarWithForm(event: Event): void {
    if (event.target instanceof HTMLFormElement) {
      const data = new FormData(event.target);
      const stringData = JSON.stringify(Object.fromEntries(data));
      service.createCar(stringData);
      if (this.table.getElement().children.length < 7) {
        this.table.renderCar(this.name.getValue(), this.color.getValue());
      } else {
        this.parent.headerUpdate(this.table.incRow());
      }
      this.name.setValue('');
    }
  }

  private configureView(): void {
    const button = new ButtonView({
      tag: 'button',
      classNames: ['btn'],
      text: 'Create',
    });
    this.getElement().addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.createCarWithForm(event);
    });
    this.addChild(button);
  }
}
