const community = {
    data: [],
    image: [],
    user:[]
};

const b_id = location.search.substr(location.search.indexOf("=") + 1);
const userId = document.cookie.substr(7,);

(function userId() {
    if(userCookie !== "") {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";

        const data = {
            encode: userCookie
        }

        xhttp.open("POST", url + `/member/userInfo`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
            community.user  = JSON.parse(xhttp.responseText);
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
    }
})();

function imageDownload(i_id) {
    const url = "http://localhost:8080";

    location.href = url + `/board/download/${i_id}`;
}

function commentInsert() {
    if (document.getElementById("c_content").value.trim().length <= 0) {
        alert("댓글에 내용을 작성해주세요.");
        document.getElementById("c_content").focus();
        return false;
    } else if (document.getElementById("c_content").value.length > 50) {
        alert("글자 제한 수를 초과하였습니다.");
        document.getElementById("c_content").focus();
        return false;
    }

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const commentData = {
        userId: userId,
        b_id: b_id,
        c_content: document.getElementById("c_content").value
    };

    xhttp.open("POST", url + `/comment`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            location.href = `userCommunity.html?b_id=${b_id}`;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(commentData));
}

function communityDelete() {
    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";
        const deleteData = {
            userId: userId,
            b_id: community.data.b_id
        };

        xhttp.open("DELETE", url + `/board/community/${b_id}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("삭제하였습니다.");
                location.href = "index.html";
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(deleteData));
    }
}

function secondDelete(c_id) {
    if (confirm("해당 댓글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";
        const deleteData = {
            c_id: c_id,
            userId: userId
        };

        xhttp.open("DELETE", url + `/comment/${c_id}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("대댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("삭제하였습니다.");
                location.href = `userCommunity.html?b_id=${b_id}`;
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(deleteData));
    }
}

function commentDelete(c_id) {
    if (confirm("해당 댓글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";
        const deleteData = {
            c_id: c_id,
            userId: userId
        };

        xhttp.open("DELETE", url + `/comment/${deleteData.c_id}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("삭제하였습니다.");
                location.href = `userCommunity.html?b_id=${b_id}`;
            }
        };
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(deleteData));
    }
}

function secondInsert(c_id) {
    if (document.getElementById(`second_content_${c_id}`).value.trim().length <= 0) {
        alert("댓글에 내용을 작성해주세요.");
        document.getElementById(`second_content_${c_id}`).focus();
        return false;
    } else if (document.getElementById(`second_content_${c_id}`).value.length > 50) {
        alert("글자 제한 수를 초과하였습니다.");
        document.getElementById(`second_content_${c_id}`).focus();
        return false;
    }

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    const secondData = {
        b_id, b_id,
        recomment_id: c_id,
        userId: userId,
        c_content: document.getElementById(`second_content_${c_id}`).value
    };

    xhttp.open("POST", url + `/comment/second`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("대댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else{
            location.href = `userCommunity.html?b_id=${b_id}`;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(secondData));
}

function second_enter(c_id) {
    if (window.event.keyCode === 13) {
        secondInsert(c_id);
    }
}

function secondBox(c_id){
    if (document.cookie.substr(7,) === "") {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return false;
    }
    let second = document.getElementsByClassName(`second_${c_id}`);

    for (let i = 0; i < second.length; i++){
        if(second[i].style.display === 'none'){
            second[i].style.display = 'block';
        }else{
            second[i].style.display = 'none';
        }
    }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/view/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        community.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function image() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    xhttp.open("GET", url + `/board/getImage/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        community.image = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

function download(){
    let downloadBox = document.getElementsByClassName(`download_box`);

    for (let i = 0; i < downloadBox.length; i++){
        if(downloadBox[i].style.display === 'none'){
            downloadBox[i].style.display = 'block';
        }else{
            downloadBox[i].style.display = 'none';
        }
    }
}

function infoBox() {
    let box = document.getElementsByClassName(`community_info_box`);

    for (let i = 0; i < box.length; i++){
        if(box[i].style.display === 'none'){
            box[i].style.display = 'block';
        }else{
            box[i].style.display = 'none';
        }
    }
}

let cnt = 0;

(function printCommunity() {
    const txt = document.querySelector(".txt");
    const time = new Date(community.data.b_date);

    for (let c_cnt of community.data.comments) {
        ++cnt
    }


    /* 본문  */
    if (community.data.b_type === "1") {
        txt.innerText = "자유게시판";
    } else if (community.data.b_type === "2") {
        txt.innerText = "게임게시판";
    } else if (community.data.b_type === "3") {
        txt.innerText = "음식게시판";
    } else {
        txt.innerText = "코딩게시판";
    }
    //<input type="button" value="목록" class="list_btn" />
    txt.innerHTML +=
        `<div style="text-align: right;">` +
            `<a href="community.html?b_type=${community.data.b_type}"><img src="../static/list.png" alt="IMG" /></a>` +
        `</div>`;

    let real_div = `<div>`;
    real_div +=
        `<div class="info_div div_border">`+
            '<div style="margin: 10px 0 0 0;">' +
                `<span>` +
                    `<img class="community_profile user_cursor" src="data:image/jpg;base64, ${community.data.profile}" alt="Image" onclick="location.href='userInfo.html?userId=${community.data.userId}'" />` +
                `</span>` +
                '<div style="display: inline-block;">' +
                    `<span class="userId user_cursor" onclick="location.href='userInfo.html?userId=${community.data.userId}'">${community.data.userId}</span>` +
                    `<br>` +
                    `<span class="info">` +
                        `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                        `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                        `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                        `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}` +
                    `</span>` +
                    `<span class="info"><img class="index_img_size" src="../static/comment.png" alt="eyeIcon" />${cnt}</span>` +
                    `<span class="info"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${community.data.b_count}</span>` +
                '</div>' +
                '<span onclick="infoBox()"><img src="../static/more_vert.png" class="icon" alt="img" style="cursor: pointer;" /></span>' +
            '<div class="community_info_box" style="float: right;">' +
                `<a href="boardComment.html?b_id=${b_id}" class="comment_box_info_box_size">답글</a>`;
    if (community.user.userId  === community.data.userId) {
        real_div +=
                `<div class="comment_box_info_box_size">` +
                    `<a href="modify.html?b_id=${b_id}">수정</a>` +
                `</div>` +
                `<div class="comment_box_info_box_size" onclick="communityDelete()">삭제</div>`;
    }
    real_div +=
                `</div>` +
            '</div>' +
        '</div>';
    if (community.image.length > 0) {
        real_div +=
            `<div style="text-align: right; margin: 10px 0 0 0; cursor: pointer;" onclick="download()">` +
                `<img src="../static/folder.png" alt="folder" style="width: 20px; height: 20px;"/>첨부파일[${community.image.length}]` +
            `</div>` +
            '<div class="download_box">';
        for (let index of community.image) {
            real_div +=
                    `<div> ${index.fileName} `+
                // `<div style="width:70px;padding:0 5px; overflow:hidden;text-overflow:ellipsis;white-space:nowrap; display: inline-block">${index.fileName}</div>\` +
                        `<img style="width: 20px; height: 20px;" src="../static/download.png" alt="Image" onclick="imageDownload(${index.i_id})">` +
                    `</div>`;
        }
        real_div += '</div>';
    }
    real_div +=
        '<div class="div_border">' +
            `<p class="b_id_size" style="margin: 10px 0 0 25px; color: #999">#${community.data.b_id}</p>` +
            `<p class="title">${community.data.b_title}`+
                `<img id="myBtn" class="modal_collections" src="../static/collections.png" alt="collections_icon"/>` +
            `</p>` +
            '<hr style="width: 93%; border-color: #ddd">' +
            `<pre class="content">${community.data.b_content}</pre>` +
        '</div>';

    if (community.image.length > 0) {
        let imgOne = 0;

        real_div +=
            `<div id="myModal" class="modal">` +
                `<div class="modal-content">` +
                    `<span class="close">&times;</span>` +
                    `<img src="../static/left_arrow.png" alt="left_arrow" class="left_btn" onclick="leftBtn()"/>` +
                    `<div class="modal_img_div">` ;
        for (let index of community.image) {
            if(imgOne !== 0) {
                real_div +=
                    `<span class="imgDiv" style="display: none;">` +
                        `<img class="content_image" src="data:image/jpg;base64, ${index.image}" alt="Image"/>` +
                    '</span>';
            }else {
                real_div +=
                    `<span class="imgDiv">` +
                        `<img class="content_image" src="data:image/jpg;base64, ${index.image}" alt="Image"/>` +
                    '</span>';
            }
            ++imgOne;
        }
                   real_div +=
                       `</div>` +
                    `<img src="../static/right_arrow.png" alt="right_arrow" class="right_btn" onclick="rightBtn()"/>` +
                    `</div>` +
                `</div>`;
    }
    real_div +=
        '</div>' ;
    document.write(real_div);
})();

(function printComment() {
    /* 댓글 */
    let  real_comment =
        '<div class="div_border" style="margin: 30px 0 0 0;">' +
            `<div class="div_border comment_title" style="margin: 0 0 20px 0;">댓글  ${cnt}</div>`;
    let hr_count = 0;
    for (let value of community.data.comments) {
        const time = new Date(value.c_date);
        if (value.c_id === value.recomment_id) {
            if (hr_count !== 0){
                real_comment +=
                    '<hr style="width: 93%; border:1px solid #ddd">';
            }
            real_comment +=
                    `<span>` +
                        `<img class="second_profile user_cursor" src="data:image/jpg;base64, ${value.profile}" alt="Image" onclick="location.href='userInfo.html?userId=${value.userId}'" />` +
                    `</span>` +
                    '<div style="display: inline-block;">' +
                        `<span class="userId user_cursor" onclick="location.href='userInfo.html?userId=${value.userId}'">${value.userId}님</span>` +
                            `<span class="comment_txt" onclick="secondBox(${value.c_id})"> 댓글쓰기</span>` +
                        '<br>'
            real_comment +=
                        `<span class="info">` +
                            `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                            `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                            `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                            `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}`;
            if(value.updateCheck > 0) {
                real_comment +=
                    '<span class="update_check"> (수정됨)</span>';
            }
            real_comment +=
                        '</span>' +
                    '</div>';
            if (community.user.userId === value.userId) {
                real_comment +=
                    `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="commentDelete(${value.c_id})" /></span>` +
                    `<span><a href="commentModify.html?c_id=${value.c_id}&b_id=${b_id}"><img class="icon" src="../static/modify.png" alt="modifyImg" /></a></span>`;
            }
            real_comment +=
                    `<br>` +
                    `<pre class="c_content">${value.c_content}</pre>` +
                    /* 대댓글 입력 */
                    `<br>` +
                    `<div class="second_${value.c_id}" style="display:none; text-align: center;">` +
                        `<p id="second_length" style="text-align: left; margin: 0 0 0 100px;"></p>` +
                        `<input id="second_content_${value.c_id}" type="text" class="comment_box" onkeyup="second_enter(${value.c_id})"/>` +
                        `<button class="comment_btn" onclick="secondInsert(${value.c_id})">등록</button>` +
                    `</div>`;
        }else {
            /* 대댓글 */
                real_comment +=
                    '<hr style="width: 93%; border:1px solid #ddd">' +
                    `<img class="arrow_icon" src="../static/arrows.png" alt="img"/>` +
                    `<span><img class="second_profile user_cursor" src="data:image/jpg;base64, ${value.profile}" alt="Image" onclick="location.href='userInfo.html?userId=${value.userId}'" /></span>` +
                    '<div style="display: inline-block;">' +
                        `<span class="userId user_cursor" onclick="location.href='userInfo.html?userId=${value.userId}'">${value.userId}님</span>` +
                        `<div class="info">` +
                            `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                            `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                            `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                            `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}`;
            if(value.updateCheck > 0) {
                real_comment +=
                    '<span class="update_check"> (수정됨)</span>';
            }
            real_comment +=
                        '</div>' +
                    '</div>';
                if (community.user.userId === value.userId) {
                    real_comment +=
                        `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="secondDelete(${value.c_id})" /></span>` +
                        `<span>` +
                            `<a href="secondModify.html?c_id=${value.c_id}&recomment_id=${value.recomment_id}&b_id=${b_id}">` +
                                `<img class="icon" src="../static/modify.png" alt="modifyImg" />` +
                            `</a>` +
                        `</span>`;
                }
                real_comment +=
                    `<br>` +
                    `<pre class="c_content_second">${value.c_content}</pre>`;
            }
        ++hr_count;
    }
    real_comment +=
            '</div>';

    /* 댓글 */
    real_comment +=
        '<div class="div_border" style="height: 130px;">';
    if (userId !== "") {
        real_comment +=
            `<p id="comment_length" class="comment_length"></p>` +
                `<div style=" margin: 30px 0 0 100px;">` +
                    `<textarea id="c_content" class="comment_box textarea_resize"></textarea>` +
                    `<span><button class="comment_btn" style="position: absolute;" onclick="commentInsert()">등록</button></span>` +
                    '<p id="warning_message" class="warning_message"></p>' +
                `</div>`;
    } else {
        real_comment +=
            '<div style="text-align: center; margin: 50px 0 0 0;">로그인 후 이용할 수 있습니다.</div>';
    }
    real_comment +=
        '</div>';

    document.write(real_comment);
})();
