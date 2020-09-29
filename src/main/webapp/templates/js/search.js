const txt = {
    data: []
};

const word = location.search.substr(location.search.indexOf("=") + 1);

function printCommunity() {
    const type_text = document.querySelector(".type_text");
    let real_tr;
    real_tr = `<tr>` +
                    `<td style="width: 5%;">번호</td>` +
                    `<td style="width: 30%;">이름</td>` +
                    `<td style="width: 35%;">날짜</td>` +
                    `<td style="width: 25%;">작성자</td>` +
                    `<td style="width: 5%;">조회수</td>` +
                `</tr>`;
    document.write(real_tr);

    type_text.innerText = "검색결과";
    type_text.innerHTML += '<a href="../templates/insert.html" style="margin-left: 80%;"><img src="../static/create.png" alt="HomeIcon" /></a>';

    if(txt.data.length === 0) {
        real_tr = "<div style='margin-top: 20px;'>검색하신 내용이 존재하지 않습니다.</div>";
        document.write(real_tr);
    }else {
        for (let index of txt.data) {
            real_tr = `<tr>` +
                `<td >${index.b_id}</td>` +
                `<td><a class="community_a" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a></td>` +
                `<td>${index.b_date}</td>` +
                `<td>${index.userId}</td>` +
                `<td>${index.b_count}</td>` +
                `</tr>`;
            document.write(real_tr);
        }
    }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/search?word=${word}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            txt.data = array;
        }
    };

    xhttp.send();

    document.getElementById("search_word").value = decodeURI(word);

    printCommunity();
})();
