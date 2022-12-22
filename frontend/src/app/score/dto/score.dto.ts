export interface Run {
  readonly id: string;
  readonly number: number;
  readonly points: number;
  readonly time: number;
  readonly firstReview: string;
  readonly secondReview: string;
}

export interface Score {
    readonly id?: string;
    readonly teamname: string;
    readonly location: string;
    readonly discipline: string;
    readonly originalId?: string;
    readonly runs?: string[];
}

export interface FullScore extends Omit<Score, 'runs'> {
  readonly runs: Run[];
}

export interface Team {
  readonly id: string;
  readonly name: string;
  readonly league: string;
  readonly discipline: string;
  readonly location: string;
}
