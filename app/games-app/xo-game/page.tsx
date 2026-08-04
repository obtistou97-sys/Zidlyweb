'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

declare global {
  interface Window { FB: any; fbAsyncInit: () => void; }
}

const FB_APP_ID = '1372861901653606';
const SUPABASE_URL = 'https://lagbxbnnmoohvfpfkzaz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZ2J4Ym5ubW9vaHZmcGZremF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDYwODQsImV4cCI6MjEwMTM4MjA4NH0.NmiCbPNnodInjJqLY8qxg8ER2-U67eMIY5e_zBpxR3c';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

type Player = { name: string; pic: string | null; id: string };
type Screen = 'login' | 'lobby' | 'game';

interface Room {
  id: string;
  player1: Player | null;
  player2: Player | null;
  board: (number | null)[];
  turn: number;
  winner: number | null;
  win_line: number[];
  draw: boolean;
  scores: [number, number, number];
  status: string;
}

function generateCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function checkWinner(b: (number | null)[]) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] !== null && b[a] === b[c] && b[a] === b[d]) return { winner: b[a] as number, line: [a, c, d] };
  }
  if (b.every(v => v !== null)) return { winner: null, line: [], draw: true };
  return null;
}

function Avatar({ player, size = 44 }: { player: Player | null; size?: number }) {
  if (!player) return <div style={{ width: size, height: size, borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4, color: '#64748b' }}>?</div>;
  if (player.pic) return <img src={player.pic} alt={player.name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  const init = player.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  return <div style={{ width: size, height: size, borderRadius: '50%', background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: '#fff' }}>{init}</div>;
}

export default function XOGame() {
  const [screen, setScreen] = useState<Screen>('login');
  const [fbReady, setFbReady] = useState(false);
  const [me, setMe] = useState<Player | null>(null);
  const [mySlot, setMySlot] = useState<0 | 1 | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({ appId: FB_APP_ID, cookie: true, xfbml: false, version: 'v19.0' });
      setFbReady(true);
    };
    const s = document.createElement('script');
    s.src = 'https://connect.facebook.net/en_US/sdk.js';
    s.async = true; s.defer = true;
    document.body.appendChild(s);
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!room) return;
    const channel = supabase
      .channel(`room:${room.id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'xo_rooms', filter: `id=eq.${room.id}` },
        (payload) => { setRoom(payload.new as Room); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [room?.id]);

  function fbLogin() {
    if (!fbReady) return;
    window.FB.login((res: any) => {
      if (res.authResponse) {
        window.FB.api('/me', { fields: 'name,picture' }, (data: any) => {
          setMe({ name: data.name, pic: data.picture?.data?.url || null, id: data.id });
          setScreen('lobby');
        });
      }
    }, { scope: 'public_profile' });
  }

  async function createRoom() {
    if (!me) return;
    const code = generateCode();
    const newRoom: Room = {
      id: code,
      player1: me,
      player2: null,
      board: Array(9).fill(null),
      turn: 0,
      winner: null,
      win_line: [],
      draw: false,
      scores: [0, 0, 0],
      status: 'waiting',
    };
    const { error } = await supabase.from('xo_rooms').insert(newRoom);
    if (error) { setError('Failed to create room. Try again.'); return; }
    setRoom(newRoom);
    setRoomCode(code);
    setMySlot(0);
    setScreen('game');
  }

  async function joinRoom() {
    if (!me || !joinCode) return;
    setError('');
    const { data, error } = await supabase.from('xo_rooms').select('*').eq('id', joinCode.toUpperCase()).single();
    if (error || !data) { setError('Room not found. Check the code.'); return; }
    if (data.player2) { setError('Room is full!'); return; }
    if (data.player1?.id === me.id) { setError('You cannot play against yourself!'); return; }
    const updated = { ...data, player2: me, status: 'playing' };
    await supabase.from('xo_rooms').update({ player2: me, status: 'playing' }).eq('id', joinCode.toUpperCase());
    setRoom(updated as Room);
    setRoomCode(joinCode.toUpperCase());
    setMySlot(1);
    setScreen('game');
  }

  async function handleClick(i: number) {
    if (!room || !me || mySlot === null) return;
    if (room.winner !== null || room.draw) return;
    if (room.turn !== mySlot) return;
    if (room.board[i] !== null) return;
    if (mySlot === 0 && !room.player2) return;

    const board = [...room.board];
    board[i] = mySlot;
    const res = checkWinner(board);
    const scores: [number, number, number] = [...room.scores] as [number, number, number];

    let update: Partial<Room> = { board, updated_at: new Date().toISOString() } as any;
    if (res) {
      if (res.winner !== null) { scores[res.winner]++; update = { ...update, winner: res.winner, win_line: res.line, scores }; }
      else { scores[2]++; update = { ...update, draw: true, scores }; }
    } else {
      update.turn = mySlot === 0 ? 1 : 0;
    }
    await supabase.from('xo_rooms').update(update).eq('id', room.id);
  }

  async function newGame() {
    if (!room) return;
    await supabase.from('xo_rooms').update({
      board: Array(9).fill(null), turn: 0, winner: null, win_line: [], draw: false
    }).eq('id', room.id);
  }

  function copyCode() {
    navigator.clipboard.writeText(`https://zidlyweb.site/games-app/xo-game?room=${roomCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const syms = ['✖', '⭕'];
  const S = { // styles shorthand
    page: { minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' } as React.CSSProperties,
    wrap: { maxWidth: 420, width: '100%' } as React.CSSProperties,
    card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 16, padding: '2rem' } as React.CSSProperties,
    h1: { fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: 2, textAlign: 'center' as const },
    sub: { fontSize: 13, color: '#94a3b8', marginTop: 4, textAlign: 'center' as const },
    fbBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: 14, border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', background: '#1877f2', color: '#fff' } as React.CSSProperties,
    btn: (bg: string, color = '#fff') => ({ width: '100%', padding: 13, border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', background: bg, color, marginTop: 10 } as React.CSSProperties),
    input: { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, marginTop: 8, outline: 'none' } as React.CSSProperties,
    label: { fontSize: 12, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1 },
    error: { color: '#f87171', fontSize: 13, marginTop: 8, textAlign: 'center' as const },
    codeBox: { background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: '16px', textAlign: 'center' as const, marginBottom: 16 },
  };

  // ─── LOGIN ───────────────────────────────────────────────
  if (screen === 'login') return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={S.h1}><span style={{ color: '#3b82f6' }}>X</span> O <span style={{ color: '#ef4444' }}>Game</span></h1>
          <p style={S.sub}>Facebook Group Edition — Multiplayer</p>
        </div>
        <div style={S.card}>
          <h2 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 600, marginBottom: 6, textAlign: 'center' }}>Login to play</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: '1.5rem', textAlign: 'center' }}>Login with your Facebook account to create or join a game</p>
          <button onClick={fbLogin} style={S.fbBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );

  // ─── LOBBY ───────────────────────────────────────────────
  if (screen === 'lobby') return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={S.h1}><span style={{ color: '#3b82f6' }}>X</span> O <span style={{ color: '#ef4444' }}>Game</span></h1>
        </div>

        {/* Logged in as */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '12px 16px', marginBottom: '1.5rem' }}>
          <Avatar player={me} size={44} />
          <div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Logged in as</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>{me?.name}</div>
          </div>
        </div>

        <div style={S.card}>
          {/* Create Room */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={S.label}>Create a new game</div>
            <p style={{ color: '#64748b', fontSize: 13, margin: '6px 0 10px' }}>Get a code and share it with your friend</p>
            <button onClick={createRoom} style={S.btn('#16a34a')}>+ Create Game Room</button>
          </div>

          <div style={{ borderTop: '1px solid #334155', margin: '1.5rem 0' }} />

          {/* Join Room */}
          <div>
            <div style={S.label}>Join a game</div>
            <p style={{ color: '#64748b', fontSize: 13, margin: '6px 0 4px' }}>Enter the room code your friend shared</p>
            <input style={S.input} placeholder="Enter room code (e.g. X4K2)" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} maxLength={4} />
            <button onClick={joinRoom} style={S.btn('#1d4ed8')}>Join Game →</button>
            {error && <div style={S.error}>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── GAME ────────────────────────────────────────────────
  if (screen === 'game' && room) {
    const p = [room.player1, room.player2];
    const waiting = !room.player2;
    const myTurn = room.turn === mySlot && !room.winner && !room.draw && !waiting;

    return (
      <div style={S.page}>
        <div style={S.wrap}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h1 style={S.h1}><span style={{ color: '#3b82f6' }}>X</span> O <span style={{ color: '#ef4444' }}>Game</span></h1>
          </div>

          {/* Waiting for player 2 */}
          {waiting && (
            <div style={S.codeBox}>
              <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Share this code with your friend</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', letterSpacing: 8, marginBottom: 12 }}>{roomCode}</div>
              <button onClick={copyCode} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: copied ? '#16a34a' : '#1d4ed8', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                {copied ? '✅ Link Copied!' : '🔗 Copy Game Link'}
              </button>
              <div style={{ marginTop: 12, color: '#64748b', fontSize: 13 }}>⏳ Waiting for Player 2 to join...</div>
            </div>
          )}

          {/* Players bar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: '1rem' }}>
            {([0, 1] as const).map(idx => {
              const active = !waiting && room.winner === null && !room.draw && room.turn === idx;
              return (
                <div key={idx} style={{ flex: 1, background: active ? (idx === 0 ? '#172554' : '#3b0d0d') : '#1e293b', border: `1px solid ${active ? (idx === 0 ? '#3b82f6' : '#ef4444') : '#334155'}`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                  <div style={{ borderRadius: '50%', overflow: 'hidden', border: `2px solid ${active ? (idx === 0 ? '#3b82f6' : '#ef4444') : '#334155'}`, flexShrink: 0 }}>
                    <Avatar player={p[idx]} size={36} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p[idx] ? p[idx]!.name.split(' ')[0] : '?'}
                      {idx === mySlot ? <span style={{ fontSize: 10, color: '#64748b', marginLeft: 4 }}>(you)</span> : ''}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: active ? (idx === 0 ? '#3b82f6' : '#ef4444') : '#94a3b8' }}>{room.scores[idx]}</div>
                  </div>
                  <div style={{ padding: '2px 7px', borderRadius: 20, background: idx === 0 ? '#1d4ed8' : '#b91c1c', color: '#fff', fontSize: 11, fontWeight: 700 }}>{syms[idx]}</div>
                </div>
              );
            })}
          </div>

          {/* Status */}
          {!waiting && (
            room.winner !== null ? (
              <div style={{ textAlign: 'center', padding: 14, borderRadius: 10, marginBottom: '1rem', fontSize: 15, fontWeight: 600, background: '#14532d', color: '#4ade80', border: '1px solid #16a34a' }}>
                🏆 {p[room.winner]?.name} wins this round!
              </div>
            ) : room.draw ? (
              <div style={{ textAlign: 'center', padding: 14, borderRadius: 10, marginBottom: '1rem', fontSize: 15, fontWeight: 600, background: '#1c1917', color: '#fbbf24', border: '1px solid #92400e' }}>
                🤝 It's a draw!
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 10, marginBottom: '1rem', borderRadius: 10, background: '#1e293b', border: '1px solid #334155' }}>
                <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Current turn</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 3, color: room.turn === 0 ? '#3b82f6' : '#ef4444' }}>
                  {myTurn ? '👆 Your turn!' : `⏳ ${p[room.turn]?.name?.split(' ')[0]}'s turn...`}
                </div>
              </div>
            )
          )}

          {/* Board */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '1rem', opacity: waiting ? 0.4 : 1 }}>
            {room.board.map((v, i) => {
              const isWin = room.win_line?.includes(i);
              const clickable = !waiting && v === null && myTurn;
              return (
                <div key={i} onClick={() => clickable && handleClick(i)} style={{ aspectRatio: '1', borderRadius: 14, border: `1px solid ${isWin ? '#16a34a' : '#334155'}`, background: isWin ? '#14532d' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, fontWeight: 700, cursor: clickable ? 'pointer' : 'default', color: v === 0 ? '#3b82f6' : v === 1 ? '#ef4444' : 'transparent', userSelect: 'none', transition: 'all 0.12s' }}>
                  {v !== null ? syms[v] : ''}
                </div>
              );
            })}
          </div>

          {/* Draws */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: 8, textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Draws</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#94a3b8' }}>{room.scores[2]}</div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setScreen('lobby'); setRoom(null); setMySlot(null); }} style={{ flex: 1, padding: 12, border: '1px solid #991b1b', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#7f1d1d', color: '#fca5a5' }}>↩ Leave</button>
            {(room.winner !== null || room.draw) && mySlot === 0 && (
              <button onClick={newGame} style={{ flex: 1, padding: 12, border: '1px solid #1d4ed8', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#1d4ed8', color: '#fff' }}>New game ▶</button>
            )}
            {waiting && (
              <button onClick={copyCode} style={{ flex: 1, padding: 12, border: '1px solid #16a34a', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#14532d', color: '#4ade80' }}>
                {copied ? '✅ Copied!' : '🔗 Copy Link'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
