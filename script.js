function addRow() {
    let table = document.getElementById("dynamicTable");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    for (let i = 0; i < 8; i++) {
        let cell = row.insertCell(i);
        let element = document.createElement("input");
        element.type = "text";
        element.name = "input" + i + "_row" + rowCount;
        element.oninput = function() {
            calculateTotals();
            calculateTotalRefacciones();
            calculateSubtotal();
            calculateInversionTotal();
            calculateGanancia();
            calculateIVA();
            calculateTotal();
        };
        cell.appendChild(element);
    }
}

function removeRow() {
    let table = document.getElementById("dynamicTable");
    let rowCount = table.rows.length;
    if (rowCount > 2) {
        table.deleteRow(rowCount - 1);
        calculateTotalRefacciones();
        calculateSubtotal();
        calculateInversionTotal();
        calculateGanancia();
        calculateIVA();
        calculateTotal();
    }
}

function addLaborRow() {
    let table = document.getElementById("laborTable");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    for (let i = 0; i < 6; i++) {
        let cell = row.insertCell(i);
        let element = document.createElement("input");
        element.type = "text";
        element.name = "laborInput" + i + "_row" + rowCount;
        element.oninput = function() {
            calculateLaborTotal();
            calculateSubtotal();
            calculateGanancia();
            calculateIVA();
            calculateTotal();
        };
        cell.appendChild(element);
    }
}

function removeLaborRow() {
    let table = document.getElementById("laborTable");
    let rowCount = table.rows.length;
    if (rowCount > 2) {
        table.deleteRow(rowCount - 1);
        calculateSubtotal();
        calculateGanancia();
        calculateIVA();
        calculateTotal();
    }
}

function calculateTotals() {
    let table = document.getElementById("dynamicTable");
    for (let i = 1, row; row = table.rows[i]; i++) {
        let quantity = parseFloat(row.cells[0].querySelector("input").value) || 0;
        let puCompra = parseFloat(row.cells[4].querySelector("input").value) || 0;
        let puVenta = parseFloat(row.cells[6].querySelector("input").value) || 0;
        
        let totalCompra = quantity * puCompra;
        let totalVenta = quantity * puVenta;

        row.cells[5].querySelector("input").value = totalCompra.toFixed(2);
        row.cells[7].querySelector("input").value = totalVenta.toFixed(2);
    }
}

function calculateLaborTotal() {
    let table = document.getElementById("laborTable");
    for (let i = 1, row; row = table.rows[i]; i++) {
        let quantityMO = parseFloat(row.cells[0].querySelector("input").value) || 0;
        let puMO = parseFloat(row.cells[4].querySelector("input").value) || 0;

        let totalMO = quantityMO * puMO;

        row.cells[5].querySelector("input").value = totalMO.toFixed(2);
    }
}

function calculateTotalRefacciones() {
    let table = document.getElementById("dynamicTable");
    let totalRefacciones = 0;
    for (let i = 1, row; row = table.rows[i]; i++) {
        let totalVenta = parseFloat(row.cells[7].querySelector("input").value) || 0;
        totalRefacciones += totalVenta;
    }
    document.getElementById("totalRefacciones").value = totalRefacciones.toFixed(2);
    calculateSubtotal();
}

function calculateSubtotal() {
    let tableDynamic = document.getElementById("dynamicTable");
    let totalVentaSum = 0;
    for (let i = 1, row; row = tableDynamic.rows[i]; i++) {
        let totalVenta = parseFloat(row.cells[7].querySelector("input").value) || 0;
        totalVentaSum += totalVenta;
    }

    let tableLabor = document.getElementById("laborTable");
    let totalMOSum = 0;
    for (let i = 1, row; row = tableLabor.rows[i]; i++) {
        let totalMO = parseFloat(row.cells[5].querySelector("input").value) || 0;
        totalMOSum += totalMO;
    }

    let subtotal = totalVentaSum + totalMOSum;
    document.getElementById("subtotal").value = subtotal.toFixed(2);
    calculateGanancia();
    calculateIVA();
    calculateTotal();
}

function calculateInversionTotal() {
    let table = document.getElementById("dynamicTable");
    let inversionTotal = 0;
    for (let i = 1, row; row = table.rows[i]; i++) {
        let totalCompra = parseFloat(row.cells[5].querySelector("input").value) || 0;
        inversionTotal += totalCompra;
    }
    document.getElementById("inversionTotal").value = inversionTotal.toFixed(2);
    calculateGanancia();
}

function calculateGanancia() {
    let inversionTotal = parseFloat(document.getElementById("inversionTotal").value) || 0;
    let subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    let ganancia = subtotal - inversionTotal;
    document.getElementById("ganancia").value = ganancia.toFixed(2);
}

function calculateIVA() {
    let subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    let iva = subtotal * 0.16;
    document.getElementById("iva").value = iva.toFixed(2);
}

function calculateTotal() {
    let subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    let iva = parseFloat(document.getElementById("iva").value) || 0;
    let total = subtotal + iva;
    document.getElementById("total").value = total.toFixed(2);
}

function cambiarTexto() { 
    var select = document.getElementById("opciones"); 
    var texto = select.options[select.selectedIndex].value; 
    document.getElementById("titulo").innerHTML = texto; 
}

function changeLogo() {
    console.log('changeLogo function called'); // Agrega esta línea
    var empresa = document.getElementById('empresa_options').value;
    var logoContainer = document.getElementById('logo-container');
    
    if (empresa === 'ISI') {
        logoContainer.innerHTML = '<img src="images/Logo ISI simple.png" alt="Logo ISI simple">';
    } else if (empresa === 'CSM') {  
        logoContainer.innerHTML = '<img src="images/Logo CSM sello.png" alt="Logo CSM">';
    } else if (empresa === 'MIC') {
        logoContainer.innerHTML = '<img src="images/logo mic.jpg" alt="Logo MIC">';
    } else {
        logoContainer.innerHTML = `
            <img src="images/Logo ISI simple.png" alt="Logo ISI simple">
            <img src="images/Logo CSM sello.png" alt="Logo CSM">
            <img src="images/logo mic.jpg" alt="Logo MIC">
        `;
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    changeLogo();
});