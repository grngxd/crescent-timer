import type { ContextId, Signal } from "@builder.io/qwik";
import { component$, useContext } from "@builder.io/qwik";

interface Props {
    context: ContextId<Signal<number>>;
}

export default component$((props: Props) => {
    const timer = useContext(props.context);
    
    return (
        <div>
            Timer: {timer.value}
        </div>
    );
});