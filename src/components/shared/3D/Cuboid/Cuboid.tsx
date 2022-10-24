import React from "react"
import Rectangle from "../Rectangle"

interface Props {
    width: string
    height: string
    thickness: string
    cssClass: string
    FrontWallChildren?: React.ReactNode
    BackWallChildren?: React.ReactNode
    LeftWallChildren?: React.ReactNode
    RightWallChildren?: React.ReactNode
    TopWallChildren?: React.ReactNode
    BottomtWallChildren?: React.ReactNode
}

const Cuboid = ({

    width, 
    height, 
    thickness, 
    cssClass,
    FrontWallChildren, 
    BackWallChildren, 
    LeftWallChildren, 
    RightWallChildren,
    TopWallChildren,
    BottomtWallChildren

}: Props) => {


    const frontRectangleTransform = `translateZ(4px)`;
    const backRectangleTransform = `rotateY(180deg) translateZ(3px)`;
    const leftRectangleTransform = `rotateY(-90deg)`;
    const rightRectangleTransform = `rotateY(90deg) translateZ(200px)`;
    const topRectangleTransform = `rotateX(270deg) translateZ(70px)`;
    const bottomRectangleTransform = `rotateX(90deg)`;


    return (
        <div className={`wallsContainer ${cssClass}`}>
            <Rectangle width={width} height={height} transform={frontRectangleTransform} cssClass="frontWall">
                {FrontWallChildren}
            </Rectangle>
            <Rectangle width={width} height={height} transform={backRectangleTransform}>
                {BackWallChildren}
            </Rectangle>
            <Rectangle width={thickness} height={height} transform={leftRectangleTransform}>
                {LeftWallChildren}
            </Rectangle>
            <Rectangle width={thickness} height={height} transform={rightRectangleTransform}>
                {RightWallChildren}
            </Rectangle>
            <Rectangle width={width} height={thickness} transform={topRectangleTransform}>
                {TopWallChildren}
            </Rectangle>
            <Rectangle width={width} height={thickness} transform={bottomRectangleTransform}>
                {BottomtWallChildren}
            </Rectangle>
        </div>
    )
}

export default Cuboid