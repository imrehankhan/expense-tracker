let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let newExpensesList = JSON.parse(localStorage.getItem('newExpensesList')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateExpenses();
    updateTotal();
    updateDateTotal();
});

function addExpense() {
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (date && description && amount) {
        const expense = {
            date: date,
            description: description,
            amount: amount
        };

        newExpensesList.push(expense);
        updateLocalStorage();
        updateExpenses();
        updateTotal();
        updateDateTotal(); // Update the date total if the selected date matches the added expense
        document.getElementById('date').value = '';
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter date, description, and amount.');
    }
}

function updateExpenses() {
    const expenseList = document.getElementById('expenses');
    expenseList.innerHTML = '';

    newExpensesList.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `<div>${expense.date}</div><div>${expense.description} <span>$${expense.amount.toFixed(2)}</span></div>`;
        expenseList.appendChild(li);
    });
}

function updateTotal() {
    const total = newExpensesList.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('total').innerText = total.toFixed(2);
}

function updateDateTotal() {
    const selectedDate = document.getElementById('filter-date').value;
    const dateExpenses = expenses.filter(expense => expense.date === selectedDate);

    const dateTotal = dateExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('date-total').innerText = dateTotal.toFixed(2);

    const dateExpensesList = document.getElementById('date-expenses');
    dateExpensesList.innerHTML = '';

    dateExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `<div>${expense.description} <span>$${expense.amount.toFixed(2)}</span></div>`;
        dateExpensesList.appendChild(li);
    });
}

function newExpenses() {
    expenses = [...expenses, ...newExpensesList];
    newExpensesList = [];
    updateLocalStorage();
    updateExpenses();
    updateTotal();
}

function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('newExpensesList', JSON.stringify(newExpensesList));
}

