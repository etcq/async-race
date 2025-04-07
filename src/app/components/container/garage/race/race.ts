import type CarsTable from '../cars-table/cars-table';
import ButtonView from '../../../factory-components/button/button';
import Modal from './modal/modal';
import { BaseComponent } from '../../../factory-components/base-components';
import { winnerService } from '../../../../services/winners-service';

import './race.scss';

export default class Race extends BaseComponent {
  private table;
  private winner: string | undefined;
  private modal: Modal;
  private startBtn;
  private resetBtn;
  constructor(table: CarsTable) {
    super({
      tag: 'div',
      classNames: ['race'],
    });
    this.startBtn = new ButtonView({
      tag: 'button',
      classNames: ['btn', 'race-btn'],
      text: 'Race',
      listener: {
        event: 'click',
        callback: (): void => this.startRace(),
      },
    });
    this.resetBtn = new ButtonView({
      tag: 'button',
      classNames: ['btn', 'race-btn'],
      text: 'Reset',
      listener: {
        event: 'click',
        callback: (): void => this.resetRace(),
      },
    });
    this.table = table;
    this.winner = undefined;
    this.modal = new Modal();
    this.configureView();
  }

  public startRace(): void {
    this.startBtn.makeDisabled();
    this.resetBtn.makeEnabled();
    for (const car of this.table.getChildren()) {
      car.drive((name: string, time: string) => this.checkWinner(car.getId(), name, time));
    }
    this.winner = undefined;
  }

  public resetRace(): void {
    for (const car of this.table.getChildren()) {
      car.stopDrive();
    }
    this.startBtn.makeEnabled();
  }

  public checkWinner(id: number, name: string, time: string): void {
    if (!this.winner) {
      this.winner = name;
      this.renderModal(name, time);
      const stringTime = Number.parseFloat(time);
      winnerService
        .getWinner(id)
        .then((response) => {
          if (response) {
            const { id, wins } = response;
            let { time } = response;
            time = Math.min(time, stringTime);
            winnerService.updateWinner({ id, wins: wins + 1, time });
          }
        })
        .catch(() => {
          winnerService.createWinner({ id, wins: 1, time: stringTime });
        });
    }
  }

  private renderModal(name: string, time: string): void {
    this.startBtn.makeEnabled();
    this.modal.setTextContent(`Winner is ${name}, for ${time} seconds`);
    this.modal.getElement().showModal();
    setTimeout(() => this.modal.showPrompt(), 3000);
  }

  private configureView(): void {
    this.addChildren(this.startBtn, this.resetBtn);
  }
}
