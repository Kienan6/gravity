export interface Renderer {
    createView: () => void;
    clear: () => void;
    createCircle: (x: number, y: number, radius: number, fill: string) => void;
}
