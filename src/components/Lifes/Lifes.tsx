
const Lifes = ({appUserLifes, featureUserlifes, featureStep}: {appUserLifes: number, featureUserlifes: number, featureStep: number}) => {

    const renderLifes = () => {

        const elements = [];

        for ( let i=1; i<=appUserLifes; i++) {

            const heartClass = (i > featureUserlifes) ? 'heartEmpty' : 'heartFull'
             
            elements.push(<div key={`life${i}`} className={`heart ${heartClass}`}>
            <div className="circle1"></div>
            <div className="circle2"></div>
        </div>)
                
        }

        return elements

    }



    return (
        <div className="heartsContainer">
            {renderLifes()}
            {featureStep === 5 && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
        </div>
    )
}

export default Lifes