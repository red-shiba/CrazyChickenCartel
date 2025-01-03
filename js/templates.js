function renderStartScreen() {
    return /*html */`
        <div id="startScreen" class="mainScreen startScreen">
            <div class="buttonBox">
                <button class="button" onclick="init()">Start</button>
                <button class="button" onclick="window.location.replace('html/impressum.html')">Impressum</button>
                <button class="button" onclick="loadControleInfo()">Controles</button>
            </div>
        </div>
        <div class="controleInfo">
            <span>Press left and right Arrow <br>-<br> Move Left/Right</span>
            <span>Press D <br>-<br> Throw Bottle</span>
            <span>Press Space <br>-<br> to Jump</span>
        </div>
    `;
}

function renderEndScreen() {
    return /*html */`
        <div id="endScreen" class="mainScreen winScreen">
            <div class="buttonBox">
                <button class="button" onclick="init()">Restart</button>
                <button class="button" onclick="firstLoad()">Home</button>
            </div>
        </div>
    `;
}

function renderEndmuteButton() {
    return /*html */`
    <svg onclick="endmuteAllSounds()" class="muteButton" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M18.2071 7.20711C18.5976 6.81658 18.5976 6.18342 18.2071 5.79289C17.8166 5.40237 17.1834 5.40237 16.7929 5.79289L5.79289 16.7929C5.40237 17.1834 5.40237 17.8166 5.79289 18.2071C6.18342 18.5976 6.81658 18.5976 7.20711 18.2071L18.2071 7.20711Z"
                            fill="#ffffff"></path>
                        <path
                            d="M10.8639 8.6L15.3 5.87158L10.5716 10.6H8V13.1716L6.33126 14.8403C6.12404 14.5831 6 14.256 6 13.9V10.1C6 9.27157 6.67157 8.6 7.5 8.6H10.8639Z"
                            fill="#ffffff"></path>
                        <path
                            d="M16 16.2109L12.6673 14.1611L11.2135 15.615L15.7142 18.3831C16.7136 18.9978 18 18.2788 18 17.1055V8.82844L16 10.8284V16.2109Z"
                            fill="#ffffff"></path>
                    </g>
                </svg>
    `;
}

function renderMuteButton() {
    return /*html */`
    <svg onclick="muteAllSounds()" class="muteButton" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M16 9V9C17.2111 10.8167 17.2111 13.1833 16 15V15" stroke="#ffffff" stroke-width="2"
                stroke-linecap="round"></path>
            <path d="M20 8V8C21.259 10.5181 21.259 13.4819 20 16V16" stroke="#ffffff" stroke-width="2"
                stroke-linecap="round"></path>
            <path
                d="M7.4172 8.65233L10.5397 6.05023C11.5167 5.23607 13 5.93081 13 7.20256V16.7974C13 18.0692 11.5167 18.7639 10.5397 17.9498L7.4172 15.3477C7.14763 15.123 6.80783 15 6.45693 15H4.5C3.67157 15 3 14.3284 3 13.5V10.5C3 9.67157 3.67157 9 4.5 9H6.45693C6.80783 9 7.14763 8.87698 7.4172 8.65233Z"
                stroke="#ffffff" stroke-width="2"></path>
        </g>
    </svg>
    `;
}

function renderControleInfo() {
    return/*html */`
    <div class="controleInfoWindow mainScreen">
        <div>
            <span class="backButton" onclick="loadStartScreen()">Back</span>
        </div>
        <div class="windowControles">
            <span>Press left and right Arrow <br>-<br> Move Left/Right</span>
            <span>Press D <br>-<br> Throw Bottle</span>
            <span>Press Space <br>-<br> to Jump</span>
        </div>
    </div>
`;
}
