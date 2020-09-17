import { useRef, useState } from 'react';
import { OutputType, OutputHookReturn } from './index.d';

export const useOutputs = () => {
    const [outputs, setOutputs] = useState<OutputType[]>([]);
    const ref = useRef<OutputHookReturn>(null as unknown as OutputHookReturn);


    console.log("Outputs =>", outputs);

    if (ref.current === null) {
        const add = (value: OutputType) => {
            console.log("add", value);
            setOutputs(_outputs => {
                _outputs.push(value);
                return [..._outputs];
            })
        }
        const remove = (index: number) => {
            console.log("remove", index);
            setOutputs(_outputs => {
                _outputs.splice(index, 1);
                return [..._outputs];
            })
        }

        ref.current = {
            value: outputs,
            add,
            remove
        };
    }
    // @ts-ignore
    ref.current.value = outputs;

    return ref.current;
};
