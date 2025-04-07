import { BaseComponent } from '../../../../factory-components/base-components';

import './winners-table-head.scss';

export default class WinnerTableHead extends BaseComponent {
  constructor() {
    super({
      tag: 'thead',
      classNames: ['winners-table-head'],
    });
    this.configureView();
  }

  private createCell(text: string): void {
    const cell = new BaseComponent({ tag: 'th', classNames: ['head-cell'], text: text });
    this.addChild(cell);
  }

  private configureView(): void {
    const headTitle = ['Number', 'Car', 'Name', 'Wins', 'Best time'];
    for (const title of headTitle) {
      this.createCell(title);
    }
  }
}
