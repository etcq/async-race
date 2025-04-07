type CarData = { name: string; color: string; id: number };
type WinnerData = { id: number; wins: number; time: number };
type EngineCharacteristics = { velocity: number; distance: number };
type UpdateViewMethod = (name: string, color: string) => void;
export type { CarData, UpdateViewMethod, EngineCharacteristics, WinnerData };
