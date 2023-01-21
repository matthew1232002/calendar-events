export interface EventItem {
  title: string;
  label: string[];
  day: number;
  id: number;
}

export enum EventActionsType {
  IMPORT = 'IMPORT',
  PUSH = 'PUSH',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum DateFormat {
  STANDART = 'DD-MM-YY',
  DAYWEEK = 'ddd',
  DAYNUM = 'DD',
  MODAL = 'dddd, MMMM DD',
  HEADER = 'MMMM YYYY',
}
