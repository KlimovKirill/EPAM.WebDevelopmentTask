document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

    });

    var productName;
    var productCount;
    var productPrice;

    function productFilter() {
        var input, filter, table, tr, td, i;
        input = document.getElementById("search_text");
        filter = input.value.toUpperCase();
        table = document.getElementById("productTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
            }
        }
    }

    function viewDiv(){
        document.getElementById("add_product").style.display = "block";
    };

    function addRow(){
        productName = document.getElementById('productName').value;
        productCount = document.getElementById('productCount').value;
        productPrice = document.getElementById('productPrice').value;

        var tbody = document.getElementById('productTable').getElementsByTagName('TBODY')[0];

        var row = document.createElement("TR");
        tbody.appendChild(row);

        var td1 = document.createElement("TD");
        var td2 = document.createElement("TD");
        var td3 = document.createElement("TD");
        var td4 = document.createElement("TD");

        var editButton = document.createElement('input');
        editButton.type = 'button';
        editButton.class = 'submit';
        editButton.value = 'Edit';
        editButton.setAttribute('onclick', 'editRow();');
        
        var delButton = document.createElement('input');
        delButton.type = 'button';
        delButton.id = row.rowIndex;
        delButton.class = 'submit';
        delButton.value = 'Delete';
        delButton.setAttribute('onclick', 'deleteRow(this);');

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);

        td1.innerHTML = productName+' '+productCount;        
        td2.innerHTML = moneyFormat(productPrice);
        td3.appendChild(editButton);
        td4.appendChild(delButton);
        
        document.getElementById("add_product").reset();
        document.getElementById("add_product").style.display = "none";
    }

    function deleteRow(r){  
        if(confirmDelete())
        {
        var i=r.parentNode.parentNode.rowIndex;
        document.getElementById('productTable').deleteRow(i);
        }
    }
    
    function confirmDelete() {
        if (confirm("Вы подтверждаете удаление?")) {
            return true;
        } else {
            return false;
        }
    }

    function validateAllInputs(){
        if(validateProductName() && validateProductCount() && validateProductPrice())
            return true;
        else
            {
                alert("Incorrect input!");
                return false;
        }
    }

    function validateProductName() {
        productName = document.getElementById('productName').value;

        if(productName.length == 0){
            alert("Please enter the product name!");
            return false;
        }

        if (productName.length > 15) {
            alert("Max length: 15!"); 
            return false;
           }
    
        if(productName.match(/^\s+$/) === null) {
            return true;
        } else {
            alert("String contains only whitespace");
            return false;
        }

        return true;
    }

    function validateProductCount() {
        return true;
    }

    function validateProductPrice() {
        return true;
    }

    function moneyFormat(number){
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', useGrouping: true });
        return formatter.format(number);
    }

    function onlyDigits()
    {
    if ((event.keyCode < 45 || event.keyCode > 57) ) event.returnValue = false;
    }

    