import { BaseComponent } from '../../../../factory-components/base-components';

import './modal.scss';

export default class Modal extends BaseComponent {
  declare protected element: HTMLElementTagNameMap['dialog'];
  constructor() {
    super({
      tag: 'dialog',
      classNames: ['modal'],
      text: 'This is winner',
    });
    this.configureView();
  }

  public getElement(): HTMLElementTagNameMap['dialog'] {
    return this.element;
  }

  public showPrompt(): void {
    const prompt = new BaseComponent({
      tag: 'span',
      classNames: ['modal-prompt'],
      text: 'click anywhere...',
    });
    this.addChild(prompt);
  }

  private configureView(): void {
    document.body.append(this.getElement());
    this.getElement().addEventListener('click', () => {
      this.getElement().close();
    });
  }
}
