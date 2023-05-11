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
let table = [];
let n = localStorage.getItem("n");
setMatrix();
function solve()
{

    let stepdiv = document.querySelector("#steps");
    stepdiv.innerHTML = "";
    stepdiv.innerHTML += "<p>Starting Matrix:</p>";
    let table = document.querySelector('table');
    for(let i =0;i<10;i++);
    let string = "<table>"
    stepdiv.innerHTML += string;
}

function setMatrix()
{
    let matrix = document.querySelector("table");
    n = document.querySelector("#n").value;
    let row = "";
    for(let i =0;i<n;i++)
    {
        row+="<tr>";
        for(let j=0;j<n;j++)
        {
            row+=`<td><input type = "text" id="${i},${j}" placeholder="0" /></td>`;
        }
        row+="</tr>";
    }
    localStorage.setItem("n",n);
    matrix.innerHTML = row;
}