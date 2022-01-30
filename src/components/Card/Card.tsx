import CardScore from '../CardScore/CardScore';
import './Card.css';

interface Props {
    description: string
    score: number
    onDragStart: () => void
    onDragEnd: () => void
}

const Card: React.FC<Props> = ({
    description,
    score,
    onDragStart,
    onDragEnd,
}) => {

    return (
        <div className="card"
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            >
                <div className="description">{description}</div>
                <CardScore startScore={score} />
        </div>
    )
}

export default Card
