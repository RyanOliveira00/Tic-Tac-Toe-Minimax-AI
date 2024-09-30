/* eslint-disable @typescript-eslint/prefer-for-of */
"use client";

import { winningCombinations } from "@/utils/constants";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Square } from "./square";

type Player = "X" | "O" | null;
type Board = Player[];

type GameState = {
  board: Board;
  currentPlayer: Player;
  winner: Player | "draw" | null;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const initialBoard: Board = Array(9).fill(null);

export function Board() {
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoard,
    currentPlayer: "X",
    winner: null,
  });

  // Efeito para acionar a jogada da IA
  useEffect(() => {
    if (gameState.currentPlayer === "O" && !gameState.winner) {
      const aiMove = getBestMove(gameState.board, "O", 3, -Infinity, Infinity);
      handleMove(aiMove.index);
    }
  }, [gameState.currentPlayer, gameState.winner]);

  const handleMove = (index: number) => {
    if (gameState.winner || gameState.board[index]) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const winner = calculateWinner(newBoard);
    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
      winner: winner,
    });
  };

  // Função para calcular o vencedor
  const calculateWinner = (board: Board): Player | "draw" | null => {
    for (let i = 0; i < winningCombinations.length; i++) {
      // O(1)
      const [a, b, c] = winningCombinations[i] as [number, number, number]; // O(1)
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // O(1)
        return board[a]; // O(1)
      }
    }
    return board.every((cell) => cell !== null) ? "draw" : null; // O(n), onde n é o tamanho do tabuleiro (9 neste caso)
  }; // Complexidade total: O(n)

  // Função de avaliação heurística
  const evaluate = (board: Board): number => {
    const winner = calculateWinner(board); // O(n)
    if (winner === "X") return -10; // O(1)
    if (winner === "O") return 10; // O(1)
    if (winner === "draw") return 0; // O(1)

    let score = 0; // O(1)
    winningCombinations.forEach((combo) => {
      // O(1) - número fixo de combinações
      const [a, b, c] = combo as [number, number, number]; // O(1)
      const line = [board[a], board[b], board[c]]; // O(1)
      const countO = line.filter((cell) => cell === "O").length; // O(1)
      const countX = line.filter((cell) => cell === "X").length; // O(1)
      if (countO === 2 && countX === 0) score += 2; // O(1)
      if (countO === 1 && countX === 0) score += 1; // O(1)
      if (countX === 2 && countO === 0) score -= 2; // O(1)
      if (countX === 1 && countO === 0) score -= 1; // O(1)
    });

    return score;
  };

  const getBestMove = (
    board: Board,
    player: Player,
    depth: number,
    alpha: number,
    beta: number,
  ): { index: number; score: number } => {
    const availableMoves = board.reduce<number[]>((acc, cell, index) => {
      // O(n)
      if (!cell) acc.push(index); // O(1)
      return acc; // O(1)
    }, []);

    if (depth === 0 || calculateWinner(board)) {
      // O(n)
      return { index: -1, score: evaluate(board) }; // O(n)
    }

    let bestMove = { index: -1, score: player === "O" ? -Infinity : Infinity }; // O(1)

    for (let i = 0; i < availableMoves.length; i++) {
      // O(m), onde m é o número de movimentos disponíveis
      const move = availableMoves[i]!; // O(1)
      const newBoard = [...board]; // O(n)
      newBoard[move] = player; // O(1)

      const { score } = getBestMove(
        newBoard,
        player === "O" ? "X" : "O",
        depth - 1,
        alpha,
        beta,
      ); // Recursão

      if (player === "O") {
        if (score > bestMove.score) {
          // O(1)
          bestMove = { index: move, score }; // O(1)
        }
        alpha = Math.max(alpha, bestMove.score); // O(1)
      } else {
        if (score < bestMove.score) {
          // O(1)
          bestMove = { index: move, score }; // O(1)
        }
        beta = Math.min(beta, bestMove.score); // O(1)
      }

      if (beta <= alpha) {
        break; // Poda alfa-beta
      }
    } // Complexidade: O(b^d), onde b é o fator de ramificação (no máximo 9) e d é a profundidade

    return bestMove;
  };

  const resetGame = () => {
    setGameState({
      board: initialBoard,
      currentPlayer: "X",
      winner: null,
    });
  };

  return (
    <>
      <div className="grid grid-cols-3">
        <Square
          value={gameState.board[0] ?? ""}
          onClick={() => handleMove(0)}
          className="rounded-tl-lg border-b border-r border-white/50"
        />

        <Square
          value={gameState.board[1] ?? ""}
          onClick={() => handleMove(1)}
          className="border-b border-white/50"
        />
        <Square
          value={gameState.board[2] ?? ""}
          onClick={() => handleMove(2)}
          className="rounded-tr-lg border-b border-l border-white/50"
        />
        <Square
          value={gameState.board[3] ?? ""}
          onClick={() => handleMove(3)}
          className="border-r border-white/50"
        />
        <Square
          value={gameState.board[4] ?? ""}
          onClick={() => handleMove(4)}
        />
        <Square
          value={gameState.board[5] ?? ""}
          onClick={() => handleMove(5)}
          className="border-l border-white/50"
        />
        <Square
          value={gameState.board[6] ?? ""}
          onClick={() => handleMove(6)}
          className="rounded-bl-lg border-r border-t border-white/50"
        />
        <Square
          value={gameState.board[7] ?? ""}
          onClick={() => handleMove(7)}
          className="border-t border-white/50"
        />
        <Square
          value={gameState.board[8] ?? ""}
          onClick={() => handleMove(8)}
          className="rounded-br-lg border-l border-t border-white/50"
        />
      </div>

      <p className="max-w-2xl text-center text-lg">
        {gameState.winner
          ? gameState.winner === "draw"
            ? "Empate!"
            : `Vencedor: ${gameState.winner}`
          : `Próximo jogador: ${gameState.currentPlayer}`}{" "}
      </p>
      <div className="flex gap-4">
        <button
          onClick={resetGame}
          className="rounded-md bg-white px-4 py-2 text-black transition-all hover:bg-black hover:text-white hover:shadow-lg"
        >
          Reiniciar
        </button>
      </div>

      <p className="max-w-2xl text-center">
        Saiba mais como funciona a IA clicando{" "}
        <a
          href="/min-max-explanation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f00] underline"
        >
          aqui
        </a>{" "}
        e o algoritmo minimax clicando{" "}
      </p>

      <p className="flex max-w-2xl gap-2 text-center">
        Código fonte disponível no Github{" "}
        <a href="https://github.com/RyanOliveira00/Tic-Tac-Toe-Minimax-AI-Algorithm" target="_blank" rel="noopener noreferrer">
          <Github className="h-6 w-6 transition-all hover:text-[#f00]" />
        </a>
      </p>
    </>
  );
}
