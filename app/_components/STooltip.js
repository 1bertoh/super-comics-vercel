
/**
 * 
 * @param {{text:Strong, children: JSX.Element, left?:Number, display?:String}} params 
 */
const Tooltip = (params) => {
    const {text, children, display, left} = params
    
    return (
        <div className="tooltip" style={{ display: display || "block" }}>
            {children}
            <span style={{ left: left && left + "px" }} className="tooltiptext">
                {text}
            </span>
        </div>
    );
}

export default Tooltip