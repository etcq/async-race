import { BaseComponent, type ComponentProps } from '../base-components';
import './button.scss';

const defaultButtonProps: ComponentProps = {
  tag: 'button',
  classNames: ['btn'],
  text: 'click',
};

export default class ButtonView extends BaseComponent {
  constructor(props: ComponentProps = defaultButtonProps) {
    super(props);
    if (props.listener) {
      this.getElement().addEventListener(props.listener.event, props.listener.callback);
    }
  }
}
