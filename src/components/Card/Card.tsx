import CardScore from '../CardScore/CardScore';
import './Card.css';

interface Props {
    description: string
    score: number
    onDragStart: () => void
    onDragEnd: () => void
    onChangedScore: (newScore: number) => void
}

const Card: React.FC<Props> = ({
    description,
    score,
    onDragStart,
    onDragEnd,
    onChangedScore
}) => {

    return (
        <div className="card"
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            >
                <div className="description">{description}</div>
                <CardScore score={score} onChangedScore={onChangedScore} />
        </div>
    )
}

export default Card
