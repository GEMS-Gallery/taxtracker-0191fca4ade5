import { backend } from 'declarations/backend';

// Function to add a new TaxPayer
async function addTaxPayer(event) {
    event.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    try {
        await backend.addTaxPayer(tid, firstName, lastName, address);
        alert('TaxPayer added successfully');
        document.getElementById('addTaxPayerForm').reset();
        displayAllTaxPayers();
    } catch (error) {
        console.error('Error adding TaxPayer:', error);
        alert('Failed to add TaxPayer');
    }
}

// Function to display all TaxPayers
async function displayAllTaxPayers() {
    try {
        const taxPayers = await backend.getAllTaxPayers();
        const taxPayerList = document.getElementById('taxPayerList');
        taxPayerList.innerHTML = '<ul>' + taxPayers.map(tp => 
            `<li>TID: ${tp.tid}, Name: ${tp.firstName} ${tp.lastName}, Address: ${tp.address}</li>`
        ).join('') + '</ul>';
    } catch (error) {
        console.error('Error fetching TaxPayers:', error);
        document.getElementById('taxPayerList').innerHTML = 'Failed to fetch TaxPayers';
    }
}

// Function to search for a TaxPayer
async function searchTaxPayer() {
    const searchTid = document.getElementById('searchTid').value;
    try {
        const result = await backend.searchTaxPayer(searchTid);
        const searchResult = document.getElementById('searchResult');
        if (result) {
            searchResult.innerHTML = `
                <p>TID: ${result.tid}</p>
                <p>Name: ${result.firstName} ${result.lastName}</p>
                <p>Address: ${result.address}</p>
            `;
        } else {
            searchResult.innerHTML = 'No TaxPayer found with this TID';
        }
    } catch (error) {
        console.error('Error searching TaxPayer:', error);
        document.getElementById('searchResult').innerHTML = 'Failed to search TaxPayer';
    }
}

// Event listeners
document.getElementById('addTaxPayerForm').addEventListener('submit', addTaxPayer);
window.searchTaxPayer = searchTaxPayer;

// Initial display of all TaxPayers
displayAllTaxPayers();