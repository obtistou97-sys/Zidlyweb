'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lagbxbnnmoohvfpfkzaz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZ2J4Ym5ubW9vaHZmcGZremF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDYwODQsImV4cCI6MjEwMTM4MjA4NH0.NmiCbPNnodInjJqLY8qxg8ER2-U67eMIY5e_zBpxR3c';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

type Screen = 'enter-name' | 'lobby' | 'game';
interface Room {
  id: string;
  player1: { name: string } | null;
  player2: { name: string } | null;
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

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const init = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const colors = ['#1d4ed8','#16a34a','#9333ea','#ea580c','#0891b2','#be123c'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
      {init}
    </div>
  );
}

export default function XOGame() {
  const [screen, setScreen] = useState<Screen>('enter-name');
  const [myName, setMyName] = useState('');
  const [mySlot, setMySlot] = useState<0 | 1 | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // Read room code from URL on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('room');
    if (code) setJoinCode(code.toUpperCase());
  }, []);

  // Realtime subscription + polling fallback
  useEffect(() => {
    if (!room) return;

    // Realtime
    const channel = supabase
      .channel(`room:${room.id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'xo_rooms', filter: `id=eq.${room.id}` },
        (payload) => setRoom(payload.new as Room))
      .subscribe();

    // Polling fallback every 2 seconds
    const interval = setInterval(async () => {
      const { data } = await supabase.from('xo_rooms').select('*').eq('id', room.id).single();
      if (data) setRoom(data as Room);
    }, 2000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [room?.id]);

  function confirmName() {
    if (!nameInput.trim()) { setError('Please enter your name'); return; }
    setMyName(nameInput.trim());
    setError('');
    setScreen('lobby');
  }

  async function createRoom() {
    const code = generateCode();
    const newRoom: Room = {
      id: code,
      player1: { name: myName },
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
    setError('');
    const code = joinCode.trim().toUpperCase();
    if (!code) { setError('Please enter a room code'); return; }
    const { data, error } = await supabase.from('xo_rooms').select('*').eq('id', code).single();
    if (error || !data) { setError('Room not found. Check the code.'); return; }
    if (data.player2) { setError('Room is full!'); return; }
    if (data.player1?.name === myName) { setError('Player 1 has the same name! Use a different name.'); return; }
    await supabase.from('xo_rooms').update({ player2: { name: myName }, status: 'playing' }).eq('id', code);
    setRoom({ ...data, player2: { name: myName }, status: 'playing' } as Room);
    setRoomCode(code);
    setMySlot(1);
    setScreen('game');
  }

  async function handleClick(i: number) {
    if (!room || mySlot === null) return;
    if (room.winner !== null || room.draw) return;
    if (room.turn !== mySlot) return;
    if (room.board[i] !== null) return;
    if (mySlot === 0 && !room.player2) return;

    const board = [...room.board];
    board[i] = mySlot;
    const res = checkWinner(board);
    const scores: [number, number, number] = [...room.scores] as [number, number, number];

    let update: any = { board };
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

  function copyLink() {
    navigator.clipboard.writeText(`https://zidlyweb.site/games-app/xo-game?room=${roomCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const syms = ['✖', '⭕'];

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const Header = () => (
    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
      <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: 2 }}>
        <span style={{ color: '#3b82f6' }}>X</span> O <span style={{ color: '#ef4444' }}>Game</span>
      </h1>
      <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
  Facebook Group Edition · Created by{" "}
  <a
    href="https://zidlyweb.site"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#3b82f6",
      textDecoration: "none",
      fontWeight: 500,
    }}
  >
    ZidlyWeb.site
  </a>
</p>
    </div>
  );

  // ─── ENTER NAME ──────────────────────────────────────────
  if (screen === 'enter-name') return (
    <div style={pageStyle}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <Header />
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16, padding: '2rem' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 600, marginBottom: 6, textAlign: 'center' }}>Enter your name</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: '1.5rem', textAlign: 'center' }}>Type your name to create or join a game</p>
          <input
            style={{ width: '100%', padding: '13px 14px', borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 16, outline: 'none', boxSizing: 'border-box' }}
            placeholder="Your name..."
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirmName()}
            maxLength={20}
            autoFocus
          />
          {error && <div style={{ color: '#f87171', fontSize: 13, marginTop: 8, textAlign: 'center' }}>{error}</div>}
          <button onClick={confirmName} style={{ width: '100%', padding: 14, border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', background: '#1d4ed8', color: '#fff', marginTop: 12 }}>
            Continue →
          </button>
          {joinCode && (
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 12, textAlign: 'center' }}>
              You'll join room <span style={{ color: '#3b82f6', fontWeight: 700 }}>{joinCode}</span> after entering your name
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // ─── LOBBY ───────────────────────────────────────────────
  if (screen === 'lobby') return (
    <div style={pageStyle}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <Header />

        {/* Name badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '12px 16px', marginBottom: '1.5rem' }}>
          <Avatar name={myName} size={44} />
          <div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Playing as</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>{myName}</div>
          </div>
          <button onClick={() => { setScreen('enter-name'); setNameInput(myName); }} style={{ marginLeft: 'auto', padding: '6px 12px', borderRadius: 8, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontSize: 12, cursor: 'pointer' }}>Change</button>
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16, padding: '1.5rem' }}>
          {/* Create */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Create a new game</div>
            <p style={{ color: '#64748b', fontSize: 13, margin: '6px 0 10px' }}>Get a code and share it with your opponent</p>
            <button onClick={createRoom} style={{ width: '100%', padding: 13, border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', background: '#16a34a', color: '#fff' }}>
              + Create Game Room
            </button>
          </div>

          <div style={{ borderTop: '1px solid #334155', margin: '1.5rem 0' }} />

          {/* Join */}
          <div>
            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Join a game</div>
            <p style={{ color: '#64748b', fontSize: 13, margin: '6px 0 6px' }}>Enter the room code your opponent shared</p>
            <input
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 18, fontWeight: 700, letterSpacing: 4, outline: 'none', textAlign: 'center', boxSizing: 'border-box' }}
              placeholder="X4K2"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              maxLength={4}
            />
            <button onClick={joinRoom} style={{ width: '100%', padding: 13, border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', background: '#1d4ed8', color: '#fff', marginTop: 10 }}>
              Join Game →
            </button>
            {error && <div style={{ color: '#f87171', fontSize: 13, marginTop: 8, textAlign: 'center' }}>{error}</div>}
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
      <div style={pageStyle}>
        <div style={{ maxWidth: 420, width: '100%' }}>
          <Header />

          {/* Waiting banner */}
          {waiting && (
            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 14, padding: '1.25rem', textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Share this code with your opponent</div>
              <div style={{ fontSize: 52, fontWeight: 800, color: '#fff', letterSpacing: 10, marginBottom: 14 }}>{roomCode}</div>
              <button onClick={copyLink} style={{ padding: '10px 28px', borderRadius: 8, border: 'none', background: copied ? '#16a34a' : '#1d4ed8', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                {copied ? '✅ Link Copied!' : '🔗 Copy Game Link'}
              </button>
              <div style={{ marginTop: 10, color: '#64748b', fontSize: 13 }}>⏳ Waiting for opponent to join...</div>
            </div>
          )}

          {/* Players bar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: '1rem' }}>
            {([0, 1] as const).map(idx => {
              const active = !waiting && room.winner === null && !room.draw && room.turn === idx;
              const player = p[idx];
              return (
                <div key={idx} style={{ flex: 1, background: active ? (idx === 0 ? '#172554' : '#3b0d0d') : '#1e293b', border: `1px solid ${active ? (idx === 0 ? '#3b82f6' : '#ef4444') : '#334155'}`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                  {player ? <Avatar name={player.name} size={36} /> : (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 18 }}>?</div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {player ? player.name : 'Waiting...'}
                      {idx === mySlot && player ? <span style={{ fontSize: 10, color: '#64748b', marginLeft: 4 }}>(you)</span> : ''}
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
                  {myTurn ? '👆 Your turn!' : `⏳ ${p[room.turn]?.name}'s turn...`}
                </div>
              </div>
            )
          )}

          {/* Board */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '1rem', opacity: waiting ? 0.3 : 1 }}>
            {room.board.map((v, i) => {
              const isWin = room.win_line?.includes(i);
              const clickable = !waiting && v === null && myTurn;
              return (
                <div key={i} onClick={() => clickable && handleClick(i)}
                  style={{ aspectRatio: '1', borderRadius: 14, border: `1px solid ${isWin ? '#16a34a' : '#334155'}`, background: isWin ? '#14532d' : clickable ? '#1e3a5f' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, fontWeight: 700, cursor: clickable ? 'pointer' : 'default', color: v === 0 ? '#3b82f6' : v === 1 ? '#ef4444' : 'transparent', userSelect: 'none', transition: 'all 0.12s' }}>
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
            <button onClick={() => { setScreen('lobby'); setRoom(null); setMySlot(null); setJoinCode(''); }}
              style={{ flex: 1, padding: 12, border: '1px solid #991b1b', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#7f1d1d', color: '#fca5a5' }}>
              ↩ Leave
            </button>
            {waiting && (
              <button onClick={copyLink}
                style={{ flex: 1, padding: 12, border: '1px solid #16a34a', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#14532d', color: '#4ade80' }}>
                {copied ? '✅ Copied!' : '🔗 Copy Link'}
              </button>
            )}
            {(room.winner !== null || room.draw) && mySlot === 0 && (
              <button onClick={newGame}
                style={{ flex: 1, padding: 12, border: '1px solid #1d4ed8', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#1d4ed8', color: '#fff' }}>
                New game ▶
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
