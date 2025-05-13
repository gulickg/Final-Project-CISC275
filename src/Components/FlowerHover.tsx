import flower2 from '../graphics/flower2.png'
import flower3 from '../graphics/flower3.png'
import flower4 from '../graphics/flower4.png'

import './FlowerHover.css';



export function FlowerHover(): React.JSX.Element {
    return(<div id='flower-hover'>
        <img className='flower' src={flower2} alt="Flower 2" id='flower2'/>
        <img className='flower'  src={flower3} alt="Flower 3" id='flower3'/>
        <img className='flower'  src={flower4} alt="Flower 4" id='flower4'/>
    </div>);
}