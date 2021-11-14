export interface IBasePart {
  id: string;
  type: 'slot' | 'fixed';
  equippable?: string[] | '*';
  unequip?: 'unequip' | 'burn';
  z?: number;
  src?: string;
}

export interface BasePart extends IBasePart {
  key: string;
  preview?: string;
}
