import './index.css'

const TransactionItem = props => {
  const {transDetails, deleteItem, typeOption} = props
  const {id, title, amount, type} = transDetails

  const transactionType = typeOption.find(option => option.optionId === type)
    ?.displayText

  const onDelete = () => {
    deleteItem(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{transactionType}</p>
      <button data-testid="delete" onClick={onDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
