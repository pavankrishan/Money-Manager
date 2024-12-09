import './index.css'

const MoneyDetails = ({balance, income, expenses}) => {
  return (
    <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
          />
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs {balance}</p>
        </div>
      
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
          />
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs {income}</p>
        </div>
      
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
          />
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">Rs {expenses}</p>
        </div>
      </div>
      
    
  )
}

export default MoneyDetails
