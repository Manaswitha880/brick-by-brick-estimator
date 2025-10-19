const form = document.getElementById('costForm');
const totalCostSpan = document.getElementById('totalCost');
const downloadBtn = document.getElementById('downloadBtn');
let chart;

form.addEventListener('submit', function(e){
    e.preventDefault();

    const area = parseFloat(document.getElementById('area').value);
    const brickRate = parseFloat(document.getElementById('brickType').value);
    const bricksPerSqFt = parseFloat(document.getElementById('bricksPerSqFt').value);
    const laborCost = parseFloat(document.getElementById('laborCost').value);
    const cementCost = parseFloat(document.getElementById('cementCost').value);
    const steelCost = parseFloat(document.getElementById('steelCost').value);
    const sandCost = parseFloat(document.getElementById('sandCost').value);

    const totalBricks = area * bricksPerSqFt;
    const totalBrickCost = totalBricks * brickRate;
    const totalLaborCost = area * laborCost;
    const totalMaterialCost = area * (cementCost + steelCost + sandCost);

    const totalCost = totalBrickCost + totalLaborCost + totalMaterialCost;

    totalCostSpan.textContent = totalCost.toFixed(2);

    // Chart
    const ctx = document.getElementById('costChart').getContext('2d');
    if(chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Bricks', 'Labor', 'Materials'],
            datasets: [{
                data: [totalBrickCost, totalLaborCost, totalMaterialCost],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        }
    });
});

// PDF download
downloadBtn.addEventListener('click', function(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const area = document.getElementById('area').value;
    const brickType = document.getElementById('brickType').selectedOptions[0].text;
    const bricksPerSqFt = document.getElementById('bricksPerSqFt').value;
    const laborCost = document.getElementById('laborCost').value;
    const cementCost = document.getElementById('cementCost').value;
    const steelCost = document.getElementById('steelCost').value;
    const sandCost = document.getElementById('sandCost').value;
    const total = totalCostSpan.textContent;

    doc.setFontSize(18);
    doc.text("Brick by Brick Cost Estimate", 20, 20);
    doc.setFontSize(14);
    doc.text(`House Area: ${area} sq.ft`, 20, 40);
    doc.text(`Brick Type: ${brickType}`, 20, 50);
    doc.text(`Bricks per sq.ft: ${bricksPerSqFt}`, 20, 60);
    doc.text(`Labor Cost per sq.ft: ₹${laborCost}`, 20, 70);
    doc.text(`Cement Cost per sq.ft: ₹${cementCost}`, 20, 80);
    doc.text(`Steel Cost per sq.ft: ₹${steelCost}`, 20, 90);
    doc.text(`Sand Cost per sq.ft: ₹${sandCost}`, 20, 100);
    doc.text(`Total Estimated Cost: ₹${total}`, 20, 120);

    doc.save("Cost_Estimate.pdf");
});
