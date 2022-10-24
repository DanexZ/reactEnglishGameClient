interface Props {
    width: string
    height: string
    transform: string
    cssClass?: string
    children?: React.ReactNode
}

const Rectangle = ({width, height, transform, cssClass, children}: Props) => {

    const inlineStyle = {
        width,
        height,
        transform
    }

    return (
        <div className={`wall ${cssClass}`} style={inlineStyle}>
            {children}
        </div>
    )
}

export default Rectangle