import './ScoreDot.css';

export enum DotType {
    'filled',
    'empty',
    'selected'
}

interface Props {
    type: DotType
    onMouseEnter?: () => void
    onClick?: () => void
}

const ScoreDot: React.FC<Props> = ({
    type, onMouseEnter, onClick
}) => {
    return (
        <div
            className={getClassName()}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
        </div>
    )

    function getClassName() {
        const classNames = {
            [DotType.filled]: 'filled-dot',
            [DotType.empty]: 'empty-dot',
            [DotType.selected]: 'selected-dot'
        }
        return classNames[type]
    }
}

export default ScoreDot
