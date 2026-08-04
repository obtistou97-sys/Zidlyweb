'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

const APP_ID = '1795119554812350';
const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

type Player = { name: string; pic: string | null; id: string } | null;

interface GameState {
  screen: 'login' | 'game';
  players: [Player, Player];
  board: (number | null)[];
  turn: number;
  winner: number | null;
  winLine: number[];
  draw: boolean;
  scores: [number, number, number];
}

function checkWinner(b: (number | null)[]) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] !== null && b[a] === b[c] && b[a] === b[d]) return { winner: b[a], line: [a, c, d] };
  }
  if (b.every(v => v !== null)) return { winner: null, line: [], draw: true };
  return null;
}

function Avatar({ player, size = 44 }: { player: Player; size?: number }) {
  if (!player) return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4, color: '#64748b' }}>?</div>
  );
  if (player.pic) return <img src={player.pic} alt={player.name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  const init = player.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: '#fff' }}>{init}</div>
  );
}

export default function XOGame() {
  const [state, setState] = useState<GameState>({
    screen: 'login',
    players: [null, null],
    board: Array(9).fill(null),
    turn: 0,
    winner: null,
    winLine: [],
    draw: false,
    scores: [0, 0, 0],
  });
  const [fbReady, setFbReady] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({ appId: APP_ID, cookie: true, xfbml: false, version: 'v19.0' });
      setFbReady(true);
    };
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  function fbLogin(slot: 0 | 1) {
    if (!fbReady) return;
    window.FB.login((res: any) => {
      if (res.authResponse) {
        window.FB.api('/me', { fields: 'name,picture' }, (data: any) => {
          setState(prev => {
            const players: [Player, Player] = [...prev.players] as [Player, Player];
            players[slot] = { name: data.name, pic: data.picture?.data?.url || null, id: data.id };
            return { ...prev, players };
          });
        });
      }
    }, { scope: 'public_profile' });
  }

  function startGame() {
    setState(prev => ({ ...prev, screen: 'game', board: Array(9).fill(null), turn: 0, winner: null, winLine: [], draw: false }));
  }

  function handleClick(i: number) {
    setState(prev => {
      if (prev.winner !== null || prev.draw || prev.board[i] !== null) return prev;
      const board = [...prev.board];
      board[i] = prev.turn;
      const res = checkWinner(board);
      if (res) {
        const scores: [number, number, number] = [...prev.scores] as [number, number, number];
        if (res.winner !== null) { scores[res.winner]++; return { ...prev, board, winner: res.winner, winLine: res.line, scores }; }
        else { scores[2]++; return { ...prev, board, draw: true, scores }; }
      }
      return { ...prev, board, turn: prev.turn === 0 ? 1 : 0 };
    });
  }

  function newGame() {
    setState(prev => ({ ...prev, board: Array(9).fill(null), turn: 0, winner: null, winLine: [], draw: false }));
  }

  function backToLogin() {
    setState({ screen: 'login', players: [null, null], board: Array(9).fill(null), turn: 0, winner: null, winLine: [], draw: false, scores: [0, 0, 0] });
  }

  const syms = ['✖', '⭕'];
  const { screen, players, board, turn, winner, winLine, draw, scores } = state;
  const sameUser = !!(players[0] && players[1] && players[0].id === players[1].id);
  const bothReady = !!(players[0] && players[1]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ maxWidth: 420, width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: 2 }}>
            <span style={{ color: '#3b82f6' }}>X</span> O <span style={{ color: '#ef4444' }}>Game</span>
          </h1>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Facebook Group Edition</p>
        </div>

        {/* LOGIN SCREEN */}
        {screen === 'login' && (
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16, padding: '2rem' }}>
            <h2 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 600, marginBottom: 6, textAlign: 'center' }}>Login with Facebook</h2>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: '1.5rem', textAlign: 'center' }}>Each player logs in with their Facebook account</p>

            {/* Player Slots */}
            {([0, 1] as (0 | 1)[]).map(slot => (
              <div key={slot} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: '12px 16px', marginBottom: 12 }}>
                <Avatar player={players[slot]} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Player {slot + 1} — {slot === 0 ? 'X' : 'O'}</div>
                  <div style={{ fontSize: 15, fontWeight: players[slot] ? 600 : 400, color: players[slot] ? '#e2e8f0' : '#475569', fontStyle: players[slot] ? 'normal' : 'italic', marginTop: 2 }}>
                    {players[slot] ? players[slot]!.name : 'Not logged in'}
                  </div>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: slot === 0 ? '#1d4ed8' : '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                  {slot === 0 ? '✖' : '⭕'}
                </div>
              </div>
            ))}

            {sameUser && (
              <p style={{ color: '#f59e0b', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>⚠️ Both players are the same account. Player 2 must log in from a different account.</p>
            )}

            {!players[0] && (
              <button onClick={() => fbLogin(0)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: 13, border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', background: '#1877f2', color: '#fff', marginBottom: 10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                Login as Player 1 (X)
              </button>
            )}
            {players[0] && !players[1] && (
              <button onClick={() => fbLogin(1)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: 13, border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', background: '#1877f2', color: '#fff', marginBottom: 10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                Login as Player 2 (O)
              </button>
            )}

            <button onClick={startGame} disabled={!bothReady || sameUser} style={{ width: '100%', padding: 14, border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: bothReady && !sameUser ? 'pointer' : 'not-allowed', background: bothReady && !sameUser ? '#16a34a' : '#334155', color: bothReady && !sameUser ? '#fff' : '#64748b', marginTop: 4 }}>
              {bothReady && !sameUser ? '▶ Start Game' : 'Waiting for both players...'}
            </button>
          </div>
        )}

        {/* GAME SCREEN */}
        {screen === 'game' && players[0] && players[1] && (
          <>
            {/* Players bar */}
            <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem' }}>
              {([0, 1] as const).map(idx => {
                const active = winner === null && !draw && turn === idx;
                return (
                  <div key={idx} style={{ flex: 1, background: active ? (idx === 0 ? '#172554' : '#3b0d0d') : '#1e293b', border: `1px solid ${active ? (idx === 0 ? '#3b82f6' : '#ef4444') : '#334155'}`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}>
                    <div style={{ borderRadius: '50%', overflow: 'hidden', border: `2px solid ${active ? (idx === 0 ? '#3b82f6' : '#ef4444') : '#334155'}`, flexShrink: 0 }}>
                      <Avatar player={players[idx]} size={38} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{players[idx]!.name.split(' ')[0]}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: active ? (idx === 0 ? '#3b82f6' : '#ef4444') : '#94a3b8' }}>{scores[idx]}</div>
                    </div>
                    <div style={{ padding: '2px 8px', borderRadius: 20, background: idx === 0 ? '#1d4ed8' : '#b91c1c', color: '#fff', fontSize: 11, fontWeight: 700 }}>{syms[idx]}</div>
                  </div>
                );
              })}
            </div>

            {/* Status */}
            {winner !== null ? (
              <div style={{ textAlign: 'center', padding: 14, borderRadius: 10, marginBottom: '1rem', fontSize: 15, fontWeight: 600, background: '#14532d', color: '#4ade80', border: '1px solid #16a34a' }}>
                🏆 {players[winner]!.name} wins this round!
              </div>
            ) : draw ? (
              <div style={{ textAlign: 'center', padding: 14, borderRadius: 10, marginBottom: '1rem', fontSize: 15, fontWeight: 600, background: '#1c1917', color: '#fbbf24', border: '1px solid #92400e' }}>
                🤝 It's a draw!
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 10, marginBottom: '1rem', borderRadius: 10, background: '#1e293b', border: '1px solid #334155' }}>
                <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Current turn</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 3, color: turn === 0 ? '#3b82f6' : '#ef4444' }}>{syms[turn]} {players[turn]!.name}</div>
              </div>
            )}

            {/* Board */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '1.25rem' }}>
              {board.map((v, i) => {
                const isWin = winLine.includes(i);
                return (
                  <div key={i} onClick={() => handleClick(i)} style={{ aspectRatio: '1', borderRadius: 14, border: `1px solid ${isWin ? '#16a34a' : '#334155'}`, background: isWin ? '#14532d' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, fontWeight: 700, cursor: v !== null ? 'default' : 'pointer', color: v === 0 ? '#3b82f6' : v === 1 ? '#ef4444' : 'transparent', userSelect: 'none', transition: 'all 0.12s' }}>
                    {v !== null ? syms[v] : ''}
                  </div>
                );
              })}
            </div>

            {/* Draws */}
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: 8, textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Draws</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#94a3b8' }}>{scores[2]}</div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={backToLogin} style={{ flex: 1, padding: 12, border: '1px solid #991b1b', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#7f1d1d', color: '#fca5a5' }}>↩ Change players</button>
              <button onClick={newGame} style={{ flex: 1, padding: 12, border: '1px solid #1d4ed8', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: '#1d4ed8', color: '#fff' }}>New game ▶</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
