export default interface Alert {
  new (title: string, message: string);

  // Displays alert
  show: (callback: (selectedIndex: number) => void) => Promise<Alert>;

  // Adds an option button to the alert
  addOption: (option: string) => void;
}
