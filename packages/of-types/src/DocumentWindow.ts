import Window from './Window';
import DatabaseObject from './DatabaseObject';
import ForecastDay from './ForecastDay';
import ContentTree from './ContentTree';
import SidebarTree from './SidebarTree';
import Selection from './Selection';
import Project from './Project';
import Folder from './Folder';

export default interface DocumentWindow extends Window {
  selectObjects: (objects: DatabaseObject[]) => void;
  forecastDayForDate: (date: Date) => ForecastDay;
  selectForecastDays: (days: ForecastDay[]) => void;

  readonly content: ContentTree | null;
  focus: (Project | Folder)[] | null;
  readonly isTab: boolean;
  perspective: any;
  readonly selection: Selection;
  readonly sidebar: SidebarTree | null;
  readonly tabGroupWindows: DocumentWindow[];
}
