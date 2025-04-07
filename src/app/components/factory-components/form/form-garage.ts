import { BaseComponent } from '../base-components';
import InputComponent from './input/input';

import './form.scss';

export default class FormGarage extends BaseComponent {
  declare protected element: HTMLFormElement;
  protected name: InputComponent;
  protected color: InputComponent;

  constructor() {
    super({
      tag: 'form',
      classNames: ['garage-form'],
    });
    this.name = new InputComponent({
      tag: 'input',
      classNames: ['garage__form_input'],
      options: {
        id: 'car-name',
        type: 'text',
        name: 'name',
        placeholder: 'Enter car name',
        required: true,
      },
    });
    this.color = new InputComponent({
      tag: 'input',
      classNames: ['garage__form_input'],
      options: {
        id: 'car-color',
        type: 'color',
        name: 'color',
      },
    });
    this.configureInputView();
  }

  private configureInputView(): void {
    this.addChildren(this.name, this.color);
  }
}
