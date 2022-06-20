export interface GameCommand {
  name: string;
  action: Function;
  aliases: string[];
  cancels?: string[];
}
