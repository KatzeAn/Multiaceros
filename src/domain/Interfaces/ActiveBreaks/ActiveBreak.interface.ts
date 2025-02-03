export interface ActiveBreak {
  id?: number;
  date: string;
  startTime: {
    ticks: number;
  };
  description: string;
  isActive: boolean;
  modifiedBy: string;
}
