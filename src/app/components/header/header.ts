import { BaseComponent } from '../factory-components/base-components';
import HeaderControls from './header-controls/header-controls';
import type Container from '../container/container';

import './header.scss';

export default class Header extends BaseComponent {
  constructor(container: Container) {
    super({
      tag: 'header',
      classNames: ['header'],
    });
    this.configureView(container);
  }

  private configureView(container: Container): void {
    const headerText = new BaseComponent({ tag: 'h1', classNames: ['header__text'], text: 'Async Race' });
    const headerControls = new HeaderControls(container);
    this.addChildren(headerText, headerControls);
  }
}
