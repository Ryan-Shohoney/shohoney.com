export function timer(tick: number, cb: Function, ...cbParams: any[]): any {
    
    const interval = setInterval(_ => {
        cb(...cbParams);
    }, tick);
    
    return () => clearInterval(interval);
};