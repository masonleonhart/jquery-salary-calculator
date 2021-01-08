let employees = [];

$(document).ready(function() {
    console.log('jq and js');

    $('#submitBtn').on('click', function() {
        // listen for submit button click and add data as an 
        // object to global array and call the appendData function

        let employee = {
            firstName: $('#fn').val(),
            lastName: $('#ln').val(),
            id: $('#id').val(),
            title: $('#title').val(),
            annualSalary: $('#as').val(),
        };

        employees.push(employee);

        appendData();
    });
});

const appendData = () => {
    // clear the table body and append everything that is stored
    // in global employees array

    // function to convert number to currency format found at
    // https://www.geeksforgeeks.org/how-to-format-numbers-as-currency-string-in-javascript/

    let format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    $('tbody').empty();
    
    for (let employee of employees) {
        $('tbody').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td class="tabSalary">${format.format(employee.annualSalary)}</td>
            </tr>
        `);
    };
};