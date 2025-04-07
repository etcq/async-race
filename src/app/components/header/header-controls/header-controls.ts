import type Container from '../../container/container';
import { BaseComponent } from '../../factory-components/base-components';
import ButtonView from '../../factory-components/button/button';

import '../../factory-components/button/button.scss';

export default class HeaderControls extends BaseComponent {
  private container: Container;
  constructor(container: Container) {
    super({
      tag: 'div',
      classNames: ['header__controls'],
    });
    this.container = container;
    this.configureView();
  }

  private configureView(): void {
    const toGarage = new ButtonView({
      tag: 'button',
      classNames: ['btn'],
      text: 'garage',
      listener: {
        event: 'click',
        callback: (): void => this.container.routerGarage(),
      },
    });
    const toWinners = new ButtonView({
      tag: 'button',
      classNames: ['btn'],
      text: 'winners',
      listener: { event: 'click', callback: (): void => this.container.routerWinners() },
    });
    this.addChildren(toGarage, toWinners);
  }
}
