let faviconFetcher = `https://www.google.com/s2/favicons?domain=`;

const form = document.querySelector("#form");
const site = document.querySelector("#site");
const myUrl = document.querySelector("#myUrl");
const submit = document.querySelector("#submit");
const bookmarks = document.querySelector("#bookmarks");
const addMarks = document.querySelector(".addMarks");
const appHeader = document.querySelector(".app-header");


addMarks.addEventListener("click", () => {
    appHeader.classList.toggle("active");

    if(appHeader.classList.contains("active")){
        addMarks.innerHTML = `
            <i class="fa fa-times" aria-hidden="true"></i>
        `
    }else{
        addMarks.innerHTML = `
            <i class="fa fa-plus" aria-hidden="true"></i>
        `
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
})

let bookmarkArr = [];

submit.addEventListener("click", () => {
    let check1 = myUrl.value;
    let check2 = site.value;
    bookmarkArr = getBookMarks();

    if(check1 == "" || check1 == undefined || check2 == "" || check2 == undefined) return;

    appHeader.classList.remove("active");

    const bookmark = {
        siteUrl : myUrl.value,
        siteName: site.value
    }

    bookmarkArr = [bookmark, ...bookmarkArr];
    saveBookMark(bookmarkArr);
    printOutBookMark();
})

function saveBookMark(bookmarkArr){
    localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
}

function getBookMarks(){
    return(JSON.parse(localStorage.getItem("bookmark")) || []);
}

function deleteBookMark(deletedSite, deletedUrl){
    let workingArr = getBookMarks();
    let indez;
    workingArr.forEach( (item, index) => {
        if(item.siteName == deletedSite && item.siteUrl == deletedUrl){
            indez = index;
        }
    })

    workingArr.splice(indez, 1);
    console.log(workingArr);
    saveBookMark(workingArr);
    printOutBookMark();
}

function printOutBookMark(){
    bookmarks.innerHTML = ``;
    let datas = getBookMarks();

    datas.forEach( (book) => {
        const div = document.createElement("div");
        div.classList.add("eachbooknark");
        div.setAttribute("id", "eachBookmark");
        div.innerHTML = `
            <span class="icon">
                <img src="${faviconFetcher+book.siteUrl}" class="bookIcon" alt="webIcon">
            </span>

            <span class="siteName">
                <a href="${book.siteUrl}" target="_blank" rel="noopener noreferrer" id="link">${book.siteName}</a>
            </span>

            <button class="delete" id="delete">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        `

        const deleteBtn = div.querySelector("#delete");
        const imgBtn = div.querySelector(".bookIcon");

        deleteBtn.addEventListener("click", () => {
            let deletedUrl = book.siteUrl;
            let deletedSite = book.siteName;
            deleteBookMark(deletedSite, deletedUrl)
            console.log(deletedUrl, deletedSite)
        })

        imgBtn.addEventListener("mouseover", (e) => {
            e.target.setAttribute("href", `${book.siteUrl}`);
        })

        imgBtn.addEventListener("click", () => {

        })

        bookmarks.appendChild(div);

        
    })

}


window.onload = () => {
    bookmarkArr = getBookMarks();
    printOutBookMark();
}