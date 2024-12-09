import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    typeOption: transactionTypeOptions,
    title: '',
    amount: '',
    income: 0,
    expenses: 0,
    historyList: [],
    type: transactionTypeOptions[0].optionId,
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state

    if (title && !isNaN(parseFloat(amount))) {
      const newTransList = {
        id: uuidv4(),
        title,
        amount: parseFloat(amount),
        type,
      }

      if (type === 'INCOME') {
        this.setState(prevState => ({
          income: prevState.income + parseFloat(amount),
        }))
      } else if (type === 'EXPENSES') {
        this.setState(prevState => ({
          expenses: prevState.expenses + parseFloat(amount),
        }))
      }

      this.setState(prevState => ({
        historyList: [...prevState.historyList, newTransList],
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  deleteItem = id => {
    const {typeOption, historyList, income, expenses} = this.state
    const itemToDelete = historyList.find(item => item.id === id)

    if (itemToDelete) {
      const {amount, type} = itemToDelete
      this.setState({
        historyList: historyList.filter(item => item.id !== id),
        [type === 'INCOME' ? 'income' : 'expenses']:
          type === 'INCOME' ? income - amount : expenses - amount,
      })
    }
  }

  render() {
    const {typeOption, title, amount, type, historyList, income, expenses} =
      this.state
    const balance = income - expenses

    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>Welcome back to your Money Manager</p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div>
          <h1>Add Transaction</h1>
          <form onSubmit={this.onAddTransaction}>
            <label htmlFor="title">TITLE</label>
            <input
              placeholder="TITLE"
              id="title"
              onChange={this.onChangeTitle}
              value={title}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              placeholder="AMOUNT"
              id="amount"
              onChange={this.onChangeAmount}
              value={amount}
            />
            <label htmlFor="type">TYPE</label>
            <select id="type" onChange={this.onChangeType} value={type}>
              {transactionTypeOptions.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          <h1>History</h1>
          <ul>
            <li>
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </li>
            {historyList.map(eachItem => (
              <TransactionItem
                typeOption={typeOption}
                key={eachItem.id}
                deleteItem={this.deleteItem}
                transDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
