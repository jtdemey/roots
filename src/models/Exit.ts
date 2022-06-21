export interface Exit {
  description: string;
	destination: string;
	direction: string;
	duration: number;
	exitPhrase: string;
  locked: boolean;
  visibilityThreshold: number;
}
