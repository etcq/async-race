import { BaseComponent } from '../../../../../factory-components/base-components';
import ButtonView from '../../../../../factory-components/button/button';
import { carImg } from '../../../../../../utils/car-code';
import type CarsTableElement from '../cars-table-element';
import '../cars-table-element.scss';
import { serviceEngine } from '../../../../../../services/engine-service';
import CarsTableElementTrack from './cars-table-element-track/cars-table-element-track';

export default class CarsTableElementEngine extends BaseComponent {
  private parent: CarsTableElement;
  private start: BaseComponent;
  private stop: BaseComponent;
  private track: CarsTableElementTrack;
  private animationId: number | undefined;
  private speed: number;
  constructor(parent: CarsTableElement) {
    super({ tag: 'div', classNames: ['car-line'] });
    this.parent = parent;
    this.start = new ButtonView({
      tag: 'button',
      classNames: ['btn', 'car-engine__btn'],
      text: 'A',
      listener: {
        event: 'click',
        callback: (): void => this.startDrive(),
      },
    });
    this.speed = 0;
    this.animationId = undefined;
    this.stop = new ButtonView({
      tag: 'button',
      classNames: ['btn', 'car-engine__btn'],
      text: 'B',
      listener: { event: 'click', callback: (): void => this.driveReset() },
    });
    this.stop.makeDisabled();
    this.track = new CarsTableElementTrack(this.parent.getThisData().color);
    this.configureView();
  }

  public updateCarColor(color: string): void {
    this.track.getCar().getElement().innerHTML = carImg(color);
  }

  public driveView(duration: number): void {
    this.stopDrive();
    const width = this.track.getElement().clientWidth - 120;
    const start = performance.now();
    const animate = (time: number): void => {
      const currentDuration = time - start;
      const progress = Math.min(currentDuration / duration, 1);
      this.track.getCar().getElement().style.left = progress * width + 'px';
      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      }
    };
    this.animationId = requestAnimationFrame(animate);
  }

  public stopDrive(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

  public startDrive(method?: (name: string, time: string) => void): void {
    this.stop.makeEnabled();
    this.start.makeDisabled();
    serviceEngine
      .engineControl(this.parent.getId(), 'started')
      .then((response) => {
        if (response) {
          this.speed = response.distance / response.velocity;
        }
      })
      .then(() => {
        serviceEngine
          .engineDrive(this.parent.getId(), () => this.stopDrive())
          .then((response) => {
            if (response && method) {
              const data = this.parent.getThisData();
              method(data.name, (this.speed / 1000).toFixed(2));
            }
          })
          .catch((error) => console.error(error));
        this.driveView(this.speed);
      })
      .catch((error) => console.log(error));
  }

  public driveReset(): void {
    this.start.makeEnabled();
    this.stop.makeDisabled();
    serviceEngine
      .engineControl(this.parent.getId(), 'stopped')
      .then(() => {
        this.stopDrive();
        this.track.getCar().getElement().style.left = '0px';
      })
      .catch((error) => console.error(error));
  }

  private configureView(): void {
    this.addChildren(this.start, this.stop, this.track);
  }
}
