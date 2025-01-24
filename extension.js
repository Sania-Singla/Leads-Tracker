let myLeads = [];

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    renderLead();
});

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // presisting the leads on refresh on screen and prevents local storage from getting overwritten

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLead();
}

let tabBtn = document.getElementById("tab-btn");

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLead();
    });
});

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    myLeads = JSON.stringify(myLeads);
    localStorage.setItem("myLeads", myLeads); // were getting overwrote on refreshing before writing truthy value conditional code
    myLeads = JSON.parse(myLeads);
    /* or simply use: localStorage.setItem("myLeads",JSON.stringify(myLeads));   
       becuase it will stringify the array only when involked and 
       also will not permantly make the array a string so we will not have to use parse afterwards*/
    inputEl.value = "";
    renderLead();
});

function renderLead() {
    let listItems = "";

    for (let i = 0; i < myLeads.length; i++) {
        listItems +=
           `<li>
                <a href=${myLeads[i]} target='_main'>
                    ${myLeads[i]}
                </a>
            </li>`; //because DOM manipulation comes with a cost ( therefore rather than updating the innerHTML 3 times we can use it outside the loop just one time )
    } 
    ulEl.innerHTML = listItems;
}
