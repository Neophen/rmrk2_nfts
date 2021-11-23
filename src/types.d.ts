export interface IBasePart {
  id: string;
  type: 'slot' | 'fixed';
  equippable?: string[] | '*';
  unequip?: 'unequip' | 'burn';
  z?: number;
  src?: string;
  name?: string;
}

export interface BasePart extends IBasePart {
  key: string;
  folderCID?: string;
  preview?: string;
  parts?: IBasePart[];
}

export enum ICONS {
  trash = 'trash',
  drag = 'drag',
}

export interface BaseSettings {
  name: string;
  description?: string;
  width: number;
  height: number;
}
