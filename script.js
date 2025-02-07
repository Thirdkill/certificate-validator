async function fetchGoogleSheetData() {
    const sheetId = '1wuQrSyc5v9ElFi-3bQscF8iNMZcCRwTYYfn7gLRxrFs'; // Replace with your Google Sheet ID
    const apiKey = 'AIzaSyBixUw52-rXeSOWm5yIVb7EVHGJsKNcoQA'; // Replace with your Google Sheets API Key
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.values;
    } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
        return [];
    }
}

async function searchEmployee() {
    const employeeId = document.getElementById('employeeId').value;
    if (!employeeId) {
        alert('Please enter an Certificate ID');
        return;
    }

    const data = await fetchGoogleSheetData();

    if (!data || data.length === 0) {
        alert('No data found or unable to fetch data.');
        return;
    }

    const headers = data[0];
    const rows = data.slice(1);

    const employee = rows.find(row => row[0] === employeeId);

    if (employee) {
        const details = headers.map((header, index) => {
            return `<strong>${header}:</strong> ${employee[index] || 'N/A'}`;
        }).join('<br>');
        document.getElementById('employeeDetails').innerHTML = details;
        openPopup();
    } else {
        alert('Certificate ID not found!');
    }
}

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
