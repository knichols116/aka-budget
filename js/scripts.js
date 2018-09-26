// query selecting HTML DOM nodes
let newBudgetForm = document.forms.newBudgetForm;
let incomeInput = newBudgetForm.income;
let rentInput = document.querySelector("#rentInput");
let billsInput = document.querySelector("#billsInput");
let groceriesInput = document.querySelector("#groceriesInput");
let entertainmentInput = document.querySelector("#entertainmentInput");
let personalCareInput = document.querySelector("#personalCareInput");
let miscInput = document.querySelector("#miscInput");
let budgetType = newBudgetForm.budgetType;
let budgetDates = document.querySelector("#budgetDates");
let startDate = newBudgetForm.startDate;
let endDate = newBudgetForm.endDate;
let newBudgetBtn = document.querySelector("#newBudgetBtn");

// declare values of HTML inputs as variables
let incomeInputVal;
let rentInputVal;
let billsInputVal;
let groceriesInputVal;
let entertainmentInputVal;
let personalCareInputVal;
let miscInputVal;
let totalBudget;
let inputArray;

//Variables for Expense table
const newExpenseForm = document.forms.newExpenseForm;
let expenseTable = document.getElementById("expenseTable");
let date = newExpenseForm.date;
let amount = newExpenseForm.amount;
let category = newExpenseForm.category;
let memo = newExpenseForm.memo;
let balance = 0;
let newRow;
let newTableData;
let rentSpent = 0;
let billsSpent = 0;
let groceriesSpent = 0;
let entertainmentSpent = 0;
let personalCareSpent = 0;
let miscSpent = 0;

//Variables for Pie Chart
var legendHeader = document.querySelector('#legendHeader');
var labels = document.querySelectorAll('.legend-labels');
var saveLabels = [];
var i = 0;
var subLegend = document.querySelector('.hidden-legend');

//click event calls drawChart(index for click)
var totalLabel = document.querySelector('.legend-total');
var rentLabel = document.querySelector('.legend-rent');
var billsLabel = document.querySelector('.legend-bills');
var entertainmentLabel = document.querySelector('.legend-entertainment');
var groceriesLabel = document.querySelector('.legend-groceries');
var personalCareLabel = document.querySelector('.legend-personal-care');
var miscLabel = document.querySelector('.legend-misc');

// Functions

// Create a New Budget, Clear Old Data
newBudgetBtn.addEventListener("click", e => {
	incomeInputVal = parseFloat(incomeInput.value);
	rentInputVal = parseFloat(rentInput.value);
	billsInputVal = parseFloat(billsInput.value);
	groceriesInputVal = parseFloat(groceriesInput.value);
	entertainmentInputVal = parseFloat(entertainmentInput.value);
	personalCareInputVal = parseFloat(personalCareInput.value);
	miscInputVal = parseFloat(miscInput.value);
  balance = incomeInputVal;

	newRow = document.createElement("tr");
	newRow.classList.add('new-row');
	newTableData = document.querySelectorAll('.new-row');

	legendHeader.textContent = `${budgetType.value} Budget`;
	budgetDates.textContent = `${startDate.value} to ${endDate.value}`;

	inputArray = [incomeInputVal, rentInputVal, billsInputVal, groceriesInputVal, entertainmentInputVal, personalCareInputVal, miscInputVal];
	totalBudget = rentInputVal + billsInputVal + groceriesInputVal + entertainmentInputVal + personalCareInputVal + miscInputVal;

	for(index = 0; index < inputArray.length; index++){
		if(!isNaN(inputArray[index]) && inputArray[index] >= 0){
			if(totalBudget === incomeInputVal){
				/*this if statement will:
				1. Provide starting balances for the budget and display
				them in the piechart legend. */
			} else{
				alert("Your budget doesn't equal your income.");
			};
		} else{
			alert("You didn't enter a valid number.");
		};
	};
	if(newTableData.length !== 0) {
		for(i = 0; i < newTableData.length; i++) {
			expenseTable.removeChild(newTableData[i]);
		};
	};
  newBudgetForm.reset();
	rentSpent = 0;
	billsSpent = 0;
	groceriesSpent = 0;
	entertainmentSpent = 0;
	personalCareSpent = 0;
	miscSpent = 0;
  $('#myModal').modal('hide');
	google.charts.setOnLoadCallback(function() {drawChart(0);});
	legendValues();
	insertStartValuesToLocalStorage();
  insertSpentValuesToLocalStorage();
  storeTable();
});

// Add New Expense to Table & Pie Chart
newExpenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newRow = document.createElement("tr");
	newRow.classList.add('new-row');
	newTableData = document.querySelectorAll('.new-row');
  let dateData = document.createElement("td");
  let amountData = document.createElement("td");
  let categoryData = document.createElement("td");
  let memoData = document.createElement("td");
  let balanceData = document.createElement("td");
  expenseTable.insertBefore(newRow, expenseTable.childNodes[2]);
  newRow.appendChild(dateData);
  dateData.textContent = date.value;
  newRow.appendChild(amountData);
  amountData.textContent = amount.value;
  newRow.appendChild(categoryData);
  categoryData.textContent = category.value;
  newRow.appendChild(memoData);
  memoData.textContent = memo.value;
  newRow.appendChild(balanceData);
  newBalance = balance - parseFloat(amount.value);
  balanceData.textContent = newBalance.toFixed(2);
  balance = newBalance;
	switch(category.value) {
		case 'Rent':
			rentSpent = rentSpent + parseFloat(amount.value);
			break;
		case 'Bills':
			billsSpent = billsSpent + parseFloat(amount.value);
			break;
		case 'Groceries':
			groceriesSpent = groceriesSpent + parseFloat(amount.value);
			break;
		case 'Entertainment':
			entertainmentSpent = entertainmentSpent + parseFloat(amount.value);
			break;
		case 'PersonalCare':
			personalCareSpent = personalCareSpent + parseFloat(amount.value);
			break;
		case 'Misc':
			miscSpent = miscSpent + parseFloat(amount.value);
			break;
		default:
			alert('error');
			break;
	};
	google.charts.setOnLoadCallback(function() {drawChart(0);});
	legendValues();
	insertSpentValuesToLocalStorage();
  storeTable();
	newExpenseForm.reset();
}); // End of Submit Event

//Pie Chart Data

//onclick events to view different charts
totalLabel.onclick = function changeChart(){
      google.charts.setOnLoadCallback(function () {drawChart(0);})
      subLegend.style.visibility = "hidden";
};
rentLabel.onclick = function changeChart(){
      google.charts.setOnLoadCallback(function () {drawChart(1);})
      subLegend.style.visibility = "visible";
};
billsLabel.onclick = function changeChart(){
      google.charts.setOnLoadCallback(function () {drawChart(2);})
      subLegend.style.visibility = "visible";
};
entertainmentLabel.onclick = function changeChart(){
      google.charts.setOnLoadCallback(function () {drawChart(3);})
      subLegend.style.visibility = "visible";
};
groceriesLabel.onclick = function changeChart(){
      google.charts.setOnLoadCallback(function () {drawChart(4);})
      subLegend.style.visibility = "visible";
};
personalCareLabel.onclick = function changeChart(){
      google.charts.setOnLoadCallback(function () {drawChart(5);})
      subLegend.style.visibility = "visible";
};
miscLabel.onclick = function changeChart(){
      google.charts.setOnLoadCallback(function () {drawChart(6);})
      subLegend.style.visibility = "visible";
};


labels.forEach(function(element) {
  saveLabels[i] = element.innerText;
  i++;
});

//give legend values
function legendValues(){
   i = 0;
   labels.forEach(function(element) {
     element.innerText = saveLabels[i];
     i++;
   });
   labels[0].innerText += ' $' + balance.toFixed(2) + ' / $' + totalBudget.toFixed(2);
   labels[1].innerText += ' $' + getDifference(rentInputVal, rentSpent).toFixed(2) + ' / $' + rentInputVal.toFixed(2);
   labels[2].innerText += ' $' + getDifference(billsInputVal, billsSpent).toFixed(2) + ' / $' + billsInputVal.toFixed(2);
   labels[3].innerText += ' $' + getDifference(entertainmentInputVal, entertainmentSpent).toFixed(2) + ' / $' + entertainmentInputVal.toFixed(2);
   labels[4].innerText += ' $' + getDifference(groceriesInputVal, groceriesSpent).toFixed(2) + ' / $' + groceriesInputVal.toFixed(2);
   labels[5].innerText += ' $' + getDifference(personalCareInputVal, personalCareSpent).toFixed(2) + ' / $' + personalCareInputVal.toFixed(2);
   labels[6].innerText += ' $' + getDifference(miscInputVal, miscSpent).toFixed(2) + ' / $' + miscInputVal.toFixed(2);
   //change text color if low on money
   if(balance/totalBudget <=.2){
      labels[0].style.color = "red";
   }
   else {
      labels[0].style.color = "black";
   };

   if(getDifference(rentInputVal, rentSpent)/rentInputVal <=.2){
      labels[1].style.color = "red";
   }
   else {
      labels[1].style.color = "black";
   };

   if(getDifference(billsInputVal, billsSpent)/billsInputVal <=.2){
      labels[2].style.color = "red";
   }
   else {
      labels[2].style.color = "black";
   };

   if(getDifference(entertainmentInputVal, entertainmentSpent)/entertainmentInputVal <=.2){
      labels[3].style.color = "red";
   }
   else {
      labels[3].style.color = "black";
   };

   if(getDifference(groceriesInputVal, groceriesSpent)/groceriesInputVal <=.2){
      labels[4].style.color = "red";
   }
   else {
      labels[4].style.color = "black";
   };

   if(getDifference(personalCareInputVal, personalCareSpent)/personalCareInputVal <=.2){
      labels[5].style.color = "red";
   }
   else {
      labels[5].style.color = "black";
   };

   if(getDifference(miscInputVal, miscSpent)/miscInputVal <=.2){
      labels[6].style.color = "red";
   }
   else {
      labels[6].style.color = "black";
   };
};

// Get budget remaining for individual categories
function getDifference(x, y){
   return x-y;
};

// Load google charts
google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(function() {drawChart(0);});

// Draw the chart and set the chart values
function drawChart(x) {
   if(x == 1){
      var data = google.visualization.arrayToDataTable([
      ['Category', 'Budget'],
      ['Rent Budget Remaining $' + getDifference(rentInputVal, rentSpent), getDifference(rentInputVal, rentSpent)],
      ['Rent Budget Spent $' + rentSpent, rentSpent]
      ]);
   }
   else if(x == 2){
      var data = google.visualization.arrayToDataTable([
      ['Category', 'Budget'],
      ['Bills Budget Remaining $' + getDifference(billsInputVal, billsSpent), getDifference(billsInputVal, billsSpent)],
      ['Bills Budget Spent $' + billsSpent, billsSpent]
      ]);
   }
   else if(x == 3){
      var data = google.visualization.arrayToDataTable([
      ['Category', 'Budget'],
      ['Entertainment Budget Remaining $' + getDifference(entertainmentInputVal, entertainmentSpent), getDifference(entertainmentInputVal, entertainmentSpent)],
      ['Entertainment Budget Spent $' + entertainmentSpent, entertainmentSpent]
      ]);
   }
   else if(x == 4){
      var data = google.visualization.arrayToDataTable([
      ['Category', 'Budget'],
      ['Groceries Budget Remaining $' + getDifference(groceriesInputVal, groceriesSpent), getDifference(groceriesInputVal, groceriesSpent)],
      ['Groceries Budget Spent $' + groceriesSpent, groceriesSpent]
      ]);
   }
   else if(x == 5){
      var data = google.visualization.arrayToDataTable([
      ['Category', 'Budget'],
      ['Personal Care Budget Remaining $' + getDifference(personalCareInputVal, personalCareSpent), getDifference(personalCareInputVal, personalCareSpent)],
      ['Persoanl Care Budget Spent $' + personalCareInputVal, personalCareSpent]
      ]);
   }
   else if(x == 6){
      var data = google.visualization.arrayToDataTable([
      ['Category', 'Budget'],
      ['Misc Budget Remaining $' + getDifference(miscInputVal, miscSpent), getDifference(miscInputVal, miscSpent)],
      ['Misc Budget Spent $' + miscSpent, miscSpent]
      ]);
   }
   else{
     var data = google.visualization.arrayToDataTable([
     ['Category', 'Budget'],
     ['Total Budget Remaining $' + balance + '/$' + totalBudget, balance],
     ['Rent $' + getDifference(rentInputVal, rentSpent) + '/$' + rentInputVal, rentSpent],
     ['Bills $' + getDifference(billsInputVal, billsSpent) + '/$' + billsInputVal, billsSpent],
     ['Entertainment $' + getDifference(entertainmentInputVal, entertainmentSpent) + '/$' + entertainmentInputVal, entertainmentSpent],
     ['Groceries $' + getDifference(groceriesInputVal, groceriesSpent) + '/$' + groceriesInputVal, groceriesSpent],
     ['Personal Care $' + getDifference(personalCareInputVal, personalCareSpent) + '/$' + personalCareInputVal, personalCareSpent],
     ['Misc $' + getDifference(miscInputVal, miscSpent) + '/$' + miscInputVal, miscSpent]
   ]);
 };
  // Optional; add a title and set the width and height of the chart
  var options = {
               legend: 'none',
                vAxis: {maxValue: 10},
                chartArea: {width: '100%'},
                backgroundColor: { fill:'transparent' },
								colors: [ '#83e775', '#76a8e9', '#9966cc', '#cc66cc', '#f48484', '#f9b974', '#f6ef61' ]
   };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
};

//Variables for localStorage
var startingBudgetValues = [];
var spentValues = [];
let tableData = [];

function insertStartValuesToLocalStorage()
{
   startingBudgetValues[0] = incomeInputVal;
   startingBudgetValues[1] = rentInputVal;
   startingBudgetValues[2] = billsInputVal;
   startingBudgetValues[3] = groceriesInputVal;
   startingBudgetValues[4] = entertainmentInputVal;
   startingBudgetValues[5] = personalCareInputVal;
   startingBudgetValues[6] = miscInputVal;
	 startingBudgetValues[7] = legendHeader.textContent;
	 startingBudgetValues[8] = budgetDates.textContent;

   localStorage.setItem('startingValues', JSON.stringify(startingBudgetValues));
};

function insertSpentValuesToLocalStorage(){
   spentValues[0] = balance;
   spentValues[1] = rentSpent;
   spentValues[2] = billsSpent;
   spentValues[3] = groceriesSpent;
   spentValues[4] = entertainmentSpent;
   spentValues[5] = personalCareSpent;
   spentValues[6] = miscSpent;

   localStorage.setItem('spentValues', JSON.stringify(spentValues));
};

function storeTable(){
   newTableData = document.querySelectorAll('.new-row');
   i = 0;
   newTableData.forEach(function(e){
      tableData[i] = e.outerHTML;
      i++;
   });
   localStorage.setItem('tableData', JSON.stringify(tableData));
};

//load from localStorage if values exist
if(localStorage.getItem('startingValues')){
  startingBudgetValues = JSON.parse(localStorage.getItem('startingValues'));
  totalBudget = startingBudgetValues[0];
  rentInputVal = startingBudgetValues[1];
  billsInputVal = startingBudgetValues[2];
  groceriesInputVal = startingBudgetValues[3];
  entertainmentInputVal = startingBudgetValues[4];
  personalCareInputVal = startingBudgetValues[5];
  miscInputVal = startingBudgetValues[6];
	legendHeader.textContent = startingBudgetValues[7];
	budgetDates.textContent = startingBudgetValues[8];
  google.charts.setOnLoadCallback(function() {drawChart(0);});
  legendValues();
};

if(localStorage.getItem('spentValues')){
   spentValues = JSON.parse(localStorage.getItem('spentValues'));
   balance = spentValues[0];
   rentSpent = spentValues[1];
   billsSpent = spentValues[2];
   groceriesSpent = spentValues[3];
   entertainmentSpent = spentValues[4];
   personalCareSpent = spentValues[5];
   miscSpent = spentValues[6];
   google.charts.setOnLoadCallback(function() {drawChart(0);});
   legendValues();
};

if(localStorage.getItem('tableData')){
   let tableData = JSON.parse(localStorage.getItem('tableData'));
   tableData.forEach(function(e){
      newRow = document.createElement("tr");
      newRow.classList.add('new-row');
      expenseTable.appendChild(newRow);
      newRow.outerHTML = e;
   });
};
