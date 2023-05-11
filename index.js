
Array.prototype.Transpose = function() {

}


function solve()
{
    let table = document.querySelector('table');
}

function setMatrix()
{
    let matrix = document.querySelector("table");
    let n = document.querySelector("#n").value;
    let row = "<tr>";
    let cell = "<td><input type=\"text\" placeholder=\"0\" /></td>".repeat(n)||localStorage.getItem("n");
    row += cell + "</tr>";
    row = row.repeat(n);
    localStorage.setItem("n",n);
    matrix.innerHTML = row;
}