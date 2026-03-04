declare module '@event-calendar/core' {
  import type { SvelteComponent } from 'svelte';
  
  export class Calendar extends SvelteComponent<{
    plugins: any[];
    options: any;
  }> {}
  
  export class DayGrid {
    constructor();
  }
  
  export function createCalendar(target: HTMLElement, plugins: any[], options: any): any;
  export function destroyCalendar(calendar: any): void;
}
