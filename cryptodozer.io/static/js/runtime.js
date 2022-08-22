console.log('[Game] runtime.js loaded');

let account = '';
let guestId = '';
let isGameStarted = false;
let isReloadBlocked = true;
let showModal = {
  showTransactions: 'transactions',
  showCollection: 'collection',
  showLinkBonus: 'linkbonus',
};
let showHelpPage = {
  showAbout: ['getting-started', 'about'],
  showBonusCoins: ['basics', 'bonus-coins'],
  showFaq: ['getting-started', 'faq'],
};

/**********************************************************
 * Events
 *********************************************************/

/**
 * 게임 시작 이벤트
 * @param {string} sessionId - 사용자 세션 ID
 */
function onStartPlay(sessionId) {
  isGameStarted = true;

  parent.postMessage({
    type: 'game',
    name: 'onStartPlay',
    args: sessionId,
  }, '*');
}

/**
 * 상태 동기화 완료 이벤트
 */
function onSyncComplete() {
  parent.postMessage({
    type: 'game',
    name: 'onSyncComplete',
  }, '*');
}

/**********************************************************
 * game > main
 *********************************************************

/**
 * 메인 프레임으로 게스트 ID 설정
 * @param _guestId
 */
function setGuestId(_guestId) {
  console.log('[Game] setGuestId', _guestId);

  parent.postMessage({
    type: 'game',
    name: 'setGuestId',
    args: _guestId
  }, '*');

  guestId = _guestId;
  localStorage.setItem('guest', _guestId);
}

/**
 * 배너 클릭 시 도저버드 이동 팝업
 */
function guideToBird() {
  parent.postMessage({
    type: 'game',
    name: 'guideToBird',
  }, '*');
}

function callModal(name) {
  parent.postMessage({
    type: 'game',
    name: 'callModal',
    args: [name]
  }, '*');
}

function goMarket() {
  parent.postMessage({
    type: 'game',
    name: 'goMarket',
  }, '*');
}

function goMarketSell() {
  parent.postMessage({
    type: 'game',
    name: 'goMarket',
  }, '*');
}

/**
 * 아이템 구입 요청 보내기
 * @param {string} type - 구입 아이템명 ex) 'wall', 'auto', 'inventory', 'fancykey'
 * @param {number} qty - 아이템 개수
 * @constructor
 */
function BuyItem(type, qty) {
  if(type === 'autodrop') type = 'auto';

  console.log('[BuyItem]', 'type:', type, 'qty:', qty);

  parent.postMessage({
    type: 'game',
    name: 'buyItem',
    args: [type, parseInt(qty)]
  }, '*');
}

/**
 * 아이템 구입(token) 요청 보내기
 * @param {string} type - 구입 아이템명 ex) 'wall', 'auto', 'inventory'
 * @constructor
 */
function buyItemCrypto(type) {
  console.log('[buyItem]', 'type:', type);

  parent.postMessage({
    type: 'game',
    name: 'buyItemCrypto',
    args: type
  }, '*');
}

/**
 * 교환소 이동
 */
function exchangeLink() {
  parent.postMessage({
    type: 'game',
    name: 'exchangeLink',
  }, '*');
}

/**
 * 교환소 이동
 */
function verifyEmail() {
  parent.postMessage({
    type: 'game',
    name: 'verifyEmail',
  }, '*');
}

/**
 * 아이템샵으로 이동 (mobile)
 * @param tab
 */
function showShop(tab) {
  parent.postMessage({
    type: 'game',
    name: 'showShop',
    args: tab,
  }, '*');
}

/**
 * 가이드 영상 재생
 */
function playGuide() {
  parent.postMessage({
    type: 'game',
    name: 'playGuide',
  }, '*');
}

function openFancyBox(hash, fancyType, type) {
  parent.postMessage({
    type: 'game',
    name: 'openFancyBox',
    args: [hash, fancyType, type],
  }, '*');
}

function showLottery() {
  parent.postMessage({
    type: 'game',
    name: 'showLottery',
  }, '*');
}

/**
 * NFT Mint
 */
function mintDoll(id) {
  parent.postMessage({
    type: 'game',
    name: 'mintDoll',
    args: id
  }, '*');
}

/**
 * showModal 메소드 등록
 */
Object.keys(showModal).map(function(key) {
  let value = showModal[key];

  window[key] = function() {
    console.log('[Game] showModal', key, value);

    parent.postMessage({
      type: 'game',
      name: 'showModal',
      args: value
    }, '*');
  };
});

/**
 * showHelp 메소드 등록
 */
Object.keys(showHelpPage).map(function(key) {
  let value = showHelpPage[key];

  window[key] = function() {
    console.log('[Game] showHelpPage', key, value);

    parent.postMessage({
      type: 'game',
      name: 'showHelpPage',
      args: value
    }, '*');
  };
});

/**********************************************************
 * main > game
 *********************************************************/

/**
 * 계정 정보 삭제
 */
function clearData() {
  console.log('[Game] clearData');

  localStorage.removeItem('account');

  if(localStorage.getItem('guest') === 'null') {
    localStorage.removeItem('guest');
  }
}

function removeGuestId() {
  localStorage.removeItem('guest');
}

/**
 * 사용자 계정 설정
 * @param _account
 */
function setAccount(_account) {
  console.log('[Game] setAccount', _account);

  localStorage.setItem('account', _account);
  localStorage.removeItem('guest');
}

/**
 * 메인 프레임으로부터 게스트 ID 받아 미리 지정
 * @param _guestId
 */
function setGuestIdFromMain(_guestId) {
  guestId = _guestId;
  localStorage.setItem('guest', _guestId);
}

/**
 * 디바이스 타입 설정
 * @param toggle
 */
function setDevice(toggle) {
  if(toggle) {
    localStorage.setItem('isS10', 'true');
  } else {
    localStorage.removeItem('isS10');
  }
}

/**
 * 페이지 새로고침
 */
function reload() {
  location.reload();
}

/**
 * 변경된 사항을 게임에서 업데이트 실행
 * @param target
 */
function update(target) {
  const funcNames = {
    sync: 'SyncStatus',
    token: 'TokenUpdate',
    coin: 'CoinUpdate',
    item: 'WallUpdate',
    wall: 'WallUpdate',
    christmas: 'SeasonEventUpdate',
    auto: 'autoUpdate',
    inventory: 'InventoryUpdate',
  };
  const funcName = funcNames[target];

  if(!isGameStarted) return false;

  console.log('update funcName: ', funcName);

  gameInstance.SendMessage('JSDllManager', funcName);
}

function alreadyBuy(target) {
  if(!isGameStarted) return false;
  gameInstance.SendMessage('JSDllManager', 'alreadyBuy', 'christmas');
}

/**
 * 팬시 키 수량 업데이트
 * @param type
 */
function updateFancyKey(type) {
  gameInstance.SendMessage('JSDllManager', 'FancyKeyUpdate', type);
}

/**
 * 로딩 중 상태 해제
 */
function release() {
  gameInstance.SendMessage('JSDllManager', 'GameLodingDeActive');
  gameInstance.SendMessage('JSDllManager', 'GamePlay');
}

/**
 * 친구 정보 변동 알림
 */
function friendNotify(payload) {
  console.log('[Game] friendNotify', payload);

  /*var friend = new Object();

  friend.account = "0xf5bsdkjekfklsldk32234sl";
  friend.avatar = "profile_08";
  friend.level = 20;
  friend.msg = "your friend level up!";
  friend.type = "level";*/

  payload = JSON.stringify(payload);
  gameInstance.SendMessage('JSDllManager', 'FriendNotify', payload);
}

/**
 * 게임 내 MetaMask 설치 링크 진입 시 MetaMask 설치 감지 시작
 */
function getMetaMask() {
  parent.postMessage({
    type: 'game',
    name: 'getMetaMask',
  }, '*');
}

/**
 * 새로고침 차단 여부 설정
 * @param val
 */
function setBlockReload(val) {
  isReloadBlocked = val;

  console.log('[Game] setBlockReload', isReloadBlocked);
}

/**
 * 게임 일시중지/시작
 */
function pauseGame(isPause) {
  let method = isPause ? 'GamePause' : 'GamePlay';
  gameInstance.SendMessage('JSDllManager', method);
}

function setFancyKeyPending(type) {
  console.log('[Game] setFancyKeyPending', type);
  gameInstance.SendMessage('JSDllManager', 'setFancyKeyPending', type);
}

function openFancyBoxKeyUse() {
  gameInstance.SendMessage('JSDllManager', 'openFancyBoxKeyUse');
}

function openFancyBoxComplete(type) {
  console.log('[Game] openFancyBoxComplete', type);
  gameInstance.SendMessage('JSDllManager', 'openFancyBoxComplete', type);
}

/**
 * 게임 일시중지/시작
 */
function setFlexibleLayout() {
  document.getElementById('gameContainer').removeAttribute('style');
}

/**
 * 현재 상태 저장
 */
function saveStatus() {
  gameInstance.SendMessage('JSDllManager', 'SaveStatus');
}

function repaint() {
  var game = document.getElementById('#canvas');

  game.style.opacity = '0.5';

  setTimeout(function() {
    game.style.opacity = '';
  }, 100);
}

function dropFancyBox(type) {
  gameInstance.SendMessage('JSDllManager', 'dropFancyBox', type);
}

function purchaseCancel(itemType) {
  gameInstance.SendMessage('JSDllManager', 'purchaseCancel', itemType);
}

function restart() {
  gameInstance.SendMessage('JSDllManager', 'ReStart');
}

/**
 * mint 시작
 */
function mintStarted(id) {
  gameInstance.SendMessage('JSDllManager', 'mintStarted', id);
}

/**
 * mint 성공
 */
function mintCompleted(id) {
  gameInstance.SendMessage('JSDllManager', 'mintCompleted', id);
}

/**********************************************************
 * init
 *********************************************************/

// save state before page unload
window.addEventListener('beforeunload', function(event) {
  console.log(
    '[Game] beforeunload',
    'isGameStarted:', isGameStarted,
    'isReloadBlocked:', isReloadBlocked
  );

  if(isGameStarted && isReloadBlocked) {
    saveStatus();
    event.returnValue = 'true';
  }
});

// send message focus / blur window
window.addEventListener('focus', function(event) {
  parent.postMessage({
    type: 'game',
    name: 'focus',
  }, '*');
});
window.addEventListener('blur', function(event) {
  parent.postMessage({
    type: 'game',
    name: 'blur',
  }, '*');
});

// main > game message handler
window.addEventListener('message', function(event) {
  const data = event.data;

  if(data.type !== 'main') return;

  console.log('[Game] message', data, data.args);

  if(data.name === 'clearData') clearData();
  if(data.name === 'setAccount') setAccount(data.args);
  if(data.name === 'setGuestIdFromMain') setGuestIdFromMain(data.args);
  if(data.name === 'setDevice') setDevice(data.args);
  if(data.name === 'reload') reload();
  if(data.name === 'restart') restart();
  if(data.name === 'update') update(data.args);
  if(data.name === 'alreadyBuy') alreadyBuy(data.args);
  if(data.name === 'updateFancyKey') updateFancyKey(data.args);
  if(data.name === 'setBlockReload') setBlockReload(data.args);
  if(data.name === 'friendNotify') friendNotify(data.args);
  if(data.name === 'dropFancyBox') dropFancyBox(data.args);
  if(data.name === 'pauseGame') pauseGame(data.args);
  if(data.name === 'purchaseCancel') purchaseCancel(data.args);
  if(data.name === 'release') release();
  if(data.name === 'setFancyKeyPending') setFancyKeyPending(data.args);
  if(data.name === 'openFancyBoxKeyUse') openFancyBoxKeyUse();
  if(data.name === 'openFancyBoxComplete') openFancyBoxComplete(data.args);
  if(data.name === 'setFlexibleLayout') setFlexibleLayout();
  if(data.name === 'saveStatus') saveStatus();
  if(data.name === 'repaint') repaint();
  if(data.name === 'mintStarted') mintStarted(data.args);
  if(data.name === 'mintCompleted') mintCompleted(data.args);
});
