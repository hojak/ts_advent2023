export interface Signal {
    type: SignalType,
    destination: string
}

export enum SignalType {
    Low,
    High
}