import CarsTable from '../../container/garage/cars-table/cars-table';
import type WinnerTable from '../../container/winners/winners-table/winners-table';
import { BaseComponent } from '../base-components';
import ButtonView from '../button/button';

import './pagination.scss';

export default class Pagination extends BaseComponent {
  protected buttonPrev;
  protected buttonNext;
  protected pageTitle;
  protected table;
  protected renderFunction: () => void;
  constructor(table: CarsTable | WinnerTable, renderFunction: () => void) {
    super({
      tag: 'div',
      classNames: ['page-controls'],
    });
    this.table = table;
    this.buttonPrev = new ButtonView({
      tag: 'button',
      classNames: ['btn', 'page-controls-btn'],
      text: 'prev',
      listener: {
        event: 'click',
        callback: (): void => {
          this.setPage(() => this.table.decPage());
        },
      },
    });
    this.buttonNext = new ButtonView({
      tag: 'button',
      classNames: ['btn', 'page-controls-btn'],
      text: 'next',
      listener: {
        event: 'click',
        callback: (): void => {
          this.setPage(() => this.table.incPage());
        },
      },
    });
    this.pageTitle = new BaseComponent({
      tag: 'span',
      classNames: ['page-controls-title'],
      text: `Page #${this.table.getCurrentPage()}`,
    });
    this.renderFunction = renderFunction;
    this.configureView();
  }

  public updatePage(): void {
    this.pageTitle.setTextContent(`Page #${this.table.getCurrentPage()}`);
  }

  public checkValidButton(): void {
    if (this.table.getCurrentPage() <= 1) {
      this.buttonPrev.getElement().setAttribute('disabled', 'true');
    } else {
      this.buttonPrev.getElement().removeAttribute('disabled');
    }
    if (this.table.getCurrentPage() >= Math.ceil(this.table.getTotal() / this.table.getLimit())) {
      this.buttonNext.getElement().setAttribute('disabled', 'true');
    } else {
      this.buttonNext.getElement().removeAttribute('disabled');
    }
  }

  protected setPage(pageChange: () => void): void {
    if (this.table instanceof CarsTable) {
      this.table.clearContent();
    } else {
      this.table.body.clearContent();
    }
    pageChange();
    this.updatePage();
    this.table.removeChildren();
    this.renderFunction();
    this.checkValidButton();
  }

  private configureView(): void {
    this.checkValidButton();
    this.addChildren(this.buttonPrev, this.pageTitle, this.buttonNext);
  }
}
