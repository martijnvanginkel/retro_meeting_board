import { useState } from 'react';
import ScoreDot, { DotType } from '../ScoreDot/ScoreDot';
import './CardScore.css';

interface Props {
    startScore: number
}

const maxScore = 4

const CardScore: React.FC<Props> = ({
    startScore
}) => {

    const [score, setScore] = useState<number>(startScore)
    const [hoverAt, setHoverAt] = useState<number>(0)
    const [inEditMode, setInEditMode] = useState<boolean>(false)    

    return (
        <div
            className="card-score"
            onMouseEnter={() => setInEditMode(true)}
            onMouseLeave={() => setInEditMode(false)}
        >
            {inEditMode ? renderEditDots() : renderDots()}
        </div>
    )

    function renderEditDots() {
        return [...Array(maxScore)].map((_, index) => renderEditDot(index))
    }

    function renderDots() {
        return [...Array(score)].map((_, index) => <ScoreDot type={DotType.filled} key={index} />)
    }

    function getEditDotType(index: number) {
        if (score === index + 1) {
            return DotType.selected
        }
        if (index < hoverAt) {
            return DotType.filled
        }
        return DotType.empty
    }

    function renderEditDot(index: number) {  
        const type = getEditDotType(index)
        
        return (
            <ScoreDot
                type={type}
                key={index}
                onMouseEnter={() => setHoverAt(index + 1)}
                onClick={() => {
                    if (index + 1 === score) {
                        setScore(0)
                        setInEditMode(false)
                        return
                    }
                    setScore(index + 1)
                }}
            />
        )
    }
}

export default CardScore
