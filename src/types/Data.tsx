import { User } from "./User";

export interface Data {
 count: number;
 next: string;
 previous: null | string;
 results: User[];
}