export interface Signal {
    type: SignalType,
    receiver: string,
    sender: string
}

export enum SignalType {
    Low,
    High
}