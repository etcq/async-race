import type { CarData } from '../utils/interfaces';
import { apiBase, requestURL } from './api-parameters';

function isValidDataForCars(data: unknown): data is CarData[] {
  return !(typeof data !== 'object' || data === null);
}

function isValidDataForCar(data: unknown): data is CarData {
  return !(typeof data !== 'object' || data === null);
}

class GarageService {
  private apiBase: string;
  private requestURL: string;
  constructor() {
    this.apiBase = apiBase;
    this.requestURL = requestURL.GARAGE;
  }

  public async getCars(
    page: number,
    limit: number = 7,
  ): Promise<{ data: CarData[]; total: number; limit: number } | undefined> {
    const response = await fetch(`${this.apiBase}${this.requestURL}?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${this.apiBase}, status: ${response.status}`);
    }
    const total = Number(response.headers.get('X-Total-Count'));
    const data: unknown = await response.json();
    if (isValidDataForCars(data) && total) {
      return { data, total, limit };
    }
  }

  public async getCar(id: number): Promise<CarData | undefined> {
    const response = await fetch(`${this.apiBase}${this.requestURL}/${id}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${this.apiBase}, status: ${response.status}`);
    }
    const data: unknown = await response.json();
    if (isValidDataForCar(data)) {
      return data;
    }
  }

  public createCar(data: string): void {
    fetch(`${this.apiBase}${this.requestURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    }).catch((error) => {
      console.error(`Can't create a new car: ${error}`);
    });
  }

  public deleteCar(id: number): void {
    fetch(`${this.apiBase}${this.requestURL}/${id}`, {
      method: 'DELETE',
    }).catch((error) => {
      console.error(`Can't delete a car: ${error}`);
    });
  }

  public updateCar(form: HTMLFormElement, id: number): void {
    const data = new FormData(form);
    fetch(`${this.apiBase}${this.requestURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(data)),
    }).catch((error) => {
      console.error(`Can't update a car: ${error}`);
    });
  }
}
const service = new GarageService();
export { service, GarageService };
