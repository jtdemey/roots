export interface GameEvent {
	eventName?: string;
	triggerTick: number;
	action: Function;
}