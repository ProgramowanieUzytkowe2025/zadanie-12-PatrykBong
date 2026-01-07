import literaA from './literaA.jpg';
import { useFont } from "./FontProvider";

export function AppHeader({children}) {
    const { setFontSize } = useFont();

    return (
        <div>
            <h1> {children} </h1>
            <img  src={literaA} alt="A małe" width={33} height={33} style={{ border: "1px solid black" }} onClick={() => setFontSize(12)}/>
            <img  src={literaA} alt="A średnie" width={66} height={66} style={{ border: "1px solid black" }} onClick={() => setFontSize(16)}/>
            <img  src={literaA} alt="A duże" width={100} height={100} style={{ border: "1px solid black" }} onClick={() => setFontSize(24)}/>
        </div>
        )
}