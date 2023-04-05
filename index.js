//Selectors
const submitBtn = document.getElementById("formExpense");
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Event Listeners
submitBtn.addEventListener("submit", addExpense);

// Functions

function addExpense(e) {
  e.preventDefault();
  let expenseBtn = document.getElementById("expenseBtn").value;
  const uppExpense = expenseBtn.charAt(0).toUpperCase() + expenseBtn.substr(1);
  let amountInput = document.getElementById("amountBtn");
  let amount = Number(amountInput.value);
  let date = document.getElementById("dateBtn").value;
  let type = document.getElementById("optionsBtn").value;


  if (amount > 0 && date != 0) {
    const expense = {
      uppExpense,
      amount,
      date,
      type,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1, 
    };
    expenses.push(expense);

updateExpensesDisplay();

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  document.getElementById("formExpense").reset();
  showExpenses();
}

const showExpenses = () => {
  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    expenseTable.innerHTML += ` 
         <tr>
         <td id="table">${expenses[i].uppExpense}</td>
         <td id="table">${expenses[i].amount}€</td>
         <td id="table">${expenses[i].date}</td>
         <td id="table">${expenses[i].type}</td>
         <td id="table"><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">X</td>
         </tr>`;
  }

};

function updateExpensesDisplay () {
const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
const totalExpensesDisplay = document.getElementById("total");
totalExpensesDisplay.innerText = `Total Expenses: ${totalExpenses}€`;
}

const deleteExpense = (id) => {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      expenses.splice(i, 1);
    }
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
  updateExpensesDisplay();
};

showExpenses();
updateExpensesDisplay();
