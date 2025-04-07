import Container from './components/container/container';
import Header from './components/header/header';

export default class App {
  private parent: HTMLElement;
  private container: Container;
  private header: Header;
  constructor() {
    this.parent = document.body;
    this.container = new Container();
    this.header = new Header(this.container);
  }

  public createView(): void {
    this.parent.append(this.header.getElement(), this.container.getElement());
  }
}
