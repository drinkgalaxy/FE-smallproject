// 탑 버튼---------------------------------------------
const $topBtn = document.querySelector(".btn-up");

// 버튼 클릭 시 맨 위로 이동
$topBtn.onclick = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
}


// show more 버튼---------------------------------------------
const loading = document.querySelector("#loading");
const loadingButton = document.querySelector(".show_more_button");
const unloadingButton = document.querySelector(".show_stop_button");

function openShow() {
    loading.style.display = "flex";
}

function closeShow() {
    loading.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == loading) {
        closeShow();
    }
};

loadingButton.addEventListener("click", openShow);
unloadingButton.addEventListener("click", closeShow);


// 이미지 무한 로딩---------------------------------------------
let pageToFetch = 1;
const imagesPerLoad = 10; // 한 번에 로딩될 이미지 개수
let totalLoadedImages = 0;

async function fetchImages(pageNum) {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=' + pageNum + '&limit=' + imagesPerLoad);
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();
        console.log(datas);

        makeImageList(datas);

    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}

function makeImageList(datas) {
    const imageList = document.querySelector(".image-list");

    datas.forEach((item) => {
        if (totalLoadedImages < imagesPerLoad) {
            const imgElement = document.createElement('img');
            imgElement.src = item.download_url;
            imgElement.alt = '';
            imageList.appendChild(imgElement);
            totalLoadedImages++;
        }
    });
}

function loadMoreImages() {
    // 현재 스크롤 위치
    const scrollPosition = window.innerHeight + window.scrollY;
    // 전체 문서의 높이
    const documentHeight = document.documentElement.offsetHeight;
    // 스크롤을 전부 내리지 않고 4분의 3만 내려도 이미지 로딩
    if (scrollPosition >= (documentHeight * 3) / 4) {
        fetchImages(pageToFetch++);
        totalLoadedImages = 0; // 다음 로딩을 위해 초기화
    }
}

window.addEventListener('scroll', loadMoreImages);
// 페이지 로드 시 이미지 로딩을 위해 한 번 호출
loadMoreImages();

// 모달창---------------------------------------------
const modal = document.querySelector("#modal");
const openButton = document.querySelector(".enter_button_real");
const closeButton = document.querySelector(".ok_button_real");

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// 지도 API 가져오기---------------------------------------------

type="text/javascript"
src="//dapi.kakao.com/v2/maps/sdk.js?appkey=96140040150978ef92334d6b285d3e33"

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.4423379727783, 126.571449734542), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와 지도 옵션으로  지도를 생성함.
var map = new kakao.maps.Map(mapContainer, mapOption);
// 마커가 표시될 위치를 선정함.
var markerPosition = new kakao.maps.LatLng(33.4423379727783, 126.571449734542);
// 마커를 생성함.
var marker = new kakao.maps.Marker({
    position: markerPosition
});
// 마커가 지도 위에 표시되도록 설정함.
marker.setMap(map);
