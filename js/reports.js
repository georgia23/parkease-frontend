const reportDate = document.getElementById("reportDate");
const table = document.getElementById("reportTable");
const searchInput = document.getElementById("searchTable");
const grandTotal = document.getElementById("grandTotal");

let today = new Date();

function updateDate(){
reportDate.textContent = today.toDateString();
}

updateDate();

document.getElementById("prevDay").onclick = () => {
today.setDate(today.getDate() - 1);
updateDate();
};

document.getElementById("nextDay").onclick = () => {
today.setDate(today.getDate() + 1);
updateDate();
};


/* SAMPLE DATA */

const data = [
{receipt:"PE-2026-1201",plate:"UBA123X",in:"09:00",out:"11:00",duration:"2 hrs",fee:4000},
{receipt:"PE-2026-1202",plate:"UAT778D",in:"08:30",out:"10:30",duration:"2 hrs",fee:4000},
{receipt:"PE-2026-1203",plate:"UBF234K",in:"07:50",out:"12:00",duration:"4 hrs",fee:8000}
];


function renderTable(list){

table.innerHTML = "";

let total = 0;

list.forEach(item => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${item.receipt}</td>
<td>${item.plate}</td>
<td>${item.in}</td>
<td>${item.out}</td>
<td>${item.duration}</td>
<td>UGX ${item.fee}</td>
`;

table.appendChild(row);

total += item.fee;

});

grandTotal.textContent = "UGX " + total;

}

renderTable(data);


/* SEARCH FILTER */

searchInput.addEventListener("keyup", () => {

const query = searchInput.value.toLowerCase();

const filtered = data.filter(item =>
item.plate.toLowerCase().includes(query) ||
item.receipt.toLowerCase().includes(query)
);

renderTable(filtered);

});


/* EXPORT CSV */

document.getElementById("exportCSV").addEventListener("click", function(){

let csv = "Receipt,Plate,In-Time,Out-Time,Duration,Fee\n";

data.forEach(row => {
csv += `${row.receipt},${row.plate},${row.in},${row.out},${row.duration},${row.fee}\n`;
});

const blob = new Blob([csv], { type: "text/csv" });

const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "parkease-report.csv";

a.click();

});