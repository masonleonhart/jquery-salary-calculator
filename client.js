let employees = [];

$(document).ready(function() {
    console.log('jq and js');

    $('#submitBtn').on('click', function() {
        // listen for submit button click, add data as an 
        // object to global array, and append data to DOM function

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
            
            alert("Please format salary without any characters e.g. 5800");
            return;
        } 

        employees.push(employee);
        $('.addInput').val('') 

        appendData();
    });

    $('tbody').on('click', '.tDeleteBtn', deleteRow)
});

let deleteRow = (event) => {
    // remove the grandparent of the delete button that was clicked (tr)
    
    $(event.target).parent().parent().remove();
};

const appendData = () => {
    // clear the table body and append everything that is stored
    // in global employees array

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

    $('tbody').empty();
    
    for (let employee of employees) {
        // uses the .format string method with rules saved in salary variable to format
        // the salary input into a a USD formatted number

        $('tbody').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td class="tSalary">${salary.format(employee.annualSalary)}</td>
                <td class="tDeleteBtnTd"><button class="tDeleteBtn">Delete</td>
            </tr>
        `);
    };
};