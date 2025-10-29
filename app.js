document.addEventListener("DOMContentLoaded",()=>{
  const token = new URLSearchParams(window.location.hash.substring(1)).get("access_token");
  if(!token){window.location.href="index.html";return;}
  const userArea=document.getElementById("userArea");
  const serversGrid=document.getElementById("serversGrid");

  fetch("https://discord.com/api/users/@me",{headers:{Authorization:`Bearer ${token}`}})
    .then(res=>res.json())
    .then(user=>{
      userArea.innerHTML=`<img src='https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png' width='32' height='32' style='border-radius:50%;vertical-align:middle;margin-right:8px;'> ${user.username}#${user.discriminator}`;
    });

  fetch("https://discord.com/api/users/@me/guilds",{headers:{Authorization:`Bearer ${token}`}})
    .then(res=>res.json())
    .then(guilds=>{
      serversGrid.innerHTML=guilds.map(g=>`<div class='server-card'><strong>${g.name}</strong><br><small>${g.id}</small></div>`).join("");
    });

  document.getElementById("logoutBtn").addEventListener("click",()=>{
    localStorage.clear();
    window.location.href="index.html";
  });
});
