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
function countZeros(arr)
{
    let temp = [];
    let weightMatrix = [];
    for(let i in arr)
    {
        let ct=0;
        for(let j in arr[i])
        {
            if(arr[i][j] == 0)
            {
                ct++;
            }
        }
        temp.push(ct);
    }
    weightMatrix.push(temp);
    temp = [];
    for(let i in arr)
    {
        let ct=0;
        for(let j in arr[i])
        {
            if(arr[j][i] == 0)
            {
                ct++;
            }
        }
        temp.push(ct);
    }
    weightMatrix.push(temp);
    return weightMatrix;
}

let matrix = [];
let weightMatrix = [];
let n = localStorage.getItem("n");
setMatrix();
function solve()
{
    /* grab elements from The DOM */
    let stepdiv = document.querySelector("#steps");
    stepdiv.innerHTML = "";
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
    let hasEmpty = matrix.filter((row)=> row.includes("")).length > 0;
    if(!hasEmpty)
    {
        stepdiv.innerHTML += "<p>Starting Matrix:</p>";
        /* Display The first Matrix */
        stepdiv.innerHTML += displayMatrix();
        /* Subtract the minimum of each row */
        stepdiv.innerHTML+= "<p>Subtract The Maximum in each Row</p>"
        Subtract(matrix);
        stepdiv.innerHTML += displayMatrix();
        /* Subtract the minimum of each column */
        stepdiv.innerHTML+= "<p>Subtract The Maximum in each Column</p>"
        transpose(matrix);
        Subtract(matrix);
        transpose(matrix);
        stepdiv.innerHTML += displayMatrix();
        /* TODO: implement line crossing */
    }
    else
    {
        alert("Please Enter All Values");
    }
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