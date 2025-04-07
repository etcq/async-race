import { BaseComponent } from '../../factory-components/base-components';
import Pagination from '../../factory-components/pagination/pagination';
import WinnerTable from './winners-table/winners-table';

export default class Winners extends BaseComponent {
  private header;
  private table;
  private pagination;
  constructor() {
    super({
      tag: 'div',
      classNames: ['winners'],
    });
    this.header = new BaseComponent({ tag: 'h2', classNames: ['garage-header'], text: 'Winners' });
    this.table = new WinnerTable(this);
    this.pagination = new Pagination(this.table, () => this.table.renderWinners());

    this.configureView();
  }

  public headerUpdate(total: number): void {
    this.pagination.checkValidButton();
    this.header.setTextContent(`Winners (${total})`);
  }

  public updateTable(): void {
    this.table.updateWinnersView();
  }

  private configureView(): void {
    this.addChildren(this.header, this.pagination, this.table);
  }
}
