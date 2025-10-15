document.addEventListener('DOMContentLoaded', () => {
  const newBtn = document.getElementById('new-session');
  const qrDiv = document.getElementById('qr');
  const sessionInfo = document.getElementById('session-info');
  const remoteVideo = document.getElementById('remoteVideo');

  let ws;
  let pc;
  let sessionId;

  newBtn.onclick = async () => {
    const res = await fetch('/new-session');
    const js = await res.json();
    sessionId = js.id;
    sessionInfo.textContent = `Session: ${js.phoneUrl} ${sessionId}`;
    qrDiv.innerHTML = '';
    const canvas = document.createElement('canvas');
    qrDiv.appendChild(canvas);
    const { default: QRCode } = await import('qrcode');
    await QRCode.toCanvas(canvas, js.phoneUrl, { width: 320 });

    initWebSocket();
  };

  function initWebSocket() {
    if (ws) ws.close();
    ws = new WebSocket(
      (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host
    );
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'register', role: 'computer', session: sessionId }));
    };
    ws.onmessage = async (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === 'signal') {
        const payload = msg.payload;
        if (payload.type === 'offer') {
          await handleOffer(payload);
        } else if (payload.candidate) {
          try {
            await pc.addIceCandidate(payload);
          } catch (e) {
            console.warn(e);
          }
        }
      }
    };
  }

  async function handleOffer(offer) {
    pc = new RTCPeerConnection();
    pc.ontrack = (e) => {
      remoteVideo.srcObject = e.streams[0];
    };
    pc.onicecandidate = (ev) => {
      if (!ev.candidate) return;
      ws.send(JSON.stringify({ type: 'signal', session: sessionId, payload: ev.candidate }));
    };

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    ws.send(JSON.stringify({ type: 'signal', session: sessionId, payload: pc.localDescription }));
  }
});
