let employees = [];

$(document).ready(function() {
    console.log('jq and js');

    $('#submitBtn').on('click', function() {
        // listen for submit button click, add data as an 
        // object to global array, reset input value, and call append data 
        // to DOM function

        let employee = {
            firstName: $('#fn').val(),
            lastName: $('#ln').val(),
            id: $('#id').val(),
            title: $('#title').val(),
            annualSalary: $('#as').val(),
        };

        if (!Number(employee.annualSalary)) {
            // if there there is a dollar sign, decimal, or comma in string, alert user
            // "Please format number without any characters e.g. 5800" and exit function
            
            alert("Please format salary without any characters e.g. 58000");
            return;
        };

        employees.push(employee);
        $('.addInput').val('');

        appendData();
    });

    $('tbody').on('click', '.tDeleteBtn', deleteRow); // listens for deleteBtn click
});

let deleteRow = (event) => {
    // removes selected employee from global array and calls appendData to rebuild
    // the list

    employees.splice($(event.target).parent().parent().attr('arraypos') ,1);

    appendData();
};

const appendData = () => {
    // clear the table body and append everything that is stored
    // in global employees array, calculate the total monthly salary for everyone in the table
    // and append to dom. 

    // object and methods to convert number to currency format found at
    // https://www.geeksforgeeks.org/how-to-format-numbers-as-currency-string-in-javascript/

    let salary = new Intl.NumberFormat('en-US', {
        // saves a new Intl.NumberFormat object in the salary variable
            // NumberFormat is a 'Constructor for objects that enable language-sensetive
            // number formating.'
            // It's being used to automatically take a number and convert it into
            // the standard USD formatting

        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    let objectCounter = -1;
    let totalMoSalary = 0;

    $('tbody').empty();

    for (let employee of employees) {
        // uses the .format string method with rules saved in salary variable to format
        // the salary input into a a USD formatted number, attatches an array
        // position attribute to each item created on screen

        objectCounter++;
        totalMoSalary += Number(employee.annualSalary);

        $('tbody').append(`
            <tr arraypos="${objectCounter}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td class="tSalary">${salary.format(employee.annualSalary)}</td>
                <td class="tDeleteBtnTd"><button class="tDeleteBtn">Delete</td>
            </tr>
        `);
    };

    totalMoSalary /= 12;
    $('#totalSalary').text(salary.format(totalMoSalary));

    if (totalMoSalary >= 20000) {
        // If the total monthyl salary exceeds $20,000, change background color of total monthly
        // salary on DOM to red. else, change background color to normal background

        $('footer h4').css('background-color', '#FF3B3F')
    } else {
        $('footer h4').css('background-color', '#DFDCE3')
    };
};