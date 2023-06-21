document.getElementById('form').addEventListener("submit", createCard);
var list;

function createCard(event) { 
    event.preventDefault();
    var persona = {
    name: document.getElementById('f1').value.trim(),
    email: document.getElementById('f2').value.trim(),
    phone: document.getElementById('f3').value.trim(),
    birthday: document.getElementById('f4').value.trim()
    }

          var f1 = document.getElementById('f1').value;
          var f2 = document.getElementById('f2').value;
          var f3 = document.getElementById('f3').value;
          var f4 = document.getElementById('f4').value;
          if (f1==null || f1=="",f2==null || f2=="",f3==null || f3=="",f4==null || f4=="")
          {
            alert("Please Fill All Required Field");
            return false;
          }


        list.unshift(persona);
        event.target.reset();
        localStorage.persona = JSON.stringify(list);
        listitem();
      
};



if(localStorage.persona == undefined) {
   list = [];
  }else{
   list = JSON.parse(localStorage.persona);
  }



function listitem() {
  console.log(list.length);
  var container = document.getElementById("container");
  container.innerHTML="";
  var uL = document.createElement("ul")
  container.appendChild(uL);
  for(var i = 0; i<list.length; i++){
    var listItem = document.createElement("li");
    uL.appendChild(listItem);
    listItem.innerHTML = "<div class='list'><h2>Name: "+ list[i].name+"</h2><p>Phone: "+list[i].phone+"</p><p>E-mail: "+list[i].email+"</p><p>Birthday: "+list[i].birthday+"</p></div>";
  }

}
