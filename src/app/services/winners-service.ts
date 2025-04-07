import { apiBase, requestURL } from './api-parameters';
import type { WinnerData } from '../utils/interfaces';

function isValidDataForWinners(data: unknown): data is WinnerData[] {
  return !(typeof data !== 'object' || data === null);
}

function isValidDataForWinner(data: unknown): data is WinnerData {
  return !(typeof data !== 'object' || data === null);
}

class WinnersService {
  private apiBase;
  private requestURL;
  constructor() {
    this.apiBase = apiBase;
    this.requestURL = requestURL.WINNERS;
  }

  public async getWinners(
    page: number,
    limit: number = 10,
  ): Promise<{ data: WinnerData[]; total: number; limit: number } | undefined> {
    const response = await fetch(`${this.apiBase}${this.requestURL}?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${this.apiBase}, status: ${response.status}`);
    }
    const total = Number(response.headers.get('X-Total-Count'));
    const data: unknown = await response.json();
    if (isValidDataForWinners(data) && total) {
      return { data, total, limit };
    }
  }

  public async getWinner(id: number): Promise<WinnerData | undefined> {
    const response = await fetch(`${this.apiBase}${this.requestURL}/${id}`);
    if (!response.ok && response.status !== 404) {
      throw new Error(`Could not fetch ${this.apiBase}, status: ${response.status}`);
    }
    if (response.status === 404) {
      throw new Error('This car win first time');
    }
    const data: unknown = await response.json();
    if (isValidDataForWinner(data)) {
      return data;
    }
  }

  public createWinner(data: WinnerData): void {
    fetch(`${this.apiBase}${this.requestURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error(`Can't create a new winner: ${error}`);
    });
  }

  public updateWinner(data: WinnerData): void {
    fetch(`${this.apiBase}${this.requestURL}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: data.time, wins: data.wins }),
    }).catch((error) => {
      console.error(`Can't update a winner: ${error}`);
    });
  }

  public deleteWinner(id: number): void {
    fetch(`${this.apiBase}${this.requestURL}/${id}`, {
      method: 'DELETE',
    }).catch((error) => {
      console.error(`Can't delete a winner: ${error}`);
    });
  }
}

const winnerService = new WinnersService();
export { winnerService, WinnersService };
