export type OutputType = {
    title: string;
    content: JSON;
}

export type OutputHookReturn = {
    readonly value: OutputType[];
    readonly add: (value: OutputType) => void;
    readonly remove: (index: number) => void;
}