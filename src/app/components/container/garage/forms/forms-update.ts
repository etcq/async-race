import type { CarData } from '../../../../utils/interfaces';
import { service } from '../../../../services/garage-service';
import ButtonView from '../../../factory-components/button/button';
import FormGarage from '../../../factory-components/form/form-garage';
import type { UpdateViewMethod } from '../../../../utils/interfaces';

export default class FormUpdate extends FormGarage {
  private idCar: number;
  private method: undefined | UpdateViewMethod;
  private button: ButtonView;
  constructor() {
    super();
    this.idCar = 0;
    this.method = undefined;
    this.button = new ButtonView({
      tag: 'button',
      classNames: ['btn'],
      text: 'Update',
    });
    this.configureView();
  }

  public setSelectedCar({ id, name, color }: CarData, method: UpdateViewMethod): void {
    this.idCar = id;
    this.name.setValue(name);
    this.color.setValue(color);
    this.name.makeEnabled();
    this.color.makeEnabled();
    this.method = method;
  }

  private configureView(): void {
    this.addChild(this.button);
    this.name.makeDisabled();
    this.color.makeDisabled();
    this.getElement().addEventListener('submit', (event: Event) => {
      event.preventDefault();
      if (this.method) {
        this.method(this.name.getValue(), this.color.getValue());
      }
      service.updateCar(this.element, this.idCar);
      this.name.makeDisabled();
      this.name.setValue('');
      this.color.makeDisabled();
    });
  }
}
