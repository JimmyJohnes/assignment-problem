 function transpose(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j=0;j<i;j++)
        {
            let temp = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = temp;
        }
    }
    return arr;
}
function displayMatrix()
{
    let string = "<table id = \"in-Steps-Table\">";
    for(let i in matrix)
    {
        string += "<tr>";
        
        for(let j in matrix[i])
        {
            string += `<td>${matrix[i][j]}</td>`;
        }
        string += "</tr>";
    }
    string += "</table>";
    return string;
}
function Subtract(arr)
{
    for(let i in arr)
    {
        let max = Math.min(...arr[i]);
        for(let j in arr[i])
        {
            arr[i][j] = arr[i][j] - max;
        }
    }
}
let matrix = [];
let n = localStorage.getItem("n");
setMatrix();
function solve()
{
    /* grab elements from The DOM */
    let stepdiv = document.querySelector("#steps");
    stepdiv.innerHTML = "";
    stepdiv.innerHTML += "<p>Starting Matrix:</p>";
    let table = document.querySelector('table');
    /* Set up the matrix as global variable */
    for(let i =0 ; i<table.rows.length;i++)
    {
        let temp = [];
        for(let j = 0;j<table.rows[i].cells.length;j++)
        {
            temp.push(document.querySelector(`#i${i}${j}`).value);
        }
        matrix.push(temp);
    }
    /* Display The first Matrix */
    stepdiv.innerHTML += displayMatrix();
    stepdiv.innerHTML+= "<p>Subtract The Maximum in each Row</p>"
    Subtract(matrix);
    stepdiv.innerHTML += displayMatrix();
    stepdiv.innerHTML+= "<p>Subtract The Maximum in each Column</p>"
    transpose(matrix);
    Subtract(matrix);
    transpose(matrix);
    stepdiv.innerHTML += displayMatrix();

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
            row+=`<td><input type = "text" id="i${i}${j}" placeholder="0" /></td>`;
        }
        row+="</tr>";
    }
    localStorage.setItem("n",n);
    matrix.innerHTML = row;
}