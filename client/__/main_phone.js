document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file');
    const playBtn = document.getElementById('play');
    const localPreview = document.getElementById('localPreview');
    const sessionDisplay = document.getElementById('session-display');

    let sessionId = new URLSearchParams(location.search).get('session');
    if (sessionId) sessionDisplay.textContent = `Session: ${sessionId}`;

    let ws;
    let pc;

    function initWebSocket() {
        if (ws) ws.close();
        ws = new WebSocket((location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host);
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'register', role: 'phone', session: sessionId }));
        };
        ws.onmessage = async (ev) => {
            const msg = JSON.parse(ev.data);
            if (msg.type === 'signal') {
                const payload = msg.payload;
                if (payload.type === 'answer') {
                    await pc.setRemoteDescription(payload);
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

    async function startStreaming(file) {
        const v = document.createElement('video');
        v.muted = true;
        v.playsInline = true;
        v.controls = true;
        v.src = URL.createObjectURL(file);
        await v.play().catch(() => { });
        localPreview.src = v.src;

        const stream = v.captureStream ? v.captureStream() : v.mozCaptureStream ? v.mozCaptureStream() : null;
        if (!stream) {
            alert('captureStream() not supported in this browser');
            return;
        }

        pc = new RTCPeerConnection();
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = (ev) => {
            if (!ev.candidate) return;
            ws.send(JSON.stringify({ type: 'signal', session: sessionId, payload: ev.candidate }));
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify({ type: 'signal', session: sessionId, payload: pc.localDescription }));
    }

    playBtn.onclick = async () => {
        if (!sessionId) {
            alert('No session id in URL');
            return;
        }
        if (!fileInput.files.length) {
            alert('Choose a video file first');
            return;
        }
        initWebSocket();
        ws.addEventListener('open', async () => {
            await startStreaming(fileInput.files[0]);
        }, { once: true });
    };
});
