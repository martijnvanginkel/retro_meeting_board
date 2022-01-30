import { useEffect, useState } from "react"

export interface CardData {
    description: string
    score: number
    category: string
}

function useCards() {

    const [error] = useState<boolean>(false)
    const [loading] = useState<boolean>(false)
	const [cards, setCards] = useState<CardData[]>([])

    const [draggingCard, setDraggingCard] = useState<CardData>()

    useEffect(() => {
        fetchAllCards()
    }, [])

    async function fetchAllCards() {
        await new Promise(resolve => setTimeout(resolve, 0))

        const fetchedCards = [
            { description: 'Example card 1', score: 0, category: 'Good' },
            { description: 'Example card 2', score: 0, category: 'Good' },
            { description: 'Example card 3', score: 0, category: 'Good' }
        ]
        setCards(fetchedCards)
    }

    function addCard(description: string) {
        const newCard: CardData = {
            description: description,
            score: 0,
            category: 'Good'
        }
        setCards([...cards, newCard])
    }

    function changeCardColumn(newCategory: string) {
        const copy = [...cards]
        const find = copy.find(card => card === draggingCard)
        if (!find) {
            return
        }
        find.category = newCategory
        setCards(copy)
    }

    function changeCardScore(card: CardData, newScore: number) {
        const copy = [...cards]
        const find = copy.find(c => c === card)
        if (!find) {
            return
        }
        find.score = newScore
        setCards(copy)
    }

    function setCardAtNewIndex(newIndex: number, columnCards: CardData[]) {
        if (!draggingCard) {
            return
        }

        const category = draggingCard.category
        const filtered = columnCards.filter(c => c !== draggingCard)
        filtered.splice(newIndex, 0, draggingCard)


        const copy = [...cards]
        const allOtherCards = copy.filter(c => c.category !== category)
        const reorganised = filtered.concat(allOtherCards)

        setCards(reorganised)
    }

    return {
        data: { loading, error, cards },
        actions: { addCard, setDraggingCard, changeCardColumn, changeCardScore, setCardAtNewIndex }
    }
}

export default useCards 
