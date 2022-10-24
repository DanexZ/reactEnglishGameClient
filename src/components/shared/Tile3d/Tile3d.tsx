import Cuboid from "../3D/Cuboid/Cuboid";
import "./Tile3d.scss";

interface Props {
    cssClass: "static" | "dynamic"
    onClickFn?: Function
    children?: React.ReactNode
}

const Tile3d = ({cssClass, onClickFn, children}: Props) => {

    return (
        <div className="scene" onClick={(onClickFn) ? () => onClickFn() : () => {}}>
            <Cuboid width="200px" height="70px" thickness="3px" cssClass={cssClass} FrontWallChildren={children} />
        </div>
    )
}

export default Tile3d