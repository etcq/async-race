import Router from '../../router/router';
import { BaseComponent } from '../factory-components/base-components';
import Garage from './garage/garage';
import Winners from './winners/winner';

import './_container.scss';

export default class Container extends BaseComponent {
  private garage: Garage;
  private winners: Winners;
  private router: Router;
  constructor() {
    super({
      tag: 'main',
      classNames: ['container'],
    });
    this.garage = new Garage();
    this.winners = new Winners();
    this.router = new Router(this);
  }

  public routerGarage(): void {
    this.router.navigateTo('/garage');
  }

  public routerWinners(): void {
    this.router.navigateTo('/winners');
  }

  public setContentToGarage(): void {
    this.clearContent();
    this.addChild(this.garage);
  }

  public setContentToWinners(): void {
    this.clearContent();
    this.winners.updateTable();
    this.addChild(this.winners);
  }
}
