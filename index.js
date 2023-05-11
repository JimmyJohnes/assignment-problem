function solve()
{
    let table = document.querySelector('table');
}

function setMatrix()
{
    let matrix = document.querySelector("table");
    let n = document.querySelector("n").value;
    let row = "<tr>";
    let cell = "<td><input type=\"text\"/></td>".repeat(n);
    row += cell + "</tr>";
    row = row.repeat(n);
    matrix.innerHTML = row;
}