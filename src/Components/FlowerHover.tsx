import flower2 from '../graphics/flower2.png'
import flower3 from '../graphics/flower3.png'
import flower4 from '../graphics/flower4.png'

import './FlowerHover.css';

interface FlowerHoverProps{
    disabled? : string;
}


export function FlowerHover({disabled}:FlowerHoverProps): React.JSX.Element {
    let show: boolean = true;
    if (disabled === 'true') show = false;

    return(<div id='flower-hover' style={{visibility:show ? 'visible' : 'hidden'}}>
        <img className='flower' src={flower2} alt="Flower 2" id='flower2'/>
        <img className='flower'  src={flower3} alt="Flower 3" id='flower3'/>
        <img className='flower'  src={flower4} alt="Flower 4" id='flower4'/>
    </div>);
}