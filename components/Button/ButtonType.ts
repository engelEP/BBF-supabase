export interface IButton {
  text: string,
  typeButton: buttonType,
  colorButton: buttonColor
  clicked: any
}

type buttonType = 'submit' | 'button';
type buttonColor = 'RED' | 'GREEN' | 'YELLOW' | 'PRIMARY';
