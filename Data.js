const teams = [];

function onAddTeam() {
    const newTeam = {
        name: document.getElementById("team-name-input").value,
        members: []
    }
    teams.push(newTeam);
    renderApp();
}

function onDeleteTeam(team) {
    const index = teams.indexOf(team);
    teams.splice(index, 1);
    renderApp();
}

function onAddMember(team, member) {
    team.members.push(member);
    renderApp();
}

function onDeleteMember(team, member) {
    let index = team.members.indexOf(member);
    team.members.splice(index, 1);
    renderApp();
}

function renderApp() {
    const teamsDiv = document.getElementById("teams");
    emptyElement(teamsDiv);
    for(let team of teams) {
        teamsDiv.appendChild( renderTeam(team) );
    }
}

function renderTeam(team) {
    const teamDiv = document.createElement("div");
    teamDiv.className = "mt-3";
   
    const nameHeading = document.createElement("h2");
    nameHeading.textContent = team.name;
    teamDiv.appendChild(nameHeading);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Team";
    deleteButton.className = "btn btn-danger ms-2 float-right";
    deleteButton.addEventListener("click", () => onDeleteTeam(team));
    nameHeading.appendChild(deleteButton);

    teamDiv.appendChild( renderMembersTable(team) );

    return teamDiv;
}

function renderMembersTable(team) {
    const membersTable = document.createElement("table");
    membersTable.className = "table table-dark";

    const headerRow = membersTable.insertRow(0);

    const nameLabelCell = document.createElement("th");
    nameLabelCell.textContent = "Name"
    headerRow.appendChild(nameLabelCell);

    const issueLabelCell = document.createElement("th");
    issueLabelCell.textContent = "Issue Joined"
    headerRow.appendChild(issueLabelCell);

    const createLabelCell = document.createElement("th");
    headerRow.appendChild(createLabelCell);

    const formRow = membersTable.insertRow(1);

    const nameInputCell = document.createElement('td');
    formRow.appendChild(nameInputCell);

    const nameInput = document.createElement('input');
    nameInput.type = "text";
    nameInput.className = "form-control";
    nameInputCell.appendChild(nameInput);

    const issueInputCell = document.createElement('td');
    formRow.appendChild(issueInputCell)

    const issueInput = document.createElement('input');
    issueInput.type = "text";
    issueInput.className = "form-control";
    issueInputCell.appendChild(issueInput);

    let createButtonCell = document.createElement('td');
    formRow.appendChild(createButtonCell);

    const createButton = document.createElement("button");
    createButton.className = "btn btn-primary float-right";
    createButton.textContent = "Create";
    createButton.addEventListener("click", () => {
        const member = {
            name: nameInput.value, 
            issue: issueInput.value 
        }
        onAddMember(team, member)
    })
    createButtonCell.appendChild(createButton);

    for(let member of team.members) {
        membersTable.firstElementChild.appendChild( renderMemberRow(team, member) ) 
    }

    return membersTable;
}

function renderMemberRow(team, member) {
    const memberRow = document.createElement("tr");

    memberRow.insertCell(0).textContent = member.name;
    memberRow.insertCell(1).textContent = member.issue;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-primary float-right";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => 
        onDeleteMember(team, member)
    );
    memberRow.insertCell(2).appendChild(deleteButton)

    return memberRow; 
}

function emptyElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}