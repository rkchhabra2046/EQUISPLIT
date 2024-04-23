window.addEventListener('load', () => {
    const individualExpenses = {};

    function populatePeopleCheckboxes(names) {
        const checkboxGroup = document.querySelector('.name-list');
        checkboxGroup.innerHTML = "<h2>NAMES</h2>";

        names.forEach((name) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = name;
            checkbox.classList.add('form-check-input');

            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.innerHTML = name;

            const div = document.createElement('div');
            div.classList.add('form-check');

            div.appendChild(checkbox);
            div.appendChild(label);
            checkboxGroup.appendChild(div);
        });
    }

    function populatePayerDropdown(names) {
        const payerDropdown = document.getElementById('payer');
        payerDropdown.innerHTML = "";

        names.forEach((name) => {
            const option = document.createElement('option');
            option.value = name;
            option.text = name;
            payerDropdown.appendChild(option);
        });
    }

    function calculateFinalEstimates() {
        const finalEstimates = {};
        Object.keys(individualExpenses).forEach((person) => {
            finalEstimates[person] = individualExpenses[person];
        });
    
        const totalFare = Object.values(individualExpenses).reduce((total, expense) => total + expense, 0);
    
        console.log('Total Fare:', totalFare);
    
        console.log('Final Estimates:', finalEstimates);
    
       
        const individualPaymentsList = document.getElementById('individualPaymentsList');
        individualPaymentsList.innerHTML = ""; 
    
        Object.keys(finalEstimates).forEach((person) => {
            const amountToPay = totalFare - finalEstimates[person];
    
           
            const listItem = document.createElement('li');
            listItem.textContent = `${person} pays: ${amountToPay.toFixed(2)}`;
            individualPaymentsList.appendChild(listItem);
        });
    }
    
    

    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById('category').value;
        const expense = parseFloat(document.getElementById('expense').value);
        const enteredPeople = document.getElementById('peopleInput').value;
        const people = enteredPeople.split(',').map(name => name.trim());
        const payer = document.getElementById('payer').value;

        people.forEach((person) => {
            if (!individualExpenses[person]) {
                individualExpenses[person] = 0;
            }
            if (person === payer) {
                individualExpenses[person] += expense;
            } else {
                individualExpenses[person] -= expense / (people.length - 1);
            }
        });

        console.log('Category:', category);
        console.log('Total Expense:', expense);
        console.log('People:', people);
        console.log('Payer:', payer);
        console.log('Individual Expenses:', individualExpenses);

        populatePeopleCheckboxes(Object.keys(individualExpenses));
        populatePayerDropdown(Object.keys(individualExpenses));

        expenseForm.reset();
    });

    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateFinalEstimates);

    const addPeopleForm = document.getElementById('addition');
    addPeopleForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = document.getElementById('names');
        const name = input.value.trim();

        if (!name) {
            alert("Please fill out the name");
            return;
        }

        const name_el = document.createElement("div");
        name_el.classList.add("name");

        const name_content_el = document.createElement("div");
        name_content_el.classList.add("content");

        const name_input_el = document.createElement("input");
        name_input_el.classList.add("text");
        name_input_el.type = "text";
        name_input_el.value = name;
        name_input_el.setAttribute("readonly", "readonly");

        name_content_el.appendChild(name_input_el);

        name_el.appendChild(name_content_el);

        individualExpenses[name] = 0;

        const nameList = document.querySelector('.name-list');
        nameList.appendChild(name_el);

        populatePeopleCheckboxes(Object.keys(individualExpenses));
        populatePayerDropdown(Object.keys(individualExpenses));

        input.value = "";
    });

    const names = ["Person 1", "Person 2", "Person 3"];
    populatePeopleCheckboxes(names);
    populatePayerDropdown(names);
});
