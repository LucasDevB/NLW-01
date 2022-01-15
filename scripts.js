const Modal = {
    open() {
        document.querySelector(".modal-overlay").classList.add("active")
    },
    close() {
        document.querySelector(".modal-overlay").classList.remove("active")
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2022'
    },
    {
        id: 2,
        description: 'Estágio',
        amount: 200000,
        date: '21/01/2022'
    },
    {
        id: 3,
        description: 'Comida',
        amount: -20000,
        date: '19/01/2022'
    },


]


const Transaction = {
    all: transactions, 
    
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    incomes() {
        let income = 0
        Transaction.all.forEach((transaction) => {
            if(transaction.amount > 0) {
                income += transaction.amount
            }
        })
        return income
    },
    expenses() {
        let expense = 0
        Transaction.all.forEach((transaction) => {
            if(transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },
    total() {
        return Transaction.incomes() + Transaction.expenses()
    }

}

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    }, 

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount) 
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `
        return html
    },
    
    updateBalance() {
        document.getElementById("income-display").innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById("expense-display").innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById("total-display").innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const App = {
    init() {
        Transaction.all.forEach((transaction) => {
            DOM.addTransaction(transaction)
        });
        
        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()        
    }
}

App.init()

Transaction.add({
    id: 39,
    description: 'Alo',
    amount: 200,
    date: '23/02/2222'
})