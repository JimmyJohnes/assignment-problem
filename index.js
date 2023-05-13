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
function getZeroPosition(arr,zeros)
{
    for(let i =0;i<arr.length;i++)
    {
       
        for(let j = 0;j<arr[i].length;j++)
        {
          if(arr[i][j] == 0)
          {
             let zero = [i,j]
            zeros.push(zero);
          }
        }
    }
}
function removeAllZeros(zeros,obj,roc)
{
    for(let j = 0;j<zeros.length;j++)
    {
        if(zeros[j][roc] == obj[roc])
        {
            zeros.splice(j,1);
            j=0
        }
    }
}
function assignments(arr,lines)
{
    let assignments = []
    let zeros = [];
    getZeroPosition(arr,zeros);
    
    while(zeros.length > 0)
    {
        let obj = zeros.pop();
        console.log(zeros)
        for(let i=0;i<zeros.length;i++)
        {
          
           if(i<zeros.length&&zeros[i][1] == obj[1])
           {
                removeAllZeros(zeros,obj,1)
                lines.push({
                    dir:"V",
                    col:obj[1]
                })
                i=0;
           }
            if(i<zeros.length&&zeros[i][0] == obj[0])
           {
            removeAllZeros(zeros,obj,0)
                
                lines.push({
                    dir:"H",
                    row:obj[0]
                })
                i=0;
           }
        }
        if(zeros.length==0&&obj!=null)
        {
            let flag=0
            for(let i =0 ; i<arr[obj[0]].length;i++)
            {
                if(arr[obj[0]][i]==0)
                {
                    flag=1;
                    lines.push({
                        dir:"V",
                        row:obj[1]
                    })
                }
            }
            if(!flag)
            {
                lines.push({
                    dir:"H",
                    row:obj[0]
                })
            }
        }
        assignments.push(`(${obj[0]},${obj[1]})`)
    }
    return assignments;
}
function intersections(lines)
{
    let intersection = [];
    for(let i = 0;i<lines.length;i++)
    {
        for(let j = i+1;j<lines.length;j++)
        {
           if(lines[i].dir == "V"&& lines[j].dir == "H")
           {
            intersection.push([lines[j].row,lines[i].col]);
           }
        }
    }
    return intersection;
}
function addAndSubtract(arr,lines,intersections)
{
    let min = Infinity;
    
    /* find the minimum in uncovered cells */
    for(let i = 0; i<arr.length;i++)
    {
        for(let j = 0; j<arr[i].length;j++)
        {
            let flag = 0;
            for(let k = 0; k<lines.length;k++)
            {
                if(lines[k].col==j||lines[k].row==i)
                {
                    flag=1;
                }
            }
            if(min>arr[i][j]&&!flag)
            {
                min= arr[i][j];
            }
        }
    }
    /* add minimum to intersection cells */
    for(let i = 0;i<intersections.length;i++)
    {
        arr[intersections[i][0]][intersections[i][1]] += min;
    }
    /* subtract minimum from uncovered cells */
    for(let i = 0; i<arr.length;i++)
    {
        for(let j = 0; j<arr[i].length;j++)
        {
            let flag = 0;
            for(let k = 0; k<lines.length;k++)
            {
                if(lines[k].col==j||lines[k].row==i)
                {
                    flag=1;
                }
            }
            if(!flag)
            {
                arr[i][j] -= min;
            }
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
    matrix = [];
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
    let cm = p3 = JSON.parse(JSON.stringify(matrix));
    let hasEmpty = matrix.filter((row)=> row.includes("")).length > 0;
    if(!hasEmpty)
    {
        stepdiv.innerHTML += "<p>Starting Matrix:</p>";
        /* Display The first Matrix */
        stepdiv.innerHTML += displayMatrix();
        /* Subtract the minimum of each row */
        stepdiv.innerHTML+= "<p>Subtract The Minimum in each Row</p>"
        Subtract(matrix);
        stepdiv.innerHTML += displayMatrix();
        /* Subtract the minimum of each column */
        stepdiv.innerHTML+= "<p>Subtract The Minimum in each Column</p>"
        transpose(matrix);
        Subtract(matrix);
        transpose(matrix);
        /* assign according to current matrix */
        let lines = [];
        let assignment = assignments(matrix,lines);
        let i = 1;
        stepdiv.innerHTML += displayMatrix();
        stepdiv.innerHTML+= `<hr><h2>Iteration: ${i}</h2>`;
        i++;
        stepdiv.innerHTML+= `<p>Assignment According to Current Matrix <span class ="red">${assignment}</span></p>`;
        
        while(assignment.length!=n)
        {
            stepdiv.innerHTML+= `<hr><h2>Iteration: ${i}</h2>`;
            i++;
            if(assignment.length!=n)
            {
                stepdiv.innerHTML+= `<p>Since the number of assignments != matrix dimensions then this is not the optimal answer</p>`;
            }
            let intersection = intersections(lines);
            addAndSubtract(matrix,lines,intersection);
            lines = [];
            assignment = assignments(matrix,lines);
            stepdiv.innerHTML += displayMatrix();
            stepdiv.innerHTML+= `<p>Assignment According to Current Matrix <span class="red">${assignment}</span></p>`;
        }
        stepdiv.innerHTML+=`<p>Total Cost: `;
        let tcost = 0;
        for(let j = 0;j<assignment.length;j++)
        {
            let t = assignment[j].split(",")
            stepdiv.innerHTML+=`${cm[t[0][1]][t[1][0]]}`;
            tcost += parseInt(cm[t[0][1]][t[1][0]]);
            if(j!=assignment.length-1)
            {

                stepdiv.innerHTML+=`+`;
            }
            else
            {
                stepdiv.innerHTML+=`= `
            }
        }
        stepdiv.innerHTML+=`${tcost}</p>`;

        
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