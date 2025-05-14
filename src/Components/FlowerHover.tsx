import flower2 from '../graphics/flower2.png'
import flower3 from '../graphics/flower3.png'
import flower4 from '../graphics/flower4.png'
import './FlowerHover.css';

/**
 * Displays flowers around the buttons
 * 
 * This component displays flowers around a button when it is hovered over. It combines three different
 * flower images, which sprout from the button when visible. The boolean that is taken in is used to
 * determine if the flowers will be shown or not.
 * 
 * @param {FlowerHoverProps} disabled? - optional variable to determine if buttons are being hovered over
 * 
 * @returns {React.JSX.Element} flowers appear/hide around the buttons
 */


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