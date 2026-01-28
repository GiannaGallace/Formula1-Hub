// Cookie utilities
function setCookie(cname,cvalue, exdays){
    const d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    let expires ="expires="+ d.toUTCString();
    document.cookie = cname+ "=" + cvalue + ";" + expires +";path=/";
}

function getCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {c = c.substring(1);     
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
  }
  return "";
}

function loadSavedTheme(){
    let savedTheme = getCookie("f1_user_theme");
    if (savedTheme !=""){
        let colors = savedTheme.split(',')
        document.documentElement.style.setProperty('--team-color', colors [0]);
        document.documentElement.style.setProperty ('--accent-color',colors [1])
        document.documentElement.style.setProperty('--team-accent', colors [2])
        const teamSelect =document.getElementById ('team-select');
        if (teamSelect) { teamSelect.value = colors [0];}
    }
}

//Team Switcher
const teamSelect= document.getElementById('team-select');
if (teamSelect) { 
    teamSelect.addEventListener('change', (event) => {
        const bgColor= event.target.value; 
        const selectedOption = event.target.options[event.target.selectedIndex];
        const textColor = selectedOption.getAttribute('data-text')
        const accentColor = selectedOption.getAttribute('data-accent')

        document.documentElement.style.setProperty('--team-color',bgColor);
        document.documentElement.style.setProperty ('--accent-color', textColor)
        document.documentElement.style.setProperty('--team-accent', accentColor)

        setCookie ("f1_user_theme", bgColor + "," + textColor + "," + accentColor, 30)
    });
}

//Fix Home Page 
window.addEventListener('DOMContentLoaded',(event) => {
        console.log("F1 Hub Sytsem Online...");
        loadSavedTheme();
        showPage('home-page');
})

//Switch Pages
function showPage(pageID, sectionID){
    const pages= document.querySelectorAll('.page-content'); //get all the sections with the page content class
    pages.forEach(page => {
        page.style.display = 'none'; //hide all pages
    });
    const targetPage = document.getElementById(pageID);
    if (targetPage){
        targetPage.style.display ='block'; //show only the one that was clicked
        if (sectionID) {
            const targetSection = document.getElementById(sectionID);
            if (targetSection){
                setTimeout(()=>{
                    targetSection.scrollIntoView({behavior: 'smooth'});
                }, 10);
            }
        } else { window.scrollTo({top:0, behavior: 'smooth'}) //reset scroll to top

        }
    }
}


