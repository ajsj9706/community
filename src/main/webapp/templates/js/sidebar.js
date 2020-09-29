const userInfo = {
    data: []
};

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + "/member/memberList", false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            userInfo.data = array;
        }
    };

    xhttp.send();
})();

function logout() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/member/logout`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}


let real_header = ``;

real_header += '<div class="main_sidebar">' +
                    '<a href="../templates/index.html"><img src="../static/home_icon.png" alt="HomeIcon" />게시판</a>' +
                '<div>';
if (!!document.cookie) {
    real_header += `<div style="margin: 20px 0 20px 10px;">` +
        `<a href=""><img class="main_sidebar_icon" src="../static/logout.png" alt="HomeIcon" onclick="logout()" /></a>` +
        `${document.cookie.substr(7,)}님`;
    if (document.cookie.substr(7,) === "admin") {
        real_header += `<a href="admin.html"><img class="main_sidebar_icon" src="../static/admin.png" alt="Img" />회원관리</a>`;
    }
    real_header += `</div>`;
} else {
    real_header += `<div style="margin: 20px 0 20px 10px;">` +
                        `<a href="../templates/login.html"><img class="main_sidebar_icon" src="../static/login.png" alt="LoginIcon" />로그인</a>` +
                        `<a href="signUp.html"><img class="main_sidebar_icon" src="../static/person.png" alt="SignUpIcon" />회원가입</a>` +
                    `</div>`;
}
real_header += '</div>';
real_header += '<div style="margin-bottom: 20px;">' +
                    '<input type="text" id="word" style="width: 120px; margin-left: 5px;" placeholder="제목 검색"/>' +
                    '<input type="button" value="검색" onclick="s_search()" style="width: 50px;"/>' +
                '</div>';
real_header += '<div class="main_category">' +
                    '<a href="community.html?b_type=1">' +
                        '자유게시판<img class="main_sidebar_icon" src="../static/people.png" alt="img"/>' +
                    '</a>' +
                '</div>'+
                '<div class="main_category">' +
                    '<a href="community.html?b_type=2">' +
                        '게임게시판<img class="main_sidebar_icon" src="../static/game.png" alt="img"/>' +
                    '</a>' +
                '</div>' +
                '<div class="main_category">' +
                    '<a href="community.html?b_type=3">' +
                        '음식게시판<img class="main_sidebar_icon" src="../static/food.png" alt="img"/>' +
                    '</a>' +
                '</div>' +
                '<div class="main_category">' +
                    '<a href="community.html?b_type=4">' +
                        '코딩게시판<img class="main_sidebar_icon" src="../static/keyboard.png" alt="img"/>' +
                    '</a>' +
                '</div>';
document.write(real_header);