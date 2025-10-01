// Nedräknare för appen.

import { useEffect, useMemo, useRef, useState } from 'react';


export function useCountdown(active: boolean, endsAt: number | null) {
    const [now, setNow] = useState(Date.now());
    const ref = useRef<ReturnType<typeof setInterval> | null>(null);


    useEffect(() => {
        if (active) {
            ref.current = setInterval(() => setNow(Date.now()), 250);
        } else if (ref.current) { clearInterval(ref.current); ref.current = null; }
        return () => { if (ref.current) clearInterval(ref.current); };
    }, [active]);


    const remainingMs = useMemo(() => (!active || !endsAt ? 0 : Math.max(0, endsAt - now)), [active, endsAt, now]);
    const s = Math.ceil(remainingMs / 1000);
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    const remainingStr = `${mm}:${ss}`;
    return { remainingMs, remainingStr };
}