let myLeads=[];
// console.log(typeof myLeads);
// myLeads=JSON.stringify(myLeads);        //will convert the array(object) to a string( so that can be stored in localstorage). 
// console.log(typeof myLeads);
// myLeads=JSON.parse(myLeads);            //will convert a string to an array.
// console.log(typeof myLeads);


const inputEl=document.getElementById("input-el");
const ulEl=document.getElementById("ul-el");
const inputBtn=document.getElementById("input-btn");
const deleteBtn=document.getElementById("delete-btn");

deleteBtn.addEventListener("dblclick",function(){              //delete all
    localStorage.clear();
    myLeads=[];
    renderLead();
});

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));       // presisting the leads on refresh on screen and prevents local storage from getting overwritten 

if(leadsFromLocalStorage)    // non zero values are truthy values 
{
    myLeads=leadsFromLocalStorage;
    renderLead();
}

// const tabs = [                                                     //array of objects as elements (now this is in the chrome object hence chrome.tabs )
//     {url: "https://www.linkedin.com/in/sania-singla/"}        //hard-coded
// ]

let tabBtn = document.getElementById("tab-btn");

tabBtn.addEventListener("click",function() {

    chrome.tabs.query({active:true,currentWindow:true},function(tabs) {

        myLeads.push(tabs[0].url);
        localStorage.setItem( "myLeads" , JSON.stringify(myLeads) );
        renderLead();

    });

});



inputBtn.addEventListener("click",function() 
{
    myLeads.push(inputEl.value); 
    myLeads=JSON.stringify(myLeads);
    localStorage.setItem("myLeads",myLeads);    // were getting overwrote on refreshing before writing truthy value conditional code
    myLeads=JSON.parse(myLeads);
    /* or simply use: localStorage.setItem("myLeads",JSON.stringify(myLeads));   
       becuase it will stringify the array onle when involked and 
       also will not permanntly make the array a string so we will not have to use parse afterwards*/
    inputEl.value="";
    renderLead();
});


// for(let i=0;i< myLeads.length;i++)
// {
//         ulEl.innerHTML += "<li>"+myLeads[i]+"</li>" ;    // or `<li> ${myLeads[i]} </li>`
//     // other method steps: createElement(),styleit,append it
//     // const listItem=document.createElement("li");
//     // listItem.textContent=myLeads[i];
//     // ulEl.append(listItem);
// }

function renderLead()                         // will print all the leads on screen on clicking  in the myLeads array
{
    let listItems="";

    for(let i=0;i< myLeads.length;i++)
    {
        listItems += "<li><a href=' " + myLeads[i] + " ' target='_main' >"+ myLeads[i]+"</a></li>" ;      //becuade DOM manipulation comes with a cost ( therefore rather than updating the innerHTML 3 times we can use it outside the loop just one time )
    }                   /* or 

                              ` <li>
                                    <a href='${myLeads[i]}' target='_blank'> 
                                         ${myLeads[i]}
                                    </a>
                                </li> ` 

                                //back ticks allows to break the string into multiple lines 
                        */
    ulEl.innerHTML=listItems;

}

