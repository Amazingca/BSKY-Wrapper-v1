import { getPost, getUserRepo, listRecords, getUserInfo } from "../api.js";
import { embeds } from "../mods.js";

export async function postDefault(userId, post, type) {
  
  const userProfileObj = await listRecords(userId, "app.bsky.actor.profile");
  const userObj = await getUserRepo(userId);
  
  var postObj;
  var isObj = false;
  
  if (typeof post === 'object' && post.constructor === Object) {
    
    postObj = post;
    isObj = true;
  } else {
    
    postObj = await getPost(userId, post);
  }
  
  if ((userObj === null) || (postObj === null)) {
    
    return null;
  } else {
    
    var replySumElement = "";
    
    if (isObj === true) {
      
      if (post.value.reply != null) {
        
        try {
          
          const replyAuthorDid = post.value.reply.parent.uri.split("//")[1].split("/")[0];
          
          var replyAuthorName;
          
          const replyAuthorProfile = await listRecords(replyAuthorDid, "app.bsky.actor.profile");
        
          if (replyAuthorProfile[0].value.displayName === "") {
            
            replyAuthorName = "@" + (await getUserRepo(replyAuthorDid)).handle;
          } else {
            
            replyAuthorName = replyAuthorProfile[0].value.displayName;
          }
          
          replySumElement = 
            `<a style="text-decoration: none;" onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&postid=${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}" title="Go to Thread">
              <flex class="reply-sum">
                <svg fill="#555" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"></path></svg>
                <h5>Replied to ${replyAuthorName}</h5>
              </flex>
            </a>`;
        } catch(e) {
          
          console.log(e);
        }
      }
    }
    
    var textType = "";
    var textSize = "";
    if (type === "snippet") {
      
      textType = "display: flex; gap: 0.25rem;";
      textSize = "font-size: 16px;";
    }
    
    var usernameElement;
    
    if ((userProfileObj === null) || (userProfileObj[0].value.displayName === "") || (userProfileObj[0].value.displayName === undefined)) {
      
      usernameElement = "";
    } else {
      
      usernameElement = `<h3 style="${textSize}">${userProfileObj[0].value.displayName}</h3>`;
    }
    
    var postText;
    
    if (postObj.record.facets != undefined) {
      
      var selection = [];

      for (var i = 0; i < postObj.record.facets.length; i++) {

        if (postObj.record.facets[i].$type === "app.bsky.richtext.facet") {
          
          const startPos = postObj.record.facets[i].index.byteStart;
          const endPos = postObj.record.facets[i].index.byteEnd;
          const mentionLength = endPos - startPos;

          selection[i][0] = postObj.record.facets[i].features[0].$type;
          selection[i][1] = "";
          selection[i][2] = "";
          
          if (postObj.record.facets[i].features[0].did != undefined) {
            
            selection[i][2] = postObj.record.facets[i].features[0].did;
          } else if (postObj.record.facets[i].features[0].uri != undefined) {
            
            selection[i][2] = postObj.record.facets[i].features[0].uri;
          }

          for (var o = 0; o < mentionLength; o++) {

            selection[i][1] = selection[i][1] + postObj.record.text.split("")[o + startPos];
          }
        }
      }
      
      for (var i = 0; i < selection.length; i++) {
        
        if (selection[i][0] === "app.bsky.richtext.facet#mention") {
          
          postObj.record.text = postObj.record.text.replaceAll(selection[i][1], `<a href="${document.location.origin + document.location.pathname}?username=${selection[i][2]}" class="mention">${selection[i][1]}</a>`);
        } else if (selection[i][0] === "app.bsky.richtext.facet#link") {
          
          postObj.record.text = postObj.record.text.replaceAll(selection[i][1], `<a href="${selection[i][2]}" target="_blank" class="mention">${selection[i][1]}</a>`);
        }
      }
    }
    
    if (postObj.value.embed != undefined) {
      
      if (postObj.value.text != "") {
        
        postText = postObj.value.text.replaceAll("\n", "<br>") + "<br><br>" + await embeds(postObj.value.embed);
      } else {
        
        postText = await embeds(postObj.value.embed);
      }
    } else {
      
      postText = postObj.value.text.replaceAll("\n", "<br>");
    }
    
    const postElement = 
      `<div>
        ${replySumElement}
        <div class="feed-container">
          <div style="${textType}">
            ${usernameElement}
            <h3 style="color: #555; ${textSize}">@<a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}" title="Go to User Profile">${userObj.handle}</a></h3>
          </div>
          <br>
          <div>${postText}</div>
          <br>
          <flex style="justify-content: space-between;">
            <div style="color: #333;">${new Date(postObj.value.createdAt)}</div>
            <div style="color: #333;"><a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&postid=${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}">id#${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}</a></div>
          </flex>
        </div>
      </div>`;
    
    return postElement;
  }
}

export async function user(userId) {
  
  const userProfileObj = await listRecords(userId, "app.bsky.actor.profile");
  const userFollows = await listRecords(userId, "app.bsky.graph.follow");
  const userObj = await getUserRepo(userId);
  
  if (userObj === null) {
    
    return null;
  } else {
    
    var usernameElement;
    
    if ((userProfileObj === null) || (userProfileObj[0].value.displayName === "") || (userProfileObj[0].value.displayName === undefined)) {
      
      usernameElement = "";
    } else {
      
      usernameElement = `<h3>${userProfileObj[0].value.displayName}</h3>`;
    }
    
    var userFollowing;
    
    if (userFollows === null) {
      
      userFollowing = "Following: None";
    } else if (userFollows.length > 1) {
      
      userFollowing = `Following: <a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&type=follows">${userFollows.length} users</a>`;
    } else {
      
      userFollowing = `Following: <a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&type=follows">${userFollows.length} user</a>`;
    }
    
    var userDescription;
    
    if (userProfileObj != null) {
      userDescription = `<div id="user-description">${userProfileObj[0].value.description.replaceAll("\n", "<br>")}</div><br>`;
    } else {
      userDescription = "";
    }
    
    const userElement = 
      `<div class="feed-container">
        ${usernameElement}
        <h3 style="color: #555;">@${userObj.handle} / ${userObj.did}</h3>
        <br>
        ${userDescription}
        <flex>
          <div id="user-follows">${userFollowing}</div>
        </flex>
      </div>`;
    
    return userElement;
  }
}

export async function userLight(userId) {
  
  const userProfileObj = await listRecords(userId, "app.bsky.actor.profile");
  const userObj = await getUserRepo(userId);
  
  if (userObj === null) {
  
    return "";
  } else {
    
    var usernameElement;
    
    if ((userProfileObj === null) || (userProfileObj[0].value.displayName === "") || (userProfileObj[0].value.displayName === undefined)) {
      
      usernameElement = "";
    } else {
      
      usernameElement = `<h3>${userProfileObj[0].value.displayName}</h3>`;
    }
    
    const userElement = 
      `<div class="feed-container">
        ${usernameElement}
        <h3 style="color: #555;">@<a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}" title="Go to User Profile">${userObj.handle}</a></h3>
      </div>`;
    
    return userElement;
  }
  
}