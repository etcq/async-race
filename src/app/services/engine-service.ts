import { apiBase, requestURL } from './api-parameters';
import type { EngineCharacteristics } from '../utils/interfaces';

function isValidDataForEngine(data: unknown): data is EngineCharacteristics {
  return !(typeof data !== 'object' || data === null);
}

export default class EngineService {
  private apiBase;
  private requestURL;
  constructor() {
    this.apiBase = apiBase;
    this.requestURL = requestURL.ENGINE;
  }

  public async engineControl(id: number, status: string): Promise<EngineCharacteristics | undefined> {
    const response = await fetch(`${this.apiBase}${this.requestURL}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${this.apiBase}, status: ${response.status}`);
    }
    const data: unknown = await response.json();
    if (isValidDataForEngine(data)) {
      return data;
    }
  }

  public async engineDrive(id: number, stop: () => void): Promise<boolean | undefined> {
    const response = await fetch(`${this.apiBase}${this.requestURL}?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    try {
      if (response.status === 500) {
        stop();
      }
      if (response.status === 200) {
        return true;
      }
    } catch {
      console.error(`Car can't drive`);
    }
  }
}

const serviceEngine = new EngineService();
export { serviceEngine };
