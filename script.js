document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const dataTable = document.getElementById("dataTable").getElementsByTagName('tbody')[0];

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData(form);
            const email = formData.get("email");
            const password = formData.get("password");
            const firstName = formData.get("firstName");
            const lastName = formData.get("lastName");
            const gender = formData.get("gender");
            const country = formData.get("country");
            const terms = formData.get("terms") ? "Yes" : "No";
            const newsletter = formData.get("newsletter") ? "Yes" : "No";
            addRow(email, password, firstName, lastName, gender, country, terms, newsletter);
            form.reset();
        }
    });

    function validateForm() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!email || !password || !confirmPassword) {
            alert("All fields are required!");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address!");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return false;
        }

        return true;
    }

    function addRow(email, password, firstName, lastName, gender, country, terms, newsletter) {
        const row = dataTable.insertRow();
        row.innerHTML = `
            <td>${email}</td>
            <td>${password}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${gender}</td>
            <td>${country}</td>
            <td>${terms}</td>
            <td>${newsletter}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>
        `;

        const editBtn = row.querySelector(".edit-btn");
        const deleteBtn = row.querySelector(".delete-btn");

        editBtn.addEventListener("click", function() {
            editRow(row);
        });

        deleteBtn.addEventListener("click", function() {
            deleteRow(row);
        });
    }

    function editRow(row) {
        const cells = row.getElementsByTagName("td");
        const email = cells[0].innerText;
        const password = cells[1].innerText;
        const firstName = cells[2].innerText;
        const lastName = cells[3].innerText;
        const gender = cells[4].innerText;
        const country = cells[5].innerText;
        const terms = cells[6].innerText === "Yes";
        const newsletter = cells[7].innerText === "Yes";

        document.getElementById("email").value = email;
        document.getElementById("password").value = password;
        document.getElementById("confirmPassword").value = password;
        document.getElementById("firstName").value = firstName;
        document.getElementById("lastName").value = lastName;
        document.querySelector(`input[name="gender"][value="${gender.toLowerCase()}"]`).checked = true;
        document.getElementById("country").value = country;
        document.getElementById("terms").checked = terms;
        document.getElementById("newsletter").checked = newsletter;

        row.remove();
    }

    function deleteRow(row) {
        row.remove();
    }
});
