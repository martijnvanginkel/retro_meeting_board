import { useState } from 'react';
import './CreateCardBox.css';

interface Props {
    onCardCreated: (description: string) => void
}

const CreateCardBox: React.FC<Props> = ({
    onCardCreated
}) => {
    const [text, setText] = useState<string>('')

    return (
        <form onSubmit={ async (e) => {
            e.preventDefault()
            onCardCreated(text)
            setText('')
        }}>
            <input
                name="task"
                type="text"
                value={text}
                onChange={newValue => setText(newValue.target.value)}
                required
            />
            <button className="add-button">Add</button>
        </form>
    )
}

export default CreateCardBox
