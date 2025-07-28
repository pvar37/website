import React, { useState, useEffect, useMemo, useCallback } from 'react';

export default function AvertleGame() {
  const [dictionary, setDictionary] = useState([]);
  const [fragment, setFragment] = useState([]); // now an array of {letter, by}
  const [playerTurn, setPlayerTurn] = useState(() => Math.random() < 0.5);
  const [computerGoesFirst, setComputerGoesFirst] = useState(() => !playerTurn);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [winner, setWinner] = useState(null);
  const [justReset, setJustReset] = useState(false);
  const [completedWord, setCompletedWord] = useState(null);
  const [gameId, setGameId] = useState(0); // increments every time a new game starts
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [disableIneligibleLetters, setDisableIneligibleLetters] = useState(() => {
  const saved = localStorage.getItem('avertleDisableIneligible');
    return saved ? JSON.parse(saved) : true; // default: ON
  });

  useEffect(() => {
    localStorage.setItem('avertleDisableIneligible', JSON.stringify(disableIneligibleLetters));
  }, [disableIneligibleLetters]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600 || window.innerHeight <= 865);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    preGameContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: '#7e22ce',
      height: isMobile ? '90vh' : '100vh',
      fontFamily: 'Fredoka, sans-serif',
    },
    container: {
      textAlign: 'center',
      padding: isMobile ? '0.8rem 2rem 0rem 2rem' : '2rem',
      backgroundColor: '#7e22ce',
      fontFamily: 'Fredoka, sans-serif',
      color: 'white'
    },
    title: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      lineHeight: isMobile ? '2rem' : '2.5rem',
      color: 'white',
      fontWeight: 700,
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: 'white',
      fontWeight: 500,
      marginBottom: isMobile ? '2rem' : '3rem'
    },
    intro: {
      fontSize: '1.2rem',
      color: 'white',
      fontWeight: 600,
      marginBottom: '0rem'
    },
    fragment: {
      fontSize: '3rem',
      margin: isMobile ? '0.5rem 0 1.5rem 0' : '0.5rem 0 2rem 0',
      fontWeight: 700,
      minHeight: '3.5rem'
    },
    cursor: {
      display: 'inline-block',
      marginLeft: '4px',
      animation: 'blink 1.2s step-start infinite',
    },
    button: {
      padding: isMobile ? '0.8rem' : '1rem',
      backgroundColor: '#ad42f5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontFamily: 'Fredoka, sans-serif',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: 700
    },
    difficulty: {
      marginTop: isMobile ? '1.2rem' : '1.5rem',
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      alignItems: 'center',
    },
    diffBtn: {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      margin: '0 0.2rem',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'Fredoka, sans-serif'
    },
    footer: {
      position: 'fixed',
      bottom: isMobile ? '1.2rem' : '2rem',
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: isMobile ? '0.6rem' : '0.9rem',
      color: 'white',
      opacity: 0.7,
      zIndex: 50
    }
  };

  const initialStats = {
    easy: { wins: 0, losses: 0 },
    medium: { wins: 0, losses: 0 },
    hard: { wins: 0, losses: 0 },
  };

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('avertleStats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  const [showStats, setShowStats] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('avertleStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        const words = text
          .split('\n')
          .map(w => w.trim().toLowerCase())
          .filter(w => w.length >= 4 && /^[a-z]+$/.test(w)); // clean up
        setDictionary(words);
      });
  }, []);

  const WORD_SET = useMemo(() => new Set(dictionary), [dictionary]);

  useEffect(() => {
    if (!justReset && dictionary.length > 0 && !gameOver) {
      const timeout = setTimeout(() => {
        setMessage(playerTurn ? "Your turn!" : "Computer's turn...");
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [gameId, dictionary, playerTurn, gameOver, justReset]);

  const getNextLetters = useCallback((fragment) => {
    const current = fragment.map(f => f.letter).join('');
    const letterCounts = {};

    for (const word of dictionary) {
      if (word.startsWith(current) && word.length > current.length) {
        const nextLetter = word[current.length];
        letterCounts[nextLetter] = (letterCounts[nextLetter] || 0) + 1;
      }
    }

    return letterCounts; // e.g., { g: 12, o: 5, t: 3 }
  }, [dictionary]);


  const computerMove = useCallback((fragment, difficulty = "easy") => {
    const current = fragment.map(f => f.letter).join('');
    const letterCounts = getNextLetters(fragment, dictionary);
    const options = Object.keys(letterCounts);
    if (options.length === 0) return null;

    // 🟢 EASY MODE — weighted random
    if (difficulty === "easy") {
      const total = Object.values(letterCounts).reduce((a, b) => a + b, 0);
      const rand = Math.random() * total;
      let sum = 0;
      for (const letter of options) {
        sum += letterCounts[letter];
        if (rand < sum) return letter;
      }
    }

    // 🟡 MEDIUM MODE — avoid completing a word
    if (difficulty === "medium") {
      const safe = options.filter(letter => {
        const test = current + letter;
        const possibleWords = dictionary.filter(word => word.startsWith(test));
        return !possibleWords.some(w => w.length === test.length);
      });

      if (safe.length > 0) {
        const total = safe.reduce((sum, letter) => sum + (letterCounts[letter] || 0), 0);
        const rand = Math.random() * total;
        let running = 0;
        for (const letter of safe) {
          running += letterCounts[letter];
          if (rand < running) return letter;
        }
      }

      // fallback: weighted random
      const total = Object.values(letterCounts).reduce((a, b) => a + b, 0);
      const rand = Math.random() * total;
      let sum = 0;
      for (const letter of options) {
        sum += letterCounts[letter];
        if (rand < sum) return letter;
      }
    }

    // 🔴 HARD MODE — use full word length parity logic
    if (difficulty === "hard") {
      if (current.length === 0) {
        // First move: weighted random based on frequency
        const total = Object.values(letterCounts).reduce((a, b) => a + b, 0);
        const rand = Math.random() * total;
        let sum = 0;
        for (const letter of options) {
          sum += letterCounts[letter];
          if (rand < sum) return letter;
        }
      }

      // Favor word lengths with parity that causes the *opponent* to lose
      const parityTarget = computerGoesFirst ? 0 : 1;

      const percs = options.map(letter => {
        const newWord = current + letter;

        if (!WORD_SET.has(newWord)) {
          const matchingWords = dictionary.filter(w => w.startsWith(newWord));
          const parities = matchingWords.map(w => w.length % 2);
          if (parities.length > 0) {
            const favorable = parities.filter(p => p === parityTarget).length;
            return favorable / parities.length;
          }
        }

        return 0;
      });

      const maxScore = Math.max(...percs);

      if (maxScore > 0) {
        const bestOptions = options.filter((_, i) => percs[i] === maxScore);
        return bestOptions[Math.floor(Math.random() * bestOptions.length)];
      }

      // fallback: weighted random from valid options
      const total = Object.values(letterCounts).reduce((a, b) => a + b, 0);
      const rand = Math.random() * total;
      let sum = 0;
      for (const letter of options) {
        sum += letterCounts[letter];
        if (rand < sum) return letter;
      }
    }
  }, [dictionary, computerGoesFirst, WORD_SET, getNextLetters]);

  useEffect(() => {
    if (!playerTurn && !gameOver && dictionary.length > 0) {
      const timeout = setTimeout(() => {
        const letter = computerMove(fragment, difficulty);
        if (!letter) {
          setMessage("Computer loses! No valid moves.");
          setGameOver(true);
          setWinner('player');
          setStats(prev => ({
            ...prev,
            [difficulty]: {
              ...prev[difficulty],
              wins: prev[difficulty].wins + 1
            }
          }));
          return;
        }
        const newFragment = [...fragment, { letter, by: 'computer' }];
        setFragment(newFragment);
        const current = newFragment.map(f => f.letter).join('');
        if (WORD_SET.has(current) && current.length >= 4) {
          setMessage("Computer completed a word. You win!");
          setGameOver(true);
          setWinner('player');
          setCompletedWord(current);
          setStats(prev => ({
            ...prev,
            [difficulty]: {
              ...prev[difficulty],
              wins: prev[difficulty].wins + 1
            }
          }));
        } else {
          setPlayerTurn(true);
          setMessage("Your turn!");
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [playerTurn, fragment, gameOver, difficulty, dictionary, WORD_SET, computerMove]);

  function getValidPlayerLetters() {
    const current = fragment.map(f => f.letter).join('');
    const valid = new Set();

    for (const word of dictionary) {
      if (word.startsWith(current) && word.length > current.length) {
        const nextLetter = word[current.length];
        valid.add(nextLetter.toUpperCase()); // match your button case
      }
    }

    return valid;
  }

  const handleLetterClick = useCallback((letter) => {
    if (gameOver || !playerTurn) return;
    const newFragment = [...fragment, { letter: letter.toLowerCase(), by: 'player' }];
    setFragment(newFragment);
    const current = newFragment.map(f => f.letter).join('');
    if (WORD_SET.has(current) && current.length >= 4) {
      setMessage("You completed a word. You lose!");
      setGameOver(true);
      setWinner('computer'); // computer wins
      setCompletedWord(current);
      setStats(prev => ({
        ...prev,
        [difficulty]: {
          ...prev[difficulty],
          losses: prev[difficulty].losses + 1
        }
      }));
    } else {
      const hasOptions = dictionary.some(word => word.startsWith(current));
      if (!hasOptions) {
        setMessage("No valid continuations. You lose!");
        setGameOver(true);
        setStats(prev => ({
          ...prev,
          [difficulty]: {
            ...prev[difficulty],
            losses: prev[difficulty].losses + 1
          }
        }));
      } else {
        setPlayerTurn(false);
        setMessage("Computer's turn...");
      }
    }
  }, [gameOver, playerTurn, fragment, WORD_SET, difficulty, dictionary]);

  const validLetters = getValidPlayerLetters();

  const hasPlayedBefore = Object.values(stats).some(({ wins, losses }) => wins + losses > 0);

  useEffect(() => {
    function handleKeyPress(e) {
      const key = e.key.toLowerCase();

      // ✅ Close modals with 'x'
      if ((showStats || showInstructions) && key === 'x') {
        setShowStats(false);
        setShowInstructions(false);
        return;
      }

      // ✅ Toggle ineligible letters with 'd' inside modals
      if ((showStats || showInstructions) && key === 'd') {
        setDisableIneligibleLetters(prev => !prev);
        return;
      }

      // ✅ Pregame controls
      if (!gameStarted) {
        if (key === 'e') setSelectedDifficulty('easy');
        else if (key === 'm') setSelectedDifficulty('medium');
        else if (key === 'h') setSelectedDifficulty('hard');
        else if (key === 's' && hasPlayedBefore) setShowStats(true);
        else if (key === 'i') setShowInstructions(true);
        else if (key === 'enter' && selectedDifficulty) {
          setDifficulty(selectedDifficulty);
          setGameStarted(true);
          handleRestart();
        }
        return;
      }

      // ✅ Post-game shortcuts (when New Game is visible)
      if (gameOver) {
        if (key === 'n') {
          handleRestart();
          return;
        }
        if (key === 'e') setDifficulty('easy');
        if (key === 'm') setDifficulty('medium');
        if (key === 'h') setDifficulty('hard');
        if (key === 's') setShowStats(true);
        if (key === 'd' && completedWord) {
          window.open(`https://www.collinsdictionary.com/dictionary/english/${completedWord}`, '_blank');
        }
        return;
      }

      // ✅ In-game letter typing
      if (!playerTurn || gameOver) return;

      if (/^[a-z]$/.test(key)) {
        const upperKey = key.toUpperCase();
        if (!disableIneligibleLetters || validLetters.has(upperKey)) {
          handleLetterClick(upperKey);
        }
      }
    }


    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerTurn, gameOver, handleLetterClick, hasPlayedBefore, validLetters, selectedDifficulty, gameStarted, showStats, showInstructions, disableIneligibleLetters, completedWord]);

  const handleRestart = () => {
    setFragment([]);
    const newFirst = Math.random() < 0.5;
    setPlayerTurn(newFirst);
    setComputerGoesFirst(!newFirst);
    setGameOver(false);
    setWinner(null);
    setMessage("");
    setCompletedWord(null);
    setJustReset(true);
    setGameId(id => id + 1); // 🔁 trigger restart-aware logic

    setTimeout(() => {
      setJustReset(false);
    }, 20);
  };

  function StatsModal({ stats, disableIneligibleLetters, setDisableIneligibleLetters, onClose }) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}>
        <div style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '2rem',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '500px',
          fontFamily: 'Fredoka, sans-serif',
          position: 'relative'
        }}>
          <button
            onClick={() => setShowStats(false)}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.75rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: '#9333ea'
            }}
          >×</button>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: "#9333ea"
          }}>Your stats</h2>
          {["easy", "medium", "hard"].map((level) => {
            const s = stats[level];
            const total = s.wins + s.losses;
            const winRate = total ? Math.round((s.wins / total) * 100) : 0;
            return (
              <div key={level} style={{ marginBottom: '2rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{level}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontSize: '1.3rem', fontWeight: '600' }}>
                  {["Played", "Wins", "Losses", "Win %"].map((label, i) => {
                    const value = [total, s.wins, s.losses, winRate][i];
                    return (
                      <div key={label} style={{ flex: 1 }}>
                        <div style={{ fontSize: '2rem' }}>{value}</div>
                        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.9rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <span style={{ color: '#333', fontWeight: 500 }}>Disable ineligible letters</span>
              <div
                onClick={() => setDisableIneligibleLetters(prev => !prev)}
                style={{
                  width: '42px',
                  height: '24px',
                  borderRadius: '9999px',
                  backgroundColor: disableIneligibleLetters ? '#9333ea' : '#ccc',
                  position: 'relative',
                  transition: 'background-color 0.2s',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '3px',
                  left: disableIneligibleLetters ? '20px' : '4px',
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
  
  if (dictionary.length === 0) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Loading dictionary...</div>;
  }

  return (
  <div>
    {!gameStarted ? (
      <>
      <div style={styles.preGameContainer}>
        <h1 style={{
          ...styles.title,
          marginTop: '0rem',
          marginBottom: '0.5rem'
          }}>Avertle</h1>
        <h1 style={styles.subtitle}>try <u>NOT</u> to make a word!</h1>
        <h2 style={styles.intro}>Choose your difficulty to begin</h2>
        <div style={styles.difficulty}>
          {["easy", "medium", "hard"].map(level => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              title={
                level === "easy"
                  ? "Computer picks randomly"
                  : level === "medium"
                  ? "Computer avoids completing a word"
                  : "Computer plays optimally to force you to lose"
              }
              style={{
                ...styles.diffBtn,
                padding: "0.6rem 1.2rem",
                fontSize: "1rem",
                fontWeight: selectedDifficulty === level ? "700" : "500",
                border: `3px solid #9333ea`,
                borderRadius: "8px",
                backgroundColor: selectedDifficulty === level ? "#9333ea" : "transparent",
                color: selectedDifficulty === level ? "white" : "#9333ea",
                cursor: "pointer",
                margin: "0 0.3rem"
              }}
            >
              {level[0].toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setDifficulty(selectedDifficulty);
            setGameStarted(true);
            handleRestart(); // triggers game start
          }}
          disabled={!selectedDifficulty}
          style={{
            ...styles.button,
            marginTop: "1.5rem",
            padding: "0.9rem 1.8rem",
            fontSize: "1.2rem",
            backgroundColor: selectedDifficulty ? "#9333ea" : "#bbb",
            cursor: selectedDifficulty ? "pointer" : "not-allowed"
          }}
        >
          Start game
        </button>

        {hasPlayedBefore && (
          <button
            onClick={() => setShowStats(true)}
            style={{
              ...styles.button,
              marginTop: "1.5rem",
              backgroundColor: "#9333ea",
              color: "white",
              fontWeight: "600"
            }}
          >
            View stats
          </button>
        )}

        {showStats && (
          <StatsModal
            stats={stats}
            disableIneligibleLetters={disableIneligibleLetters}
            setDisableIneligibleLetters={setDisableIneligibleLetters}
            onClose={() => setShowStats(false)}
          />
        )}

        <button
          onClick={() => setShowInstructions(prev => !prev)}
          style={{
            ...styles.button,
            marginTop: "3rem",
            backgroundColor: "transparent",
            color: "white",
            fontSize: "1rem",
            border: `2px solid white`,
            borderRadius: "8px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          {"How to play"}
        </button>
        {showInstructions && (
          <div
            onClick={() => setShowInstructions(false)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "white",
                color: "#333",
                padding: "2rem 1.5rem",
                borderRadius: "10px",
                width: "90%",
                maxWidth: "500px",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                fontSize: isMobile ? "0.9rem" : "1rem",
                lineHeight: "1.5",
                position: "relative",
                textAlign: "left",
              }}
            >
              <button
                onClick={() => setShowInstructions(false)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.75rem",
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#9333ea"
                }}
              >
                ×
              </button>

              <h2 style={{ marginTop: 0 }}>How to play</h2>
              <p>Try to force the computer to complete a word.</p>
              <ul style={{ paddingLeft: "1.2rem" }}>
                <li>You and the computer take turns adding one letter to a growing word fragment.</li>
                <li>If you complete a valid word (4+ letters), you lose.</li>
                <li>If you play a letter that makes it impossible to complete a word, you lose. (This is disallowed by default.)</li>
              </ul>
              <p style={{ marginTop: "1rem" }}>You can choose from three difficulty levels:</p>
              <ul style={{ paddingLeft: "1.2rem" }}>
                <li><strong>Easy</strong>{!isMobile && <span> (E):</span>}{isMobile && <strong>:</strong>} Computer plays randomly.</li>
                <li><strong>Medium</strong>{!isMobile && <span> (M):</span>}{isMobile && <strong>:</strong>} Computer avoids completing a word.</li>
                <li><strong>Hard</strong>{!isMobile && <span> (H):</span>}{isMobile && <strong>:</strong>} Computer plays optimally after the first letter to force you to finish a word.</li>
              </ul>
              <p style={{ marginTop: "1rem" }}>If a word is completed, you can click on the <u>&raquo;</u> icon {!isMobile && <span>or press D</span>} to view its definition. {!isMobile && <span>(In fact, every button in the game has an equivalent keyboard shortcut.)</span>}</p>
              <p style={{ marginTop: "1rem", fontWeight: 700 }}>Remember: try <u>NOT</u> to make a word!</p>

              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'left', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <span style={{ color: '#333', fontWeight: 400 }}>Disable ineligible letters</span>
                  <div
                    onClick={() => setDisableIneligibleLetters(prev => !prev)}
                    style={{
                      width: '42px',
                      height: '24px',
                      borderRadius: '9999px',
                      backgroundColor: disableIneligibleLetters ? '#9333ea' : '#ccc',
                      position: 'relative',
                      transition: 'background-color 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      position: 'absolute',
                      top: '3px',
                      left: disableIneligibleLetters ? '20px' : '4px',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                    }} />
                  </div>
                </label>
              </div>

              <p style={{ marginTop: "1.5rem", fontSize: isMobile ? "0.8rem" : "0.9rem" }}>Inspired by the word game <a
                href="https://en.wikipedia.org/wiki/Ghost_(game)"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#9333ea', textDecoration: 'underline' }}
              >Ghost</a>.</p>
            </div>
          </div>
        )}
        <footer style={styles.footer}>
          &copy; 2025 <a href="/" style={{ color: 'white', textDecoration: 'underline' }}>Pranay Varada</a>. All rights reserved.
        </footer>

      </div>
      </>
    ) : (
      <>
      <div style={styles.container}>
        <h1 style={styles.title}>Avertle</h1>
        <h1 style={styles.subtitle}>try <u>NOT</u> to make a word!</h1>
        <div>{message}</div>
        <div style={styles.fragment}>
          {justReset || fragment.length === 0
            ? ''
            : fragment.map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    color: gameOver
                      ? winner === 'player'
                        ? '#4ade80'
                        : '#f87171'
                      : item.by === 'player'
                      ? '#facc15'
                      : '#38bdf8',
                    textShadow: gameOver ? '0 0 4px currentColor' : 'none'
                  }}
                >
                  {item.letter}
                </span>
              ))
          }
          {playerTurn && !gameOver && (
            <span style={{ ...styles.cursor, color: '#facc15' }}>|</span> // yellow like player
          )}

          {gameOver && completedWord && (
            <a
              href={`https://www.collinsdictionary.com/dictionary/english/${completedWord}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: '0.5rem',
                fontSize: '1.5rem',
                textDecoration: 'underline',
                // textShadow: '0 0 4px currentColor',
                color: winner === 'player' ? '#4ade80' : '#f87171', // green or red
                verticalAlign: 'middle'
              }}
              title={`View definition of "${completedWord}"`}
            >
              &raquo;
            </a>
          )}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {(isMobile
            ? ["ABCDEFGHI", "JKLMNOPQR", "STUVWXYZ"]
            : ["ABCDEFG", "HIJKLMN", "OPQRSTU", "VWXYZ"]
          ).map((row, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: isMobile ? '8px' : '10px',
              }}
            >
              {row.split("").map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={
                    !playerTurn ||
                    gameOver ||
                    (disableIneligibleLetters && !validLetters.has(letter))
                  }
                  style={{
                    ...styles.button,
                    width: isMobile ? '30px' : '45px',
                    height: isMobile ? '30px' : '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '1.5rem 0.5rem' : '1.8rem 0.5rem',
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    opacity: !playerTurn || gameOver || (disableIneligibleLetters && !validLetters.has(letter)) ? 0.3 : 1
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
        </div>

        {gameOver && (
          <button onClick={handleRestart} style={{ ...styles.button, marginTop: isMobile ? '0.8rem' : '1rem' }}>
            New game
          </button>
        )}

        <div style={styles.difficulty}>
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              disabled={gameStarted && !gameOver}
              title={
                level === "easy"
                  ? "Computer picks randomly"
                  : level === "medium"
                  ? "Computer avoids completing a word"
                  : "Computer plays to force you to lose (optimal)"
              }
              style={{
                ...styles.diffBtn,
                backgroundColor: difficulty === level ? "#9333ea" : "transparent",
                color: difficulty === level ? "white" : "#9333ea",
                fontWeight: difficulty === level ? "700" : "500",
                border: `2px solid #9333ea`,
                opacity: !gameOver ? 0.7 : 1,
                cursor: !gameOver ? "not-allowed" : "pointer",
                transition: "all 0.2s ease-in-out"
              }}
            >
              {level[0].toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <button
          disabled={gameStarted && !gameOver}
          onClick={() => setShowStats(true)} 
          style={{
          ...styles.button,
          marginTop: isMobile ? '1.2rem' : '1.5rem',
          backgroundColor: '#9333ea',
          color: 'white',
          fontWeight: "600",
          opacity: !gameOver ? 0.7 : 1,
          cursor: !gameOver ? "not-allowed" : "pointer",
        }}>
          View stats
        </button>

        {showStats && (
          <StatsModal
            stats={stats}
            disableIneligibleLetters={disableIneligibleLetters}
            setDisableIneligibleLetters={setDisableIneligibleLetters}
            onClose={() => setShowStats(false)}
          />
        )}
        <footer style={styles.footer}>
          &copy; 2025 <a href="/" style={{ color: 'white', textDecoration: 'underline' }}>Pranay Varada</a>. All rights reserved.
        </footer>
      </div>
      </>
    )}
  </div>
);
}