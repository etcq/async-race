export type ComponentProps = {
  tag: keyof HTMLElementTagNameMap;
  text?: string | number;
  classNames?: string[];
  listener?: { event: string; callback: (event: Event) => void };
  options?: {
    id?: string;
    for?: string;
    href?: string;
    src?: string;
  };
};

export class BaseComponent {
  protected element: HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
  private props: ComponentProps;

  constructor(props: ComponentProps) {
    if (!props) {
      throw new Error('Props cannot be undefined');
    }
    const element = document.createElement(props.tag);
    this.element = element;
    this.props = props;
    if (props.classNames) {
      this.element.classList.add(...props.classNames);
    }
    if (props.options) {
      for (const [key, value] of Object.entries(props.options)) {
        this.getElement().setAttribute(key, value);
      }
    }
    this.setTextContent();
  }

  public addChild(child: BaseComponent | Node): void {
    if (child instanceof BaseComponent) {
      this.element.append(child.getElement());
    } else {
      this.element.append(child);
    }
  }

  public makeDisabled(): void {
    this.element.setAttribute('disabled', 'true');
  }

  public makeEnabled(): void {
    this.element.removeAttribute('disabled');
  }

  public addChildren(...children: (BaseComponent | Node)[]): void {
    for (const child of children) {
      this.addChild(child);
    }
  }

  public getElement(): HTMLElementTagNameMap[keyof HTMLElementTagNameMap] {
    return this.element;
  }

  public removeElement(): void {
    this.getElement().remove();
  }

  public setTextContent(text?: string | number): void {
    text = typeof text === 'string' ? text : text?.toString();
    if (text) {
      this.element.textContent = text;
    } else if (this.props.text) {
      this.props.text = typeof this.props.text === 'string' ? this.props.text : this.props.text?.toString();
      this.element.textContent = this.props.text;
    }
  }

  public clearContent(): void {
    const htmlElement = this.getElement();
    while (htmlElement.firstElementChild) {
      htmlElement.firstElementChild.remove();
    }
  }
}
