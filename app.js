
ids = ['001','002','003','004','005','006','007','008',
    '009','010','011','012','013','014','015','016',
   '017','018','019','020','021','022','023','024','025'];


// Create a table.
const table = document.createElement("table");
const edit_btn = document.getElementById('edit');
const search_btn = document.getElementById('search');
const select = document.getElementById('select');
const reset_btn= document.getElementById('reset');



async function get_data(){
    let json =[];
   

    for(let i=0;i<ids.length;i++){
        id=ids[i];
        const response = await fetch(`https://capsules7.herokuapp.com/api/user/${id}`);
        const data = await response.json();
        json.push(data);
        
    }
    let col = [];
    for(let i = 0; i < json.length; i++) {
        for (let key in json[i]) {
            if (col.indexOf(key) === -1) {
            col.push(key);
        }
      }
    }

    

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.

    for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");      // table header.
    th.innerHTML = col[i];
    tr.appendChild(th);
    }

    document.body.appendChild(table);

    // add json data to the table as rows.
    for (let i = 0; i < json.length; i++) {

        tr = table.insertRow(-1);
  
        for (let j = 0; j < col.length; j++) {
          let tabCell = tr.insertCell(-1);
          tabCell.innerHTML = json[i][col[j]];
        }
        let delete_cell= document.createElement('input');
        delete_cell.setAttribute('type','button');
        delete_cell.setAttribute('id','delete');
        delete_cell.setAttribute('value','Delete');
        delete_cell.setAttribute('onclick',"delete_Row(this)");
        let tdd = document.createElement('td');
        tdd.appendChild(delete_cell);
        tr.appendChild(tdd);

        // let edit_cell = document.createElement('input');
        // edit_cell.setAttribute('type','button');
        // edit_cell.setAttribute('id','edit');
        // edit_cell.setAttribute('value','Edit');
        // edit_cell.setAttribute('onclick','edit_table()');
        // let tdi = document.createElement('td');
        // tdi.appendChild(edit_cell);
        // tr.appendChild(tdi);


        
      }
      
     
  
      // Now, add the newly created table with json data, to a container.
      const divShowData = document.getElementById('showData');
      divShowData.innerHTML = "";
      divShowData.appendChild(table);
        
}

edit_btn.addEventListener('click',edit_table);

function edit_table(){
    let cells= table.getElementsByTagName('td');
    for (let i=0;i<cells.length;i++){
        cells[i].onclick = function (){
            if(cells[i].cellIndex==0){
                return;
            }

            if(this.hasAttribute('data-clicked')){
                return;
            }



            this.setAttribute('data-clicked','yes');
            this.setAttribute('data-text',this.innerHTML);
           let input =document.createElement('input');
           input.setAttribute('type','text');
           
           input.value=this.innerHTML;
           input.style.width = this.offsetWidth - (this.clientLeft * 2) + 'px';
           input.style.height = this.offsetHeigth - (this.clientTop *2) +'px';
           input.style.border = "0px";
           input.style.fontFamily = "inhert";
           input.style.fontSize = "inhert";
           input.style.textAlign = "inhert";
           input.style.backgroundColor ="gold";

           input.onblur = function(){
            let td = input.parentElement;
            let org_text = input.parentElement.getAttribute('data-text');
            let curr_text =this.value;
            
            td.removeAttribute('data-clicked');
            td.removeAttribute('data-text');
            td.innerHTML=curr_text;
            td.style.cssText ='padding: 5px'
            
           }

            

           this.innerHTML="";
           this.style.cssText = "padding: 0px 0px";
           
           this.append(input);
           this.firstElementChild.select();
        }
    }   
}


search_btn.addEventListener('keypress',search);


function search(){
var input, val, tr, td, i, txtValue,j=1;
  input = document.getElementById("search");
  val = input.value;
  tr = table.getElementsByTagName("tr");
  map={firstName:2,lastName:3,hobby:4,age:5,gender:1,city:6,capsule:7};
  let k=select.value;
  j = map[k];
  for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[j];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.indexOf(val) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
     } 

    

}
}


function delete_Row(r){
    let i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);

}

