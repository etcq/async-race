import { BaseComponent } from '../../../factory-components/base-components';
import WinnerTableHead from './winners-table-head/winners-table-head';
import { winnerService } from '../../../../services/winners-service';
import { service } from '../../../../services/garage-service';
import WinnersTableElement from './winners-table-element/winners-table-element';
import Table from '../../../factory-components/table/table';
import type Winners from '../winner';

import './winners-table.scss';
export default class WinnerTable extends Table {
  public body;
  private head;
  private tableLast;
  constructor(parent: Winners) {
    super(parent, {
      tag: 'table',
      classNames: ['winners-table'],
    });
    this.head = new WinnerTableHead();
    this.body = new BaseComponent({ tag: 'tbody', classNames: ['winner-table-body'] });
    this.tableLast = 1;
    this.configureView();
  }

  public renderWinners(): void {
    winnerService
      .getWinners(this.currentPage)
      .then((response) => {
        if (response) {
          const { data, total, limit } = response;
          for (const winner of data) {
            const { id, time, wins } = winner;
            service
              .getCar(id)
              .then((response) => {
                if (response) {
                  const { name, color } = response;
                  const element = new WinnersTableElement(this.tableLast, color, name, wins, time);
                  this.tableLast++;
                  this.body.addChild(element);
                }
              })
              .catch((error) => console.error(error));
            this.total = total;
            this.limit = limit;
            this.parent.headerUpdate(this.total);
          }
        }
      })
      .catch((error) => console.error(error));
  }

  public updateWinnersView(): void {
    this.tableLast = 1;
    this.body.clearContent();
    this.renderWinners();
  }

  private configureView(): void {
    this.addChild(this.head);
    this.addChild(this.body);
  }
}
