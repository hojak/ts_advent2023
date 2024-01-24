export interface Signal {
    type: SignalType,
    sender: string
    receiver: string,
    push: number;
}

export enum SignalType {
    Low,
    High
}