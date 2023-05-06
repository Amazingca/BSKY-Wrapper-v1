var OGDids;

/*if (localStorage.getItem("userDid") != null) {
  
  document.getElementById("labelCheckFlagged").disabled = false;
  document.getElementById("labelOfCheckFlagged").classList.remove("disabledFlag");
}*/

async function buildPreReqs() {
  
  if (localStorage.getItem("labels") != null) {

    const labelSwitches = JSON.parse(localStorage.getItem("labels"));

    for (var i = 0; i < Object.keys(labelSwitches).length; i++) {

      if (labelSwitches[Object.keys(labelSwitches)[i]] === "true") {

        switch (Object.keys(labelSwitches)[i]) {
          case "EarlyAccounts":
            document.getElementById("labelCheckOGDids").checked = true;

            try {

              OGDids = await fetch("./OGDids.json").then(r => r.json());
            } catch (e) {

              console.log(e);
            }
            break;
          case "LabeledAccounts":
            document.getElementById("labelCheckFlagged").checked = true;
            break;
          default:
            break;
        }
      }
    }
  }
}

buildPreReqs();

var value = [];

document.getElementById("labelCheckOGDids").addEventListener("change", function() {
  checkOGDids("EarlyAccounts");
});

document.getElementById("labelCheckFlagged").addEventListener("change", function() {
  checkOGDids("LabeledAccounts");
});

function checkOGDids(type) {
  
  value[0] = type;
  value[1] = document.getElementById("labelCheckOGDids").checked;
  
  if (value[1]) {
    
    value[1] = "true";
  } else {
    
    value[1] = "false";
  }
  
  saveLabels();
}

function saveLabels() {
  
  if (localStorage.getItem("labels") != null) {
    
    var cache = JSON.parse(localStorage.getItem("labels"));
    
    cache[value[0]] = value[1];
    
    localStorage.setItem("labels", JSON.stringify(cache));
  } else {
    
    var cache = {};
    
    cache[value[0]] = value[1];
    
    localStorage.setItem("labels", JSON.stringify(cache));
  }
  
  value = [];
}

function checkForLabels(did) {
  
  if (localStorage.getItem("labels") === null) {
    
    return "";
  }
  
  const flagSaveData = JSON.parse(localStorage.getItem("labels"));
  
  if (Object.keys(flagSaveData).length === 0) {
    
    return "";
  }
  
  var enabledFlags = [];
  
  for (var i = 0; i < Object.keys(flagSaveData).length; i++) {
    
    if (flagSaveData[Object.keys(flagSaveData)[i]] === "true") {
      
      enabledFlags.push(Object.keys(flagSaveData)[i]);
    }
  }
  
  if (enabledFlags.length === 0) {
    
    return "";
  }
  
  var flagHTML = "";
  
  for (var i = 0; i < enabledFlags.length; i++) {
    
    switch (enabledFlags[i]) {
      case "EarlyAccounts":
        
        for (var o = 0; o < OGDids.length; o++) {
          
          if (did === OGDids[o]) {
            
            flagHTML += "<h5 style='padding: 0.25rem; padding-right: 0.5rem; padding-bottom: 0px; background-image: linear-gradient(to bottom right, #0099ffAA, #3b82f6FF); -webkit-text-fill-color: white; width: fit-content; border-radius: 10px;'>OG Account</h5>";
          }
        }
        break;
      default:
        break;
    }
  }
  
  if (flagHTML === "") {
    
    return [false];
  } else {
    
    return [true, flagHTML];
  }
}

export function labelHandle(did, textSize, handle) {
  
  const labels = checkForLabels(did);
  
  if (labels[0] === true) {
    
    console.log('labeled', labels[1], did)
    return `<h3 style="color: #555; ${textSize}"><flex style="justify-content: space-between;">@<a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${handle}" title="Go to User Profile">${handle}</a>${labels[1]}</flex></h3>`;
  } else {
    
    return `<h3 style="color: #555; ${textSize}">@<a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${handle}" title="Go to User Profile">${handle}</a></h3>`;
  }
}

export function labelUsername(did, textSize, displayName) {
  
  const labels = checkForLabels(did);
  
  if (labels[0] === true) {
    
    return `<h3 style="${textSize}"><flex style="justify-content: space-between;"><div>${displayName}</div>${labels[1]}</flex></h3>`;
  } else {
    
    return `<h3 style="${textSize}">${displayName}</h3>`;
  }
}
