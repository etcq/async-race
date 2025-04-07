import { BaseComponent, type ComponentProps } from '../../base-components';

export type ComponentInputProps = ComponentProps & {
  options: {
    placeholder?: string;
    type?: string;
    name?: string;
    min?: string;
    max?: string;
    required?: boolean;
  };
};

export default class InputComponent extends BaseComponent {
  declare protected element: HTMLElementTagNameMap['input'] | HTMLElementTagNameMap['textarea'];
  constructor(props: ComponentInputProps) {
    super(props);
  }

  public getValue(): string {
    return this.element.value;
  }

  public setValue(value: string = ''): void {
    this.element.value = value;
  }
}
