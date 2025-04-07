import type Container from '../components/container/container';

export default class Router {
  private container: Container;
  constructor(container: Container) {
    this.container = container;
    globalThis.addEventListener('popstate', this.handlePopState.bind(this));
    this.handlePopState();
  }

  public navigateTo(path: string): void {
    history.pushState({}, '', path);
    this.handlePopState();
  }

  private handlePopState(): void {
    const path = globalThis.location.pathname;
    if (path === '/') {
      globalThis.location.href = '/garage';
    }
    switch (path) {
      case `/garage`: {
        this.container.setContentToGarage();
        break;
      }
      case `/winners`: {
        this.container.setContentToWinners();
        break;
      }
      default: {
        break;
      }
    }
  }
}
