Array.prototype.Transpose = function() {
    for(let i = 0; i < this.length; i++) {
        for(let j=0;j<i;j++)
        {
            let temp = this[i][j];
            this[i][j] = this[j][i];
            this[j][i] = temp;
        }
    }
    return this;
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