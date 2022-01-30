import { useRef } from 'react';
import Card from '../../components/Card/Card';
import CreateCardBox from '../../components/CreateCardBox/CreateCardBox';
import useCards, { CardData } from '../../hooks/useCards';
import './BoardPage.css';

const categories = ['Good', 'Bad', 'Actions', 'Ideas']

const BoardPage: React.FC = () => {

	const { data, actions } = useCards()
	const columnRefs = useRef<[]>([])

	if (data.loading) {
		return renderLoading()
	}

	if (data.error) {
		return renderError()
	}

	return (
		<div className="container">
			<CreateCardBox onCardCreated={(description) => actions.addCard(description)} />
			<div className="columns-container">
				{renderColumns()}
			</div>
		</div>
	)

	function renderLoading() {
		return <div>Loading...</div>
	}

	function renderError() {
		return <div>Error</div>
	}

	function renderColumns() {
		return categories.map((category, index) => renderColumn(index, category))
	}

	function renderColumn(index: number, category: string) {
		const columnCards: CardData[] = data.cards.filter(card => card.category === category)

		return (
			<div className="column" key={index}
				onDragOver={e => e.preventDefault()}
				onDragEnter={() => actions.changeCardColumn(category)}
			>
				<h1 className="column-header">{category}</h1>
				<div className="cards-container"
					ref={el => ((columnRefs.current[index] as HTMLDivElement) = (el as HTMLDivElement))}
					onDragOver={(e) => {
						onDragOverColumn(columnRefs.current[index], columnCards, e.clientY)
					}}
				>
					{renderCards(columnCards)}
				</div>
			</div>
		)
	}

	function renderCards(columnCards: CardData[]) {
		return (
			columnCards.map((card: CardData, index: number) => {
				return (
					<Card
						key={index}
						description={card.description}
						score={card.score}
						onDragStart={() => actions.setDraggingCard(card)}
						onDragEnd={() => actions.setDraggingCard(undefined)}
					/>
				)
			})
		)
	}

	function onDragOverColumn(column: HTMLDivElement, columnCards: CardData[], mouseYLocation: number) {
		const elements = column.querySelectorAll('.card')

		const elementLocations = Array.from(elements).map((card: Element, index: number) => {
			const bounds = card.getBoundingClientRect()
			const middle = ((bounds.bottom - bounds.top) / 2) + bounds.top
			return { middle, index }
		})

		const closestElementLocation = elementLocations.find(loc => mouseYLocation < loc.middle)
		if (!closestElementLocation) {
			return
		}

		actions.setCardAtNewIndex(closestElementLocation.index, columnCards)
	}
}

export default BoardPage
