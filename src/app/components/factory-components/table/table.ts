import type CarsTableElement from '../../container/garage/cars-table/cars-table-element/cars-table-element';
import type Garage from '../../container/garage/garage';
import type Winners from '../../container/winners/winner';
import { BaseComponent, type ComponentProps } from '../base-components';

export default class Table extends BaseComponent {
  protected parent;
  protected total: number;
  protected limit: number;
  protected currentPage: number;
  protected children: Set<CarsTableElement>;
  constructor(parent: Garage | Winners, props: ComponentProps) {
    super(props);
    this.parent = parent;
    this.currentPage = 1;
    this.total = 1;
    this.limit = 10;
    this.children = new Set();
  }

  public getChildren(): Set<CarsTableElement> {
    return this.children;
  }

  public removeChildren(): void {
    this.children = new Set();
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public getTotal(): number {
    return this.total;
  }

  public getLimit(): number {
    return this.limit;
  }

  public incPage(): void {
    this.currentPage++;
  }

  public decPage(): void {
    this.currentPage--;
  }

  public incRow(): number {
    this.total++;
    this.parent.headerUpdate(this.total);
    return this.total;
  }

  public decRow(): number {
    this.total--;
    this.parent.headerUpdate(this.total);
    return this.total;
  }
}
